import { Wallet } from '@project-serum/anchor/dist/cjs/provider';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { ctrAdsSolana } from 'src/constants/contract-address/solana';
import { IdlSmartVault, idlSmartVault } from '../../idl/smart_vault/smart_vault';
import { BN } from '@project-serum/anchor';
import { ComputeBudgetProgram, PublicKey, Transaction } from '@solana/web3.js';
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';
import { SYSTEM_PROGRAM_ID } from 'src/states/wallets/solana-blockchain/configs';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { AmmV3Contract } from '../AmmV3Contract';
import { i32ToBytes } from 'src/utils/solana';
import { LiquidityMath, SqrtPriceMath, TickUtils } from '@raydium-io/raydium-sdk-v2';
import { findTokenNameSolana } from 'src/constants/tokenInfo/solana/mapNameToInfo';
import Decimal from 'decimal.js';

const wsolMint = new PublicKey('So11111111111111111111111111111111111111112');
export class SmartVaultContract extends SolanaContractAbstract<IdlSmartVault> {
    constructor(wallet: Wallet) {
        super(wallet, ctrAdsSolana.SMART_VAULT, idlSmartVault);
    }
    async initialize(): Promise<string> {
        return '';
    }
    vaultConfig() {
        return PublicKey.findProgramAddressSync([Buffer.from('VAULT_CONFIG')], this.program.programId);
    }

    vaultInfo() {
        return PublicKey.findProgramAddressSync([Buffer.from('VAULT_INFO')], this.program.programId);
    }

    reserveTokenInfo(poolState: PublicKey, userPubkey?: PublicKey) {
        // console.log(poolState.toString(), this.provider.publicKey.toString());
        return PublicKey.findProgramAddressSync([Buffer.from('RESERVE_TOKEN_INFO'), (userPubkey || this.provider.publicKey).toBuffer(), poolState.toBuffer()], this.program.programId);
    }
    userInfo(userPubkey?: PublicKey) {
        return PublicKey.findProgramAddressSync([Buffer.from('USER_INFO'), (userPubkey || this.provider.publicKey).toBuffer()], this.program.programId);
    }
    vaultTokenAccount(tokenMint: PublicKey) {
        const findToken = findTokenNameSolana[tokenMint.toString()] || null;
        if (findToken?.isToken2022) {
            return getAssociatedTokenAddressSync(tokenMint, this.vaultInfo()[0], true, TOKEN_2022_PROGRAM_ID);
        }
        return getAssociatedTokenAddressSync(tokenMint, this.vaultInfo()[0], true);
    }

    tickArrayBitMap(poolState: PublicKey) {
        return PublicKey.findProgramAddressSync([Buffer.from('pool_tick_array_bitmap_extension'), poolState.toBuffer()], ctrAdsSolana.AMM_V3);
    }

    tickArray(poolState: PublicKey, tickArray: BN) {
        return PublicKey.findProgramAddressSync([Buffer.from('tick_array'), poolState.toBuffer(), i32ToBytes(tickArray.toNumber())], ctrAdsSolana.AMM_V3);
    }
    protocolPosition(poolState: PublicKey, tickLowerIndex: BN, tickUpperIndex: BN) {
        return PublicKey.findProgramAddressSync([Buffer.from('position'), poolState.toBuffer(), i32ToBytes(tickLowerIndex.toNumber()), i32ToBytes(tickUpperIndex.toNumber())], ctrAdsSolana.AMM_V3);
    }
    personalPosition(positionNftMint: PublicKey) {
        return PublicKey.findProgramAddressSync([Buffer.from('position'), positionNftMint.toBuffer()], ctrAdsSolana.AMM_V3);
    }

    async reserveWsolAmount(user?: PublicKey) {
        const owner = user || this.provider.publicKey;
        const vaultInfo = this.vaultInfo()[0];

        let amount = new BN(0);
        if (owner.toString() == vaultInfo.toString()) {
            amount = (await this.program.account.vaultInfo.fetch(owner)).reserveWsolAmount;
            return amount;
        } else {
            try {
                amount = (await this.program.account.userInfo.fetch(this.userInfo(owner)[0])).reserveWsolAmount;
            } catch {}
            return amount;
        }
    }

    async reserveTokenAmount(poolAccount: PublicKey, userPubkey?: PublicKey) {
        return (await this.program.account.reserveTokenInfo.fetch(this.reserveTokenInfo(poolAccount, userPubkey)[0])).reserveTokenAmount;
    }

    async addLiquidity(amount: string) {
        const ammV3 = new AmmV3Contract(this.provider.wallet);

        const [fetchedVautConfig, fetchedVaultInfo] = await Promise.all([this.program.account.vaultConfig.fetch(this.vaultConfig()[0]), this.program.account.vaultInfo.fetch(this.vaultInfo()[0])]);

        const poolAccount = fetchedVaultInfo.poolId;
        const nftMint = fetchedVaultInfo.positionNftMint;
        const poolState = await ammV3.program.account.poolState.fetch(poolAccount);
        const { tradeFeeRate } = await ammV3.program.account.ammConfig.fetch(poolState.ammConfig);

        const amountInput = new BN(amount);

        const txDeposit = await this.program.methods
            .deposit(amountInput)
            .accounts({
                vaultInfo: this.vaultInfo()[0],
                vaultConfig: this.vaultConfig()[0],
                feeWalletAccount: fetchedVautConfig.feeWallet,
                wsolMint: wsolMint,
                vaultWsolAta: this.vaultTokenAccount(wsolMint),
                user: this.provider.publicKey,
                userInfo: this.userInfo(this.provider.publicKey)[0],
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SYSTEM_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            })
            .transaction();

        const swapTickArrayLowerStartIndex = TickUtils.getTickArrayStartIndexByTick(poolState.tickCurrent, poolState.tickSpacing);
        const swapTickArrayUpperStartIndex = TickUtils.getNextTickArrayStartIndex(swapTickArrayLowerStartIndex, poolState.tickSpacing, true);
        const { tickLowerIndex, tickUpperIndex } = await ammV3.program.account.personalPositionState.fetch(this.personalPosition(nftMint)[0]);

        const amountSwap = amountInput
            .mul(new BN(100).sub(fetchedVautConfig.managementFeePercent))
            .div(new BN(100))
            .add(await this.reserveWsolAmount(this.provider.publicKey));
        const txSwap = await this.program.methods
            .userSwap(this.calAmountToSwap(new Decimal(amountSwap.toString()), new Decimal(0), poolState.sqrtPriceX64, tickLowerIndex, tickUpperIndex, tradeFeeRate).amountSwap, new BN(0), new BN(0))
            .accounts({
                vaultInfo: this.vaultInfo()[0],
                vaultConfig: this.vaultConfig()[0],
                userInfo: this.userInfo()[0],
                userReserveTokenInfo: this.reserveTokenInfo(poolAccount)[0],
                clmmProgram: ammV3.program.programId,
                ammConfig: poolState.ammConfig,
                poolState: poolAccount,
                inputTokenAccount: this.vaultTokenAccount(poolState.tokenMint0),
                outputTokenAccount: this.vaultTokenAccount(poolState.tokenMint1),
                inputVault: poolState.tokenVault0,
                outputVault: poolState.tokenVault1,
                observationState: poolState.observationKey,
                memoProgram: ctrAdsSolana.MEMO,
                inputVaultMint: poolState.tokenMint0,
                outputVaultMint: poolState.tokenMint1,
                user: this.provider.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram2022: TOKEN_2022_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            })
            .remainingAccounts([
                { pubkey: this.tickArrayBitMap(poolAccount)[0], isSigner: false, isWritable: true },
                { pubkey: this.tickArray(poolAccount, new BN(swapTickArrayLowerStartIndex))[0], isSigner: false, isWritable: true },
                { pubkey: this.tickArray(poolAccount, new BN(swapTickArrayUpperStartIndex))[0], isSigner: false, isWritable: true },
            ])
            .transaction();

        const tickArrayLowerStartIndex = TickUtils.getTickArrayStartIndexByTick(tickLowerIndex, poolState.tickSpacing);
        const tickArrayUpperStartIndex = TickUtils.getTickArrayStartIndexByTick(tickUpperIndex, poolState.tickSpacing);

        const txIncreaseLiquidity = await this.program.methods
            .userIncreaseLiquidity()
            .accounts({
                vaultInfo: this.vaultInfo()[0],
                userInfo: this.userInfo()[0],
                userReserveTokenInfo: this.reserveTokenInfo(poolAccount)[0],
                clmmProgram: ctrAdsSolana.AMM_V3,
                nftAccount: this.vaultTokenAccount(nftMint),
                poolState: poolAccount,
                protocolPosition: this.protocolPosition(poolAccount, new BN(tickLowerIndex), new BN(tickUpperIndex))[0],
                personalPosition: this.personalPosition(nftMint)[0],
                tickArrayLower: this.tickArray(poolAccount, new BN(tickArrayLowerStartIndex))[0],
                tickArrayUpper: this.tickArray(poolAccount, new BN(tickArrayUpperStartIndex))[0],
                tokenAccount0: this.vaultTokenAccount(poolState.tokenMint0),
                tokenAccount1: this.vaultTokenAccount(poolState.tokenMint1),
                tokenVault0: poolState.tokenVault0,
                tokenVault1: poolState.tokenVault1,
                vault0Mint: poolState.tokenMint0,
                vault1Mint: poolState.tokenMint1,
                user: this.provider.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram2022: TOKEN_2022_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            })
            .remainingAccounts([{ pubkey: this.tickArrayBitMap(poolAccount)[0], isSigner: false, isWritable: true }])
            .transaction();

        const txSwapRemainToken = await this.program.methods
            .userSwap(null, new BN(0), new BN(0))
            .accounts({
                vaultInfo: this.vaultInfo()[0],
                vaultConfig: this.vaultConfig()[0],
                userInfo: this.userInfo()[0],
                clmmProgram: ammV3.program.programId,
                ammConfig: poolState.ammConfig,
                poolState: poolAccount,
                inputTokenAccount: this.vaultTokenAccount(poolState.tokenMint1),
                outputTokenAccount: this.vaultTokenAccount(poolState.tokenMint0),
                inputVault: poolState.tokenVault1,
                outputVault: poolState.tokenVault0,
                observationState: poolState.observationKey,
                memoProgram: ctrAdsSolana.MEMO,
                inputVaultMint: poolState.tokenMint1,
                outputVaultMint: poolState.tokenMint0,
                user: this.provider.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram2022: TOKEN_2022_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                userReserveTokenInfo: this.reserveTokenInfo(poolAccount)[0],
            })
            .remainingAccounts([
                { pubkey: this.tickArrayBitMap(poolAccount)[0], isSigner: false, isWritable: true },
                { pubkey: this.tickArray(poolAccount, new BN(swapTickArrayLowerStartIndex))[0], isSigner: false, isWritable: true },
                { pubkey: this.tickArray(poolAccount, new BN(swapTickArrayUpperStartIndex))[0], isSigner: false, isWritable: true },
            ])
            .transaction();

        const response = await this.sendTransaction(new Transaction().add(this.setfeeGas(750_000)).add(txDeposit).add(txSwap).add(txIncreaseLiquidity));
        // const response2 = await this.sendTransaction(new Transaction().add(txSwapRemainToken).add(computeBudgetIx));
        return response;
    }

    async getUserLiquidityBalance() {
        const [vault_info, user_info] = await Promise.all([this.program.account.vaultInfo.fetch(this.vaultInfo()[0]), this.program.account.userInfo.fetch(this.userInfo()[0])]);

        let user_share_liquidity = new Decimal(user_info.shareLiquidity.toString());
        let liuqidity_rate = new Decimal(vault_info.liquidityRate);

        let user_liquidity = new BN(Decimal.floor(user_share_liquidity.mul(liuqidity_rate)).toString());
        // console.log(user_share_liquidity.toString(), liuqidity_rate.toString());
        return user_liquidity;
    }

    async getInvolvedAmount() {
        const ammV3 = new AmmV3Contract(this.provider.wallet);
        const [fetchedVaultInfo, userInfo] = await Promise.all([this.program.account.vaultInfo.fetch(this.vaultInfo()[0]), this.program.account.userInfo.fetch(this.userInfo()[0])]);

        const nftMint = fetchedVaultInfo.positionNftMint;
        const poolAccount = fetchedVaultInfo.poolId;

        const [poolState, reserveTokenAmount, { tickLowerIndex, tickUpperIndex }] = await Promise.all([
            ammV3.program.account.poolState.fetch(poolAccount),
            this.reserveTokenAmount(poolAccount),
            ammV3.program.account.personalPositionState.fetch(this.personalPosition(nftMint)[0]),
        ]);

        const { tradeFeeRate } = await ammV3.program.account.ammConfig.fetch(poolState.ammConfig);

        // user liquidity
        let user_share_liquidity = new Decimal(userInfo.shareLiquidity.toString());
        let liuqidity_rate = new Decimal(fetchedVaultInfo.liquidityRate);
        let user_liquidity = new BN(Decimal.floor(user_share_liquidity.mul(liuqidity_rate)).toString());

        let { amountA, amountB } = LiquidityMath.getAmountsFromLiquidity(
            poolState.sqrtPriceX64,
            SqrtPriceMath.getSqrtPriceX64FromTick(tickLowerIndex),
            SqrtPriceMath.getSqrtPriceX64FromTick(tickUpperIndex),
            user_liquidity,
            false
        );

        // console.log({ amountA: amountA.toString(), amountB: amountB.toString() });
        let tokenOverSol = SqrtPriceMath.sqrtPriceX64ToPrice(poolState.sqrtPriceX64, 0, 0);
        let amountBtoSol = ((amountB.toNumber() + reserveTokenAmount.toNumber()) / tokenOverSol.toNumber()) * (1 - tradeFeeRate / 10 ** 6);

        return (amountA.toNumber() + amountBtoSol) / 10 ** 9;
    }

    async withdrawLiquidity(amount: string, noti: (message: string) => void) {
        const lpBalance = await this.getUserLiquidityBalance();
        const amountInput = new BN(amount).mul(lpBalance).div(new BN(100));
        const ammV3 = new AmmV3Contract(this.provider.wallet);

        const [fetchedVautConfig, fetchedVaultInfo] = await Promise.all([this.program.account.vaultConfig.fetch(this.vaultConfig()[0]), this.program.account.vaultInfo.fetch(this.vaultInfo()[0])]);
        const poolAccount = fetchedVaultInfo.poolId;
        const nftMint = fetchedVaultInfo.positionNftMint;

        const [poolState, { tickLowerIndex, tickUpperIndex }] = await Promise.all([
            ammV3.program.account.poolState.fetch(poolAccount),
            ammV3.program.account.personalPositionState.fetch(this.personalPosition(nftMint)[0]),
        ]);

        const tickArrayLowerStartIndex = TickUtils.getTickArrayStartIndexByTick(tickLowerIndex, poolState.tickSpacing);
        const tickArrayUpperStartIndex = TickUtils.getTickArrayStartIndexByTick(tickUpperIndex, poolState.tickSpacing);

        const txDecreaseLiquidity = await this.program.methods
            .userDecreaseLiquidity(amountInput, new BN(0), new BN(0))
            .accounts({
                vaultInfo: this.vaultInfo()[0],
                userInfo: this.userInfo()[0],
                userReserveTokenInfo: this.reserveTokenInfo(poolAccount)[0],
                vaultReserveTokenInfo: this.reserveTokenInfo(poolAccount, this.vaultInfo()[0])[0],
                clmmProgram: ctrAdsSolana.AMM_V3,
                nftAccount: this.vaultTokenAccount(nftMint),
                poolState: poolAccount,
                protocolPosition: this.protocolPosition(poolAccount, new BN(tickLowerIndex), new BN(tickUpperIndex))[0],
                personalPosition: this.personalPosition(nftMint)[0],
                tickArrayLower: this.tickArray(poolAccount, new BN(tickArrayLowerStartIndex))[0],
                tickArrayUpper: this.tickArray(poolAccount, new BN(tickArrayUpperStartIndex))[0],
                recipientTokenAccount0: this.vaultTokenAccount(poolState.tokenMint0),
                recipientTokenAccount1: this.vaultTokenAccount(poolState.tokenMint1),
                tokenVault0: poolState.tokenVault0,
                tokenVault1: poolState.tokenVault1,
                vault0Mint: poolState.tokenMint0,
                vault1Mint: poolState.tokenMint1,
                memoProgram: ctrAdsSolana.MEMO,
                user: this.provider.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram2022: TOKEN_2022_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            })
            .remainingAccounts([{ pubkey: this.tickArrayBitMap(poolAccount)[0], isSigner: false, isWritable: true }])
            .transaction();

        const swapTickArrayLowerStartIndex = TickUtils.getTickArrayStartIndexByTick(poolState.tickCurrent, poolState.tickSpacing);
        const swapTickArrayUpperStartIndex = TickUtils.getNextTickArrayStartIndex(swapTickArrayLowerStartIndex, poolState.tickSpacing, true);
        const txSwap = await this.program.methods
            .userSwap(null, new BN(0), new BN(0))
            .accounts({
                vaultInfo: this.vaultInfo()[0],
                vaultConfig: this.vaultConfig()[0],
                userInfo: this.userInfo()[0],
                clmmProgram: ammV3.program.programId,
                ammConfig: poolState.ammConfig,
                poolState: poolAccount,
                inputTokenAccount: this.vaultTokenAccount(poolState.tokenMint1),
                outputTokenAccount: this.vaultTokenAccount(poolState.tokenMint0),
                inputVault: poolState.tokenVault1,
                outputVault: poolState.tokenVault0,
                observationState: poolState.observationKey,
                memoProgram: ctrAdsSolana.MEMO,
                inputVaultMint: poolState.tokenMint1,
                outputVaultMint: poolState.tokenMint0,
                user: this.provider.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SYSTEM_PROGRAM_ID,
                tokenProgram2022: TOKEN_2022_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                userReserveTokenInfo: this.reserveTokenInfo(poolAccount)[0],
            })
            .remainingAccounts([
                { pubkey: this.tickArrayBitMap(poolAccount)[0], isSigner: false, isWritable: true },
                { pubkey: this.tickArray(poolAccount, new BN(swapTickArrayLowerStartIndex))[0], isSigner: false, isWritable: true },
                { pubkey: this.tickArray(poolAccount, new BN(swapTickArrayUpperStartIndex))[0], isSigner: false, isWritable: true },
            ])
            .transaction();

        const txWithdraw = await this.program.methods
            .withdraw()
            .accounts({
                vaultInfo: this.vaultInfo()[0],
                vaultConfig: this.vaultConfig()[0],
                feeWalletAccount: fetchedVautConfig.feeWallet,
                wsolMint,
                vaultWsolAta: this.vaultTokenAccount(wsolMint),
                userWsolAta: getAssociatedTokenAddressSync(wsolMint, this.provider.publicKey, true),
                userInfo: this.userInfo()[0],
                user: this.provider.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SYSTEM_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            })
            .transaction();

        // console.log({ lpBalance: lpBalance.toString(), amountInput: amountInput.toString() });
        const response = await this.sendTransaction(new Transaction().add(this.setfeeGas(750_000)).add(txDecreaseLiquidity).add(txSwap));
        noti('Success convert LP! Await for tx withdraw confirmed...');
        const response2 = await this.sendTransaction(new Transaction().add(this.setfeeGas(400_000)).add(txWithdraw));
        return response2;
    }

    calAmountToSwap(reserverAmountX: Decimal, reserverAmountY: Decimal, currentSqrtPriceX64: BN, tickLowerIndex: number, tickUpperIndex: number, tradeFeeRate: number) {
        let currentPrice = SqrtPriceMath.sqrtPriceX64ToPrice(currentSqrtPriceX64, 0, 0);
        let OneMinusSwapFee = new Decimal(1).minus(new Decimal(tradeFeeRate / 10 ** 6));

        let lowerSqrtPrice = SqrtPriceMath.sqrtPriceX64ToPrice(SqrtPriceMath.getSqrtPriceX64FromTick(tickLowerIndex), 0, 0).sqrt();
        let upperSqrtPrice = SqrtPriceMath.sqrtPriceX64ToPrice(SqrtPriceMath.getSqrtPriceX64FromTick(tickUpperIndex), 0, 0).sqrt();
        let currentSqrtPrice = SqrtPriceMath.sqrtPriceX64ToPrice(currentSqrtPriceX64, 0, 0).sqrt();

        let fromXtoY = true;
        let amountSwap = new BN(0);

        if (currentSqrtPrice.lessThan(lowerSqrtPrice)) {
            amountSwap = new BN(reserverAmountY.toString());
            fromXtoY = false;
            return { amountSwap, fromXtoY };
        }

        if (currentSqrtPrice.greaterThanOrEqualTo(upperSqrtPrice)) {
            amountSwap = new BN(reserverAmountX.toString());
            return { amountSwap, fromXtoY };
        }

        //target ratio
        let numerator_lq = new Decimal(1).div(currentSqrtPrice).minus(new Decimal(1).div(upperSqrtPrice));
        let denominator_lq = currentSqrtPrice.minus(lowerSqrtPrice);
        let targetLiquidityRatio = numerator_lq.div(denominator_lq); // 1 Y = ratio X

        console.log(targetLiquidityRatio);

        //current ratio
        let currentLiquidityRatio = reserverAmountX.div(reserverAmountY);
        if (currentLiquidityRatio.lessThan(targetLiquidityRatio)) {
            fromXtoY = false;
        } else if (currentLiquidityRatio.eq(targetLiquidityRatio)) {
            return { amountSwap, fromXtoY };
        }

        if (fromXtoY) {
            let numerator_swap = reserverAmountX.minus(targetLiquidityRatio.mul(reserverAmountY));
            // console.log(numerator_swap)
            let denominator_swap = new Decimal(1).add(currentPrice.mul(OneMinusSwapFee).mul(targetLiquidityRatio));
            // console.log(denominator_swap)
            amountSwap = new BN(Decimal.floor(numerator_swap.div(denominator_swap)).toString());
        } else {
            let numerator_swap = currentPrice.mul(targetLiquidityRatio.mul(reserverAmountY).minus(reserverAmountX));
            let denominator_swap = new Decimal(0.98).add(currentPrice.mul(targetLiquidityRatio));
            amountSwap = new BN(Decimal.floor(numerator_swap.div(denominator_swap)).toString());
        }

        return { amountSwap, fromXtoY };
    }
}
