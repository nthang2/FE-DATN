import { Box, Switch, Typography } from '@mui/material';
import { TokenName } from 'crypto-token-icon';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import TooltipInfo from 'src/components/Common/TooltipInfo/TooltipInfo';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useDonutChartConfig from 'src/hooks/useHighcharts/useDonutChartConfig';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { useSolanaBalanceTokens } from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { compactNumber } from 'src/utils/format';

export default function MyWallet() {
  const { address } = useSummarySolanaConnect();
  const balance = useSolanaBalanceTokens(
    address,
    Object.keys(mapNameToInfoSolana) as Array<TokenName.TRUMP | TokenName.MAX | TokenName.AI16Z>
  );
  const price = useQueryAllTokensPrice();
  const totalPrice = useMemo(() => {
    return 30000000;
  }, [price]);

  const chartData = useMemo(() => {
    // eslint-disable-next-line prefer-const
    let result = [] as Array<{ id: string; name: string; y: number; value: number }>;
    if (balance) {
      balance.forEach((item, index) => {
        result.push({
          id: index.toString(),
          name: Object.keys(mapNameToInfoSolana)[index],
          y: Number(item.balance.toString()),
          value: Number(item.balance.toString()),
        });
      });
      return result;
    }
  }, [balance]);

  const options = useDonutChartConfig({
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
        return `${this.name}: <b>${this.y != undefined && compactNumber(this.y)}</b>`;
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
  });

  return (
    <BoxCustom sx={{}}>
      <Box className="flex-space-between">
        <Box className="flex-start">
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            My Wallet
          </Typography>
          <TooltipInfo title="My Wallet" />
        </Box>
        <Box className="flex-end">
          <Typography variant="caption2" sx={{ color: 'text.secondary' }}>
            Include deposits
          </Typography>
          <Switch sx={{ ml: 1 }} />
        </Box>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6" sx={{ fontWeight: 400, textAlign: 'center' }}>
            Total
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }}>
            ${compactNumber(totalPrice)}
          </Typography>
        </Box>
      </Box>
    </BoxCustom>
  );
}
