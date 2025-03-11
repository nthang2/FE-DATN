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
        height: 250,
        alignTicks: false,
        plotBorderWidth: 0,
        plotShadow: false,
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
          [0, 'red'],
          [1.5, 'orange'],
          [4, 'green'],
        ],
        categories: ['1.2', '1.5', '2'],
        min: 0,
        max: 4,
        lineWidth: 0,
        tickWidth: 0,
        tickAmount: 10,
        minorTickColor: 'none',
        offset: 60, //khoang cach so va do thi
        labels: {
          distance: -20,
          rotation: 0,
          // x: 16,
          y: 0,
          style: {
            fontSize: '10px',
          },
        },
        tickPosition: 'inside',
        tickLength: 5,
        endOnTick: false,
      },
      series: [
        {
          type: 'solidgauge',
          data: [5],
          dataLabels: {
            enabled: true,
            format: '{y}', // Hiển thị giá trị số
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'text.primary',
              top: '20px',
            },
            align: 'center',
            verticalAlign: 'bottom',
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
