import { Box, Typography } from '@mui/material';
import { TokenName } from 'crypto-token-icon';
import { useMemo } from 'react';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { formatNumber } from 'src/utils/format';
import SliderCustom from './components/SliderCustom';

export default function YourPosition() {
  const { address } = useSummarySolanaConnect();
  const { data: depositValueData, status: statusQueryDepositValue } = useQueryDepositValue();
  const { data: yourBorrowData, status: statusQueryYourBorrow } = useQueryYourBorrow();
  const { data: tokensPrice, status: statusQueryAllTokensPrice } = useQueryAllTokensPrice();
  const { data: dataStakedInfo, status: statusStakedInfo } = useStakedInfo();
  const { balance: balanceUSDAI } = useSolanaBalanceToken(address, TokenName.USDAI);

  const totalDepositValue = useMemo(() => {
    if (depositValueData && Object.keys(depositValueData).length > 0 && tokensPrice) {
      return Object.entries(depositValueData).reduce((a, [k, v]) => a + Number(v) * Number(tokensPrice[k]?.price ?? 1), 0);
    }
  }, [depositValueData, tokensPrice]);

  const totalDepositValueRatio = useMemo(() => {
    if (depositValueData && Object.keys(depositValueData).length > 0 && tokensPrice) {
      return Object.entries(depositValueData).reduce((a, [k, v]) => {
        const total =
          a + Number(v) * Number(tokensPrice[k]?.price * Number(findTokenInfoByToken(k) ? findTokenInfoByToken(k)?.ratio ?? 0.3 : 1));
        return total;
      }, 0);
    }
  }, [depositValueData, tokensPrice]);

  const totalYourBorrowValue = useMemo(() => {
    if (yourBorrowData && Object.keys(yourBorrowData).length > 0) {
      return Object.values(yourBorrowData).reduce((a, b) => a + Number(b), 0);
    }
  }, [yourBorrowData]);

  const valueHasMinted = useMemo(() => {
    if (totalDepositValue && totalYourBorrowValue) {
      return Number(totalDepositValueRatio) < totalYourBorrowValue ? totalDepositValueRatio : totalYourBorrowValue;
    }

    return totalYourBorrowValue;
  }, [totalDepositValue, totalDepositValueRatio, totalYourBorrowValue]);

  return (
    <BoxCustom>
      <Typography variant="h5">Your Position</Typography>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Collateral Deposited</Typography>
          <ValueWithStatus
            status={[statusQueryDepositValue, statusQueryYourBorrow, statusQueryAllTokensPrice]}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(totalDepositValue, { fractionDigits: 2, prefix: '$' })}
              </Typography>
            }
          />
        </Box>
        <SliderCustom
          status={[statusQueryDepositValue, statusQueryYourBorrow, statusQueryAllTokensPrice]}
          maxValue={totalDepositValue}
          value={totalDepositValue}
        />
      </Box>
      <Box sx={{ mb: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Minted</Typography>
          <ValueWithStatus
            status={[statusQueryDepositValue, statusQueryYourBorrow, statusQueryAllTokensPrice]}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(totalYourBorrowValue, { fractionDigits: 2, prefix: '$' })}
              </Typography>
            }
          />
        </Box>
        <SliderCustom
          status={[statusQueryDepositValue, statusQueryYourBorrow, statusQueryAllTokensPrice]}
          value={valueHasMinted}
          maxValue={totalDepositValue && Number(totalDepositValueRatio)}
        />
      </Box>
      <Box sx={{ mb: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Staked</Typography>
          <ValueWithStatus
            status={[statusQueryDepositValue, statusQueryYourBorrow, statusQueryAllTokensPrice]}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(dataStakedInfo?.amount ? Number(dataStakedInfo?.amount) : 0, {
                  prefix: '$',
                })}
              </Typography>
            }
          />
        </Box>
        <SliderCustom
          status={[statusStakedInfo]}
          value={dataStakedInfo?.amount ? Number(dataStakedInfo?.amount) : 0}
          maxValue={Number(balanceUSDAI.toString()) + (dataStakedInfo?.amount ? Number(dataStakedInfo?.amount) : 0)}
        />
      </Box>
    </BoxCustom>
  );
}
