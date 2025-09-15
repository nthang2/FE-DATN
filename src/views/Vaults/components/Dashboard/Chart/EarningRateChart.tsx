import { Stack, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import ToggleButtonGroupCustom from 'src/components/General/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import useAreaChartConfig from 'src/hooks/useHighcharts/useAreaChartConfig';
import { useMemo, useState } from 'react';
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

const EarningRateChart = () => {
  const [toggleValue, setToggleValue] = useState<string>('7');
  const { data: earningData } = useGetEarning(Number(toggleValue));

  const dataChart = useMemo(() => {
    return earningData?.data.map((item) => [item.timestamp * 1000, item.earningRate]).sort((a, b) => a[0] - b[0]) || [];
  }, [earningData]);

  const options: Highcharts.Options = useAreaChartConfig(
    {
      chart: {
        backgroundColor: 'transparent',
        height: 250,
      },
      plotOptions: {
        series: {
          step: 'left',
          marker: { enabled: false },
        },
        area: {
          fillOpacity: 0.2,
          color: '#d8ff91',
          lineColor: '#d8ff91',
          lineWidth: 1.5,
        },
      },
      yAxis: {
        opposite: false,
        max: null,
        endOnTick: true,
      },
      series: [
        {
          name: 'Earning Rate',
          data: dataChart,
        } as Highcharts.SeriesOptionsType,
      ],
    },
    [dataChart]
  );

  return (
    <BoxCustom
      sx={{
        bgcolor: '#000',
      }}
    >
      <Stack alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Earning Rate
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

export default EarningRateChart;
