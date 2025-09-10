import { Box, Stack, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import useDonutChartConfig from 'src/hooks/useHighcharts/useDonutChartConfig';
import { chartColors } from 'src/hooks/useHighcharts/useHighchartsDefaultConfig';
import { formatNumber } from 'src/utils/format';
import useGetSystemBacking from '../../../hooks/useGetSystemBacking';

const SystemBackingChart = () => {
  const { data: systemBacking } = useGetSystemBacking();

  const chartData = useMemo(() => {
    return Object.values(systemBacking?.assets ?? {}).map((item) => ({
      id: item.name,
      name: item.name,
      y: item.depositedUSD,
    }));
  }, [systemBacking]);

  const options: Highcharts.Options = useDonutChartConfig(
    {
      chart: {
        height: 400,
      },
      title: {
        text: '',
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          return `${this.name}: <b>${this.y != undefined && formatNumber(this.y, { fractionDigits: 0, prefix: '$' })}</b>`;
        },
      },
      series: [
        {
          type: 'pie',
          data: chartData,
        },
      ],
    },
    [systemBacking]
  );

  return (
    <BoxCustom
      sx={{
        bgcolor: '#000',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        System Backing
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Box
          className="flex-center"
          sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', flexDirection: 'column' }}
        >
          <Typography variant="h6" fontWeight={400}>
            Total
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {formatNumber(systemBacking?.marketSize ?? 0, { fractionDigits: 0, prefix: '$' })}
          </Typography>
        </Box>
      </Box>

      <Stack gap={1.5} flexWrap="wrap">
        {chartData.map((item, index) => (
          <Box key={item.id} className="flex-center" alignItems={'center'} gap={0.5}>
            <Box sx={{ width: '16px', height: '16px', borderRadius: '20%', bgcolor: chartColors[index] || '#000' }} />
            <Typography
              variant="body2"
              align="center"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                lineHeight: 'unset',
                marginTop: '2px',
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Stack>
    </BoxCustom>
  );
};

export default SystemBackingChart;
