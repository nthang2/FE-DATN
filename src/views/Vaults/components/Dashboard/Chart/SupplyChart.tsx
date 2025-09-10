import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import useLineChartConfig from 'src/hooks/useHighcharts/useLineChartConfig';
// import { useState } from 'react';
import { MenuItem, Stack, Typography } from '@mui/material';
import { CustomSelect } from 'src/components/General/CustomSelect/CustomSelect';

const mockData = [
  [Date.UTC(2023, 11, 1), 1000000000], // 1B
  [Date.UTC(2023, 11, 15), 3000000000], // 3B
  [Date.UTC(2024, 0, 1), 4000000000], // 4B
  [Date.UTC(2024, 2, 1), 6000000000], // 6B
  [Date.UTC(2024, 4, 1), 8000000000], // 8B
  [Date.UTC(2024, 5, 1), 4000000000], // 4B
  [Date.UTC(2024, 7, 1), 5000000000], // 5B
  [Date.UTC(2024, 8, 1), 9000000000], // 9B
  [Date.UTC(2024, 9, 1), 11000000000], // 11B
  [Date.UTC(2024, 11, 31), 8000000000], // 8B
];

const selectOptions = [1, 2, 3];

const SupplyChart = () => {
  const [selectedOption, setSelectedOption] = useState<string>('1');
  const options: Highcharts.Options = useLineChartConfig({
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
      labels: {
        style: { color: '#aaa' },
        formatter: function () {
          return '$' + Number(this.value) / 1000000000 + 'B';
        },
      },
      gridLineColor: '#222',
      max: 12000000000, // $12B
      opposite: false,
    },
    tooltip: {
      valuePrefix: '$',
      valueSuffix: ' USD',
      backgroundColor: '#222',
      style: { color: '#fff' },
      formatter: function () {
        return Highcharts.dateFormat('%e %b %Y', this.x) + '<br/><b>$' + Highcharts.numberFormat(Number(this.y) / 1000000000, 1) + 'B</b>';
      },
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
        data: mockData,
      } as Highcharts.SeriesOptionsType,
    ],
  });

  return (
    <BoxCustom sx={{ bgcolor: '#000' }} mt={2}>
      <Stack alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          USDAI Supply
        </Typography>

        <CustomSelect value={selectedOption} onChange={(e) => setSelectedOption(e.target.value as string)} sx={{ height: '35px' }}>
          {selectOptions.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </CustomSelect>
      </Stack>

      <HighchartsReact highcharts={Highcharts} options={options} />
    </BoxCustom>
  );
};

export default SupplyChart;
