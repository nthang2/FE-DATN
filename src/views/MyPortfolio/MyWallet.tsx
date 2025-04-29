import { Box, Switch, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo, useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { listTokenAvailable, TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useDonutChartConfig from 'src/hooks/useHighcharts/useDonutChartConfig';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useMyPortfolio from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import { useSolanaBalanceTokens } from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { compactNumber, formatNumber } from 'src/utils/format';

export default function MyWallet() {
  const { address } = useSummarySolanaConnect();
  const balance = useSolanaBalanceTokens(address, Object.keys(listTokenAvailable) as Array<TSolanaToken>);
  const { data: tokensPrice, status: queryAllTokensPriceStatus } = useQueryAllTokensPrice();
  const { data: depositValue, status: queryDepositValueStatus } = useQueryDepositValue();
  const { asset } = useMyPortfolio();

  const [includeDeposits, setIncludeDeposits] = useState<boolean>(false);

  const totalPrice = useMemo(() => {
    if (tokensPrice != undefined && !includeDeposits)
      return Object.values(balance).reduce((a, b) => {
        if (tokensPrice[b.address] && tokensPrice[b.address].price != null) {
          const price = tokensPrice[b.address] != undefined ? Number(tokensPrice[b.address]?.price) : 1;
          return a + Number(b.balance.toString()) * price;
        }
        return a;
      }, 0);
    else if (tokensPrice != undefined && includeDeposits && depositValue && asset) {
      return Object.values(balance).reduce((a, b) => {
        if (tokensPrice[b.address] && tokensPrice[b.address].price != null) {
          const price = tokensPrice[b.address] != undefined ? Number(tokensPrice[b.address]?.price) : 1;
          return a + (Number(b.balance.toString()) + Number(asset[b.address]?.depositedAmount ?? 0)) * price;
        }
        return a;
      }, 0);
    } else return 0;
  }, [tokensPrice, includeDeposits, balance, depositValue, asset]);

  const balanceStatus = useMemo(() => {
    const statusTokens = balance.map((item) => {
      return item.isLoading ? 'error' : 'success';
    });
    return statusTokens;
  }, [balance]);

  const chartData = useMemo(() => {
    // eslint-disable-next-line prefer-const
    let result = [] as Array<{ id: string; name: string; y: number }>;
    if (balance && tokensPrice) {
      if (includeDeposits && depositValue && asset) {
        balance.forEach((item, index) => {
          result.push({
            id: index.toString(),
            name: Object.keys(listTokenAvailable)[index],
            y:
              (Number(item.balance.toString()) + Number(asset[item.address]?.depositedAmount ?? 0)) *
              Number(tokensPrice[item.address]?.price ?? 1),
          });
        });
      } else {
        balance.forEach((item, index) => {
          result.push({
            id: index.toString(),
            name: Object.keys(listTokenAvailable)[index],
            y: Number(item.balance.toString()) * Number(tokensPrice[item.address]?.price ?? 1),
          });
        });
      }
      return result;
    }
  }, [balance, depositValue, includeDeposits, asset]);

  const options = useDonutChartConfig(
    {
      chart: {
        height: 300,
      },
      title: {
        text: '',
      },
      yAxis: {
        title: {
          text: undefined,
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          return `${this.name}: <b>${this.y != undefined && formatNumber(this.y, { fractionDigits: 2, prefix: '$' })}</b>`;
        },
      },
      series: [
        {
          // states: {
          //   inactive: {
          //     opacity: 0.2,
          //     enabled: true,
          //   },
          // },
          type: 'pie',
          data: chartData,
        },
      ],
    },
    [chartData]
  );

  return (
    <BoxCustom sx={{ bgcolor: 'background.default' }}>
      <Box className="flex-space-between">
        <Box className="flex-start">
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            My Wallet
          </Typography>
          <TooltipInfo title="Assets in my wallet" />
        </Box>
        <Box className="flex-end">
          <Typography variant="caption2" sx={{ color: 'text.secondary' }}>
            Include deposits
          </Typography>
          <Switch sx={{ ml: 1 }} value={includeDeposits} onChange={() => setIncludeDeposits(!includeDeposits)} />
        </Box>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6" sx={{ fontWeight: 400, textAlign: 'center' }}>
            Total
          </Typography>
          <Box className="flex-center">
            <ValueWithStatus
              status={[...[queryAllTokensPriceStatus, includeDeposits ? queryDepositValueStatus : 'success'], ...balanceStatus]}
              value={
                <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }}>
                  ${totalPrice != undefined && compactNumber(totalPrice || 0)}
                </Typography>
              }
            />
          </Box>
        </Box>
      </Box>
    </BoxCustom>
  );
}
