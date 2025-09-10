import { Stack, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import ToggleButtonGroupCustom from 'src/components/General/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import useLineChartConfig from 'src/hooks/useHighcharts/useLineChartConfig';
import { useState } from 'react';

const ToggleButtonGroups = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
];

const mockDataChart = [
  [Date.UTC(2020, 0, 1), 3],
  [Date.UTC(2020, 2, 1), 5],
  [Date.UTC(2020, 5, 1), 7],
  [Date.UTC(2020, 8, 1), 10],
  [Date.UTC(2020, 10, 1), 20],
  [Date.UTC(2020, 11, 1), 10],
  [Date.UTC(2021, 0, 1), 10],
];

const EarningRateChart = () => {
  const [toggleValue, setToggleValue] = useState<string>('1');
  const options: Highcharts.Options = useLineChartConfig(
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
          data: mockDataChart,
        } as Highcharts.SeriesOptionsType,
      ],
    },
    []
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
