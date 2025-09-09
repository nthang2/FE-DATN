import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useDonutChartConfig from 'src/hooks/useHighcharts/useDonutChartConfig';
import { formatNumber } from 'src/utils/format';

const mockData = [
  {
    id: '1',
    name: Object.keys(listTokenAvailable)[0],
    y: 100,
  },
  {
    id: '2',
    name: Object.keys(listTokenAvailable)[1],
    y: 200,
  },
];

const CollateralFarmingChart = () => {
  const options: Highcharts.Options = useDonutChartConfig(
    {
      chart: {
        height: 350,
      },
      title: {
        text: '',
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
          data: mockData,
        },
      ],
    },
    []
  );

  return (
    <Box sx={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Box
        className="flex-center"
        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', flexDirection: 'column' }}
      >
        <Typography variant="h6" fontWeight={400}>
          Total
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          $100,000
        </Typography>
      </Box>
    </Box>
  );
};

export default CollateralFarmingChart;
