import { useQuery } from '@tanstack/react-query';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'src/libs/crypto-icons';
import { getJupiterQuote } from 'src/services/HandleApi/getJupiterInfo/getJupiterInfo';
import { BN } from 'src/utils';

const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
const maxAccounts = 46;

const useJupiterQuote = (props: { repayInput: string; selectedToken: string; slippageBps: number }) => {
  const { repayInput, selectedToken, slippageBps } = props;

  const query = useQuery({
    queryKey: ['jupiterQuote', repayInput, selectedToken, slippageBps],
    queryFn: async () => {
      const selectedTokenInfo = findTokenInfoByToken(selectedToken);
      const amount = BN(repayInput).multipliedBy(BN(10).pow(BN(selectedTokenInfo?.decimals || 0)));

      const jupiterQuoteParams = {
        inputMint: selectedToken,
        outputMint: usdaiInfo.address,
        amount: BigInt(amount.toFixed(0)).toString(),
        slippageBps: slippageBps * 100,
        maxAccounts: maxAccounts,
        excludeDexes: 'Obric+V2',
      };

      const jupiterQuote = await getJupiterQuote(jupiterQuoteParams);

      return jupiterQuote as {
        outAmount: string;
        priceImpactPct: string;
        otherAmountThreshold: string;
      };
    },
    enabled: Number(repayInput) > 0,
  });
  return query;
};

export default useJupiterQuote;
