import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useLendingContract from 'src/hooks/useContract/useLendingContract';
import { TokenName } from 'src/libs/crypto-icons';
import { getJupiterQuote, jupiterSwapInstructions } from 'src/services/HandleApi/getJupiterInfo/getJupiterInfo';
import { BN } from 'src/utils';
import { decimalFlood } from 'src/utils/format';

const maxAccounts = 40;

const useRedeemWithCollateral = () => {
  const wallet = useWallet();
  const { initLendingContract } = useLendingContract();

  const query = useMutation({
    mutationKey: ['getJupiterQuote'],
    mutationFn: async (params: { repayInput: string; selectedToken: string; slippageBps: number; priorityFee: number }) => {
      if (!wallet.publicKey) return 0;

      const { repayInput, selectedToken, slippageBps, priorityFee } = params;
      const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
      const selectedTokenInfo = findTokenInfoByToken(selectedToken);

      const amount = decimalFlood(
        BN(repayInput)
          .multipliedBy(BN(10).pow(BN(selectedTokenInfo?.decimals || 0)))
          .toString(),
        0
      );

      const jupiterQuoteParams = {
        inputMint: selectedToken,
        outputMint: usdaiInfo.address,
        amount: BigInt(amount).toString(),
        slippageBps: slippageBps,
        maxAccounts: maxAccounts,
        excludeDexes: 'Obric V2',
      };

      const jupiterQuote = await getJupiterQuote(jupiterQuoteParams);

      const swapBody = {
        quoteResponse: jupiterQuote,
        userPublicKey: wallet.publicKey.toString(),
      };

      const result = await jupiterSwapInstructions(swapBody);

      const contract = initLendingContract(wallet);
      const hash = await contract.redeemByCollateral({
        collateralAmountRaw: amount,
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
