import { useTheme } from '@mui/material';
import Highcharts from 'highcharts';
import { useMemo } from 'react';

export const chartColors = ['#FCFFD8', '#DEE995', '#AEBC59', '#5A631F', '#BDECDE', '#A2D0C2'];

export default function useHighchartsDefaultConfig(): Highcharts.Options {
  const theme = useTheme();

  return useMemo<Highcharts.Options>(
    () => ({
      chart: {
        backgroundColor: 'transparent',
      },
      colors: chartColors,
      title: {
        style: {
          color: theme.palette.text.secondary,
          fontSize: '16px',
        },
      },
      yAxis: {
        opposite: true,
        title: {
          text: '',
        },
        labels: {
          style: {
            color: theme.palette.text.secondary,
            fontFamily: theme.typography.fontFamily,
          },
        },
        gridLineColor: 'rgba(255, 255, 255, 0)',
        lineColor: 'transparent',
      },
      xAxis: {
        title: {
          style: {
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
          },
        },
        labels: {
          style: {
            color: theme.palette.text.tertiary,
            fontFamily: theme.typography.fontFamily,
          },
        },
        gridLineColor: 'rgba(255, 255, 255, 0)',
        lineColor: 'transparent',
      },
      tooltip: {
        style: {
          fontFamily: theme.typography.fontFamily,
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      loading: {
        style: {
          backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
        },
      },
    }),
    [theme]
  );
}
