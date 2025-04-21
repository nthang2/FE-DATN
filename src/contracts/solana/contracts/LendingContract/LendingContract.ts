/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@coral-xyz/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createSyncNativeInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { ComputeBudgetProgram, PublicKey, SystemProgram, Transaction, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { toast } from 'react-toastify';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { solanaDevnet } from 'src/constants/tokens/solana-ecosystem/solana-devnet';
import { solTokenSolana } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';
import { queryClient } from 'src/layout/Layout';
import { publicClientSol } from 'src/states/hooks';
import { getDecimalToken } from 'src/utils';
import { BN as utilBN } from 'src/utils/index';
import { IdlLending, idlLending } from '../../idl/lending/lending';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import {
  CONTROLLER_SEED,
  collateral as defaultCollateral,
  DEPOSITORY_SEED,
  REDEEMABLE_MINT_SEED,
  REDEEM_CONFIG,
  RESERVE_ACCOUNT,
  LOAN,
  computeUnits,
} from './constant';
import { appStore, crossModeAtom } from 'src/states/state';
import { addPriorityFee, getAddressLookupTableAccounts } from 'src/views/MyPortfolio/utils';

export class LendingContract extends SolanaContractAbstract<IdlLending> {
  constructor(wallet: WalletContextState) {
    super(wallet as any, ctrAdsSolana.lending, idlLending);
  }

  getPda(seed: string, ...tokens: PublicKey[]) {
    const addressParam = tokens.map((token) => token.toBuffer());
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from(seed), ...addressParam], this.program.programId);

    return pda;
  }

  getAccountsPartial(tokenAddress: string) {
    // const redeemable_mint = new PublicKey('DYeTA4ZQhEwoJ5imjq1Q3zgwfTgkh4WmdfFHAq3jLrv3');
    const redeemable_mint = this.getPda(REDEEMABLE_MINT_SEED);
    const collateral = new PublicKey(tokenAddress);
    const userCollateralATA = getAssociatedTokenAddressSync(collateral, this.provider.publicKey);
    const userRedeemATA = getAssociatedTokenAddressSync(redeemable_mint, this.provider.publicKey);
    const { pdAddress } = this.getUserLoanByToken(this.provider.publicKey, collateral);
    const controller = this.getPda(CONTROLLER_SEED);
    const depository = this.getPda(DEPOSITORY_SEED, collateral);
    const depositoryVault = getAssociatedTokenAddressSync(collateral, depository, true);
    // const oracle = findTokenInfoByToken(tokenAddress)?.oracle;
    const reserveTokenAccount = getAssociatedTokenAddressSync(redeemable_mint, RESERVE_ACCOUNT, true);
    const redeemConfig = this.getPda(REDEEM_CONFIG, collateral);

    return {
      user: this.provider.publicKey,
      collateral: collateral,
      userCollateral: userCollateralATA,
      redeemableMint: redeemable_mint,
      userRedeemable: userRedeemATA,
      controller: controller,
      depository: depository,
      depositoryVault: depositoryVault,
      oracle: ctrAdsSolana.oracle,
      loanAccount: pdAddress,
      reserve: RESERVE_ACCOUNT,
      reserveTokenAccount: reserveTokenAccount,
      redeemConfig: redeemConfig,
    };
  }

  getUserLoanByToken(user: PublicKey, token: PublicKey) {
    const depositoryPda = this.getPda(DEPOSITORY_SEED, token);
    const pdAddress = this.getPda('LOAN', depositoryPda, user);

    return { pdAddress, depositoryPda };
  }

  private async _getOrCreateTokenAccountTx(mint: PublicKey, payer: PublicKey): Promise<Transaction> {
    const tokenAccount = getAssociatedTokenAddressSync(mint, payer, true);
    const transaction: Transaction = new Transaction();

    try {
      await getAccount(this.provider.connection, tokenAccount, 'confirmed');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      transaction.add(
        createAssociatedTokenAccountInstruction(payer, tokenAccount, payer, mint, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID)
      );
    }

    return transaction;
  }

  async getAccountType0Depository(address: PublicKey) {
    return await queryClient.ensureQueryData({
      queryKey: ['AccountType0Depository', address],
      queryFn: async () => await this.program.account.type0Depository.fetch(address),
      staleTime: 1000 * 60,
    });
  }

  async getLoanType0(userLoanPDAAddress: PublicKey) {
    return await this.program.account.loanType0.fetch(userLoanPDAAddress);
  }

  async getDepositoryVault(tokenAddress: string) {
    const { depositoryVault } = this.getAccountsPartial(tokenAddress);
    const depository = await getAccount(this.provider.connection, depositoryVault);

    return depository;
  }

  async getDepository(tokenAddress: string) {
    const depositoryPda = this.getPda(DEPOSITORY_SEED, new PublicKey(tokenAddress));
    const depository = await this.program.account.type0Depository.fetch(depositoryPda);

    return depository;
  }
  async getLoan(tokenAddress: string) {
    const depositoryPda = this.getPda(DEPOSITORY_SEED, new PublicKey(tokenAddress));
    const loanPda = this.getPda(LOAN, depositoryPda, this.provider.publicKey);
    const loan = await this.program.account.loanType0.fetch(loanPda);
    // min(redeem_config.max_usdai_amount, max_usdai_with_rate) với max_usdai_with_rate = loan.minted_amount * depository.rate * redeem_config.max_usdai_rate / 10000)

    return loan;
  }

  async initialize(): Promise<string> {
    return '';
  }

  wrapNative(fromPubkey: PublicKey, amount: number): Transaction {
    const fromTokenAccount = getAssociatedTokenAddressSync(NATIVE_MINT, fromPubkey);

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPubkey,
        toPubkey: fromTokenAccount,
        lamports: amount,
      }),
      createSyncNativeInstruction(fromTokenAccount)
    );
    return tx;
  }

  wrapSol(inputToken: string, amount: number): Transaction {
    if (inputToken === NATIVE_MINT.toBase58()) {
      return this.wrapNative(this.provider.publicKey, amount);
    }

    return new Transaction();
  }

  async deposit(depositAmount: number, tokenAddress: string): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(depositAmount * decimal);
    const usdaiAmount = new BN(0 * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const transaction = await this._getOrCreateTokenAccountTx(new PublicKey(tokenAddress), this.provider.publicKey);

    if (tokenAddress === (solTokenSolana.address || solanaDevnet.address)) {
      transaction.add(this.wrapSol(tokenAddress, collateralAmount));
    }

    const depositTransaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, true, false)
      .accountsPartial(accountsPartial)
      .transaction();
    transaction.add(depositTransaction);

    const transactionHash = await this.sendTransaction(transaction);
    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async borrow(borrowAmount: number, tokenAddress: string, isMax?: boolean): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(0 * decimal);
    const maxAmount = utilBN(2).pow(64).minus(1);
    const usdaiAmount = isMax ? new BN(maxAmount.toString()) : new BN(borrowAmount * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, true)
      .accountsPartial(accountsPartial)
      .transaction();
    const transactionHash = await this.sendTransaction(transaction);
    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async repay(debtAmount: number, tokenAddress: string, isMax?: boolean): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(0 * decimal);
    const maxAmount = utilBN(2).pow(64).minus(1);
    const usdaiAmount = isMax ? new BN(maxAmount.toString()) : new BN(debtAmount * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, false)
      .accountsPartial(accountsPartial)
      .transaction();
    const transactionHash = await this.sendTransaction(transaction);
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async withdraw(depositAmount: number, tokenAddress: string): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(depositAmount * decimal);
    const usdaiAmount = new BN(0 * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, false)
      .accountsPartial(accountsPartial)
      .transaction();
    const transactionHash = await this.sendTransaction(transaction);
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async getMaxLtv(address = defaultCollateral, decimal = 1e9): Promise<number> {
    const { depositoryPda } = this.getUserLoanByToken(this.provider.publicKey, address);
    const ratio = (await this.getAccountType0Depository(depositoryPda)).collateralizationRatio;
    const result = decimal / ratio.toNumber();

    return result;
  }

  async getBorrowRate(address = defaultCollateral, decimal = 1e12): Promise<number> {
    const { depositoryPda } = this.getUserLoanByToken(this.provider.publicKey, address);
    const rate = (await this.getAccountType0Depository(depositoryPda)).rate;
    const result = rate.toNumber() / decimal;

    return result;
  }

  async checkIfPdaExist(address: PublicKey) {
    try {
      const account = await publicClientSol().getAccountInfo(address, undefined);
      return account;
    } catch (e: unknown) {
      console.log(e, address.toString());
      toast.error('Loading connection fail');
      throw e;
    }
  }

  async getRedeemConfig(tokenAddress: string) {
    const redeemPda = this.getPda(REDEEM_CONFIG, new PublicKey(tokenAddress));
    const config = await this.program.account.redeemConfig.fetch(redeemPda);

    return config;
  }

  async redeemByCollateral(params: {
    usdaiAmount: string;
    collateralAmountRaw: string;
    selectedToken: string;
    resultSwapInstructions: any;
  }) {
    const { collateralAmountRaw, selectedToken, usdaiAmount, resultSwapInstructions } = params;

    const accountsPartial = this.getAccountsPartial(selectedToken);
    const jupiterData = Buffer.from(resultSwapInstructions.swapInstruction.data, 'base64');
    const remainingAccounts = resultSwapInstructions.swapInstruction.accounts.map((acc: any) => {
      const pubkeyStr = acc.pubkey;
      const isUser = pubkeyStr === this.provider.publicKey?.toString();

      return {
        pubkey: new PublicKey(pubkeyStr),
        isSigner: acc.isSigner || isUser, // Mark as signer if it's the user
        isWritable: acc.isWritable,
      };
    });

    const addressLookupTableAccounts = await getAddressLookupTableAccounts(resultSwapInstructions.addressLookupTableAddresses || []);

    const instructions = [
      // Add compute unit limit
      ComputeBudgetProgram.setComputeUnitLimit({
        units: computeUnits,
      }),

      // Add priority fee
      addPriorityFee(),

      // Use redeem_by_collateral_3 instruction
      await this.program.methods
        .redeemByCollateral(new BN(usdaiAmount), new BN(collateralAmountRaw), jupiterData)
        .accountsPartial(accountsPartial)
        .remainingAccounts(remainingAccounts)
        .instruction(),
    ];

    const blockhash = (await this.provider.connection.getLatestBlockhash('finalized')).blockhash;
    const messageV0 = new TransactionMessage({
      payerKey: this.provider.publicKey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message(addressLookupTableAccounts);

    const transaction = new VersionedTransaction(messageV0);
    // const simulate = await this.provider.connection.simulateTransaction(transaction, { commitment: 'finalized' });
    // console.log('simulate', simulate);

    const result = await this.sendTransaction(transaction);
    return result;
  }
}
