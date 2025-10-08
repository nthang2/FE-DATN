import { Box, Switch, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo, useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import useDonutChartConfig from 'src/hooks/useHighcharts/useDonutChartConfig';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useMyPortfolioUniversal from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useMyPortfolioUniversal';
import { compactNumber, formatNumber } from 'src/utils/format';
import { listTokenAvailableUniversal } from 'src/constants/tokens/mapNameToInfo';
import useGetBalanceUniversal from 'src/states/wallets/hooks/useGetBalanceUniversal';
import { TokenName } from 'src/libs/crypto-icons';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';

export default function MyWallet() {
  const { address, networkName } = useSummaryFirstActiveConnect();
  const listTokenAvailable = listTokenAvailableUniversal(networkName);
  const { balance, status: statusBalance } = useGetBalanceUniversal({ address, network: networkName });
  const { priceByTokenName, status: queryAllTokensPriceStatus } = useQueryAllTokensPrice();
  const { assetByTokenName } = useMyPortfolioUniversal();

  const [includeDeposits, setIncludeDeposits] = useState<boolean>(false);

  const totalPrice = useMemo(() => {
    if (!listTokenAvailable || !balance) return 0;
    if (priceByTokenName != undefined && !includeDeposits)
      return Object.values(listTokenAvailable).reduce((a, b) => {
        if (!b) return a;
        if (priceByTokenName[b.symbol] && priceByTokenName[b.symbol].price != null) {
          const price = priceByTokenName[b.symbol] != undefined ? Number(priceByTokenName[b.symbol]?.price) : 1;
          return a + Number(balance[b.symbol]?.toString()) * price;
        }
        return a;
      }, 0);
    else if (priceByTokenName != undefined && includeDeposits && assetByTokenName) {
      return Object.values(listTokenAvailable).reduce((a, b) => {
        if (!b) return a;
        if (priceByTokenName[b.symbol] && priceByTokenName[b.symbol].price != null) {
          const price = priceByTokenName[b.symbol] != undefined ? Number(priceByTokenName[b.symbol]?.price) : 1;
          return a + (Number(balance[b.symbol].toString()) + Number(assetByTokenName[b.symbol]?.depositedAmount ?? 0)) * price;
        }
        return a;
      }, 0);
    } else return 0;
  }, [listTokenAvailable, balance, priceByTokenName, includeDeposits, assetByTokenName]);

  const chartData = useMemo(() => {
    const result = [] as Array<{ id: string; name: string; y: number }>;
    if (address && balance && priceByTokenName) {
      if (includeDeposits && assetByTokenName) {
        Object.entries(balance).forEach(([key, value], index) => {
          const tokenInfo = listTokenAvailable?.[key as TokenName];
          if (!tokenInfo) return;
          result.push({
            id: index.toString(),
            name: key,
            y:
              (Number(value.toString()) + Number(assetByTokenName[key]?.depositedAmount ?? 0)) *
              Number(priceByTokenName[tokenInfo?.symbol]?.price ?? 1),
          });
        });
      } else {
        Object.entries(balance).forEach(([key, value], index) => {
          const tokenInfo = listTokenAvailable?.[key as TokenName];
          if (!tokenInfo) return;
          result.push({
            id: index.toString(),
            name: key,
            y: Number(value.toString()) * Number(priceByTokenName[tokenInfo?.symbol]?.price ?? 1),
          });
        });
      }
    }

    return result;
  }, [balance, priceByTokenName, includeDeposits, assetByTokenName, listTokenAvailable, address]);

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
              status={[
                queryAllTokensPriceStatus as 'error' | 'success' | 'pending',
                includeDeposits ? 'success' : 'success',
                statusBalance as 'error' | 'success' | 'pending',
              ]}
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
