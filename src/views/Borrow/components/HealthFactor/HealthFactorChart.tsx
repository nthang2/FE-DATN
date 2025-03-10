import { Box } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/highcharts-more';
import 'highcharts/modules/solid-gauge';
import useSolidGaugeConfig from 'src/hooks/useHighcharts/useSolidGaugeConfig';

export default function HealthFactorChart() {
  const options = useSolidGaugeConfig(
    {
      chart: {
        height: 200,
        borderWidth: 0,
        plotBorderWidth: 0,
      },
      title: {
        text: '',
      },

      legend: {
        enabled: false,
      },
      pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: [
          {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
              stops: [
                [0, '#FFFFFF'],
                [1, '#08DBA4'],
              ],
            },
            borderRadius: 2,
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
          },
        ],
      },
      yAxis: {
        stops: [
          [1.2, 'red'],
          [1.5, 'orange'],
          [2.0, 'green'],
        ],
        min: 1,
        max: 2,
        lineWidth: 0,
        tickWidth: 0,
        tickAmount: 2,
        title: {
          y: -70,
          text: undefined,
        },
        labels: {
          y: 16,
        },
      },
      series: [
        {
          type: 'solidgauge',
          data: [1.2],
          dataLabels: {
            enabled: true,
            format: '{y}%', // Hiển thị giá trị số
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333',
            },
            align: 'center',
            verticalAlign: 'middle',
          },
        },
      ],
    },
    []
  );
  return (
    <Box className="flex-center" sx={{ my: 2 }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
