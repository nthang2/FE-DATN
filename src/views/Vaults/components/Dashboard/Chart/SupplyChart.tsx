import { Stack, Typography } from '@mui/material';
import Highcharts, { LinearGradientColorObject } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo, useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import ToggleButtonGroupCustom from 'src/components/General/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import useAreaChartConfig from 'src/hooks/useHighcharts/useAreaChartConfig';
import useGetEarning from 'src/views/Vaults/hooks/useGetEarning';

const ToggleButtonGroups = [
  {
    value: '-1',
    label: 'ALL',
  },
  {
    value: '7',
    label: '7D',
  },
  {
    value: '30',
    label: '1M',
  },
  {
    value: '90',
    label: '3M',
  },
];

const SupplyChart = () => {
  const [toggleValue, setToggleValue] = useState<string>('7');
  const { data: earningData } = useGetEarning(Number(toggleValue));

  const dataChart = useMemo(() => {
    return earningData?.data.map((item) => [item.timestamp * 1000, Number(item.totalStaked.toFixed(0))]).sort((a, b) => a[0] - b[0]) || [];
  }, [earningData]);

  const chartMinItem = useMemo(() => {
    return dataChart.reduce((min, item) => Math.min(min, item[1]), Infinity) || 0;
  }, [dataChart]);

  const options: Highcharts.Options = useAreaChartConfig(
    {
      chart: {
        type: 'line',
        backgroundColor: 'transparent',
        height: 250,
      },
      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: { color: '#aaa' },
        },
      },
      yAxis: {
        title: { text: null },
        gridLineColor: '#222',
        max: null,
        opposite: false,
        min: chartMinItem,
      },
      tooltip: {
        valuePrefix: '$',
        valueSuffix: ' USD',
        backgroundColor: '#222',
        style: { color: '#fff' },
      },
      plotOptions: {
        series: {
          marker: { enabled: false },
          lineWidth: 1.2,
        },
      },
      series: [
        {
          type: 'area',
          fillColor: {
            linearGradient: [5, 0, 5, 250] as unknown as LinearGradientColorObject,
            stops: [
              [0, '#d8ff9180'],
              [0.7, 'rgba(226, 231, 150, 0.06)'],
              [1, 'rgba(182, 204, 244, 0.1)'],
            ],
          },
          fillOpacity: 0.1,
          data: dataChart,
          lineColor: '#d8ff9180',
        },
      ],
    },
    [dataChart]
  );

  return (
    <BoxCustom sx={{ bgcolor: '#000' }} mt={2}>
      <Stack alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          USDAI Supply
        </Typography>

        <ToggleButtonGroupCustom
          value={toggleValue}
          handleToggleChange={(_, newAlignment) => setToggleValue(newAlignment)}
          data={ToggleButtonGroups}
        />
      </Stack>

      <HighchartsReact highcharts={Highcharts} options={options} />
    </BoxCustom>
  );
};

export default SupplyChart;
