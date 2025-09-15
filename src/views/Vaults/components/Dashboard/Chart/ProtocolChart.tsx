import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import useDonutChartConfig from 'src/hooks/useHighcharts/useDonutChartConfig';
import { formatNumber } from 'src/utils/format';
import useGetProtocolPositions from 'src/views/Vaults/hooks/useGetProtocolPositions';

const ProtocolChart = () => {
  const { data } = useGetProtocolPositions();

  const chartData = useMemo(() => {
    return data?.map((item) => ({
      id: item.protocol,
      name: item.protocol,
      y: item.percentage * 100,
    }));
  }, [data]);

  const totalTvl = useMemo(() => {
    return data?.reduce((acc, item) => acc + item.tvl, 0) || 0;
  }, [data]);

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
          return `${this.name}: <b>${this.y != undefined && formatNumber(this.y, { fractionDigits: 2 })}%</b>`;
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
          ${totalTvl.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProtocolChart;
