import { Stack, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo, useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import ToggleButtonGroupCustom from 'src/components/General/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import useLineChartConfig from 'src/hooks/useHighcharts/useLineChartConfig';
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
    return earningData?.data.map((item) => [item.timestamp * 1000, Number(item.totalStaked.toFixed(0))]) || [];
  }, [earningData]);

  const options: Highcharts.Options = useLineChartConfig(
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
        line: {
          color: '#d8ff91',
        },
      },
      series: [
        {
          name: 'USDAI Supply',
          data: dataChart,
        } as Highcharts.SeriesOptionsType,
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
