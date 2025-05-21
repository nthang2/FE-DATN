import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useLendingContract from 'src/hooks/useContract/useLendingContract';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { TokenName } from 'src/libs/crypto-icons';
import { getJupiterQuote, jupiterSwapInstructions } from 'src/services/HandleApi/getJupiterInfo/getJupiterInfo';
import { calcCollateralAmountRaw } from 'src/views/MyPortfolio/utils';

const maxAccounts = 46;

const useRedeemWithCollateral = () => {
  const { data: listPrice } = useQueryAllTokensPrice();
  const wallet = useWallet();
  const { initLendingContract } = useLendingContract();

  const query = useMutation({
    mutationKey: ['getJupiterQuote'],
    mutationFn: async (params: { repayInput: string; selectedToken: string; slippageBps: number; priorityFee: number }) => {
      if (!wallet.publicKey) return 0;

      const { repayInput, selectedToken, slippageBps, priorityFee } = params;
      const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
      const { amount } = calcCollateralAmountRaw(listPrice, repayInput, selectedToken);

      const jupiterQuoteParams = {
        inputMint: selectedToken,
        outputMint: usdaiInfo.address,
        amount: BigInt(amount.toFixed(0)).toString(),
        slippageBps: slippageBps,
        maxAccounts: maxAccounts,
        excludeDexes: 'Obric+V2',
      };

      const jupiterQuote = await getJupiterQuote(jupiterQuoteParams);

      const swapBody = {
        quoteResponse: jupiterQuote,
        userPublicKey: wallet.publicKey.toString(),
      };

      const result = await jupiterSwapInstructions(swapBody);

      const contract = initLendingContract(wallet);
      const hash = await contract.redeemByCollateral({
        collateralAmountRaw: amount.toFixed(0),
        selectedToken,
        resultSwapInstructions: result,
        priorityFee,
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

export default useRedeemWithCollateral;
