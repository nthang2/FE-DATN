import { Box, Switch, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import TooltipInfo from 'src/components/Common/TooltipInfo/TooltipInfo';
import useDonutChartConfig from 'src/hooks/useHighcharts/useDonutChartConfig';
import { compactNumber } from 'src/utils/format';

export default function MyWallet() {
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
      labels: {
        formatter() {
          const value = Number(this.value);
          return `<p style="color:#787E7E; font-size:10px;">${compactNumber(value)}</p>`;
        },
      },
    },
    legend: {
      enabled: false,
      useHTML: true,
      symbolRadius: 2,
      symbolHeight: 11,
      itemMarginTop: -20,
      itemStyle: {
        fontSize: '20px',
      },
      labelFormatter: function () {
        return `<span style="font-size: 14px;color:#97A8BC; font-weight: 450">${this.name}</span>`;
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
    },
    series: [
      {
        name: 'Percentage',
        colorByPoint: true,
        data: [
          {
            name: 'Water',
            y: 55.02,
          },
          {
            name: 'Fat',
            sliced: true,
            selected: true,
            y: 26.71,
          },
          {
            name: 'Carbohydrates',
            y: 1.09,
          },
          {
            name: 'Protein',
            y: 15.5,
          },
          {
            name: 'Ash',
            y: 1.68,
          },
        ],
      },
    ],
  });

  return (
    <BoxCustom sx={{ mt: 2 }}>
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
      <HighchartsReact highcharts={Highcharts} options={options} />
    </BoxCustom>
  );
}
