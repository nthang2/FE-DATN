import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { TokenName } from 'crypto-token-icon';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useLendingContract from 'src/hooks/useContract/useLendingContract';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { getJupiterQuote, jupiterSwapInstructions } from 'src/services/HandleApi/getJupiterInfo/getJupiterInfo';
import { BN } from 'src/utils';
import { calcCollateralAmountRaw } from 'src/views/MyPortfolio/utils';

const maxAccounts = 45;
const usdaiDecimals = 6;
const obricV2Address = 'obriQD1zbpyLz95G5n7nJe6a4DPjpFwa5XYPoNm113y';

const useJupiterQuote = () => {
  const { data: listPrice } = useQueryAllTokensPrice();
  const wallet = useWallet();
  const { initLendingContract } = useLendingContract();

  const query = useMutation({
    mutationKey: ['getJupiterQuote'],
    mutationFn: async (params: { repayInput: string; collateralInput: string; selectedToken: string; slippageBps: number }) => {
      if (!wallet.publicKey) return 0;

      const { repayInput, selectedToken, slippageBps } = params;
      const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
      const { amount } = calcCollateralAmountRaw(listPrice, repayInput, selectedToken);

      const jupiterQuoteParams = {
        inputMint: selectedToken,
        outputMint: usdaiInfo.address,
        amount: BigInt(amount.toFixed(0)).toString(),
        slippageBps: slippageBps,
        onlyDirectRoutes: 'false',
        userPublicKey: wallet.publicKey.toString(),
        maxAccounts: maxAccounts,
        excludeDexes: 'Obric+V2',
      };

      const jupiterQuote = await getJupiterQuote(jupiterQuoteParams);
      const userRedeemATA = getAssociatedTokenAddressSync(new PublicKey(usdaiInfo.address), wallet.publicKey);

      const swapBody = {
        quoteResponse: jupiterQuote,
        userPublicKey: wallet.publicKey.toString(),
        destinationTokenAccount: userRedeemATA,
        wrapAndUnwrapSol: true,
        useSharedAccounts: true,
        dynamicComputeUnitLimit: true,
      };

      const result = await jupiterSwapInstructions(swapBody);

      const isRespHasObricV2Address = result?.swapInstruction?.accounts.some((item) => item.pubkey === obricV2Address);
      if (isRespHasObricV2Address) {
        throw new Error('Obric V2 is not supported');
      }

      const contract = initLendingContract(wallet);
      const hash = await contract.redeemByCollateral({
        usdaiAmount: BN(repayInput).multipliedBy(`1e${usdaiDecimals}`).toString(),
        collateralAmountRaw: amount.toFixed(0),
        selectedToken,
        resultSwapInstructions: result,
      });

      return hash;
    },
    retry: (failureCount, error) => {
      if (error.message === 'Obric V2 is not supported' && failureCount < 2) return true;
      return false;
    },
    onError: (error) => console.log(error),
    retryDelay: 2000,
  });

  return query;
};

export default useJupiterQuote;
