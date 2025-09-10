import React, { useMemo, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import useLineChartConfig from 'src/hooks/useHighcharts/useLineChartConfig';
import { MenuItem, Stack, Typography } from '@mui/material';
import { CustomSelect } from 'src/components/General/CustomSelect/CustomSelect';
import useGetEarning from 'src/views/Vaults/hooks/useGetEarning';

const selectOptions = [7, 30, 90];

const SupplyChart = () => {
  const [selectedOption, setSelectedOption] = useState<string>('30');
  const { data: earningData } = useGetEarning(Number(selectedOption));

  const dataChart = useMemo(() => {
    return earningData?.data.map((item) => [item.timestamp * 1000, Number(item.totalStaked.toFixed(0))]);
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
