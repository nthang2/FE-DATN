import Highcharts from 'highcharts';
import { useMemo } from 'react';
import useHighchartsDefaultConfig from './useHighchartsDefaultConfig';

export default function useAreaChartConfig(extraOptions: Highcharts.Options, deps: unknown[] = []) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: 'area',
          backgroundColor: '#111',
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
          labels: { style: { color: '#aaa' } },
          gridLineColor: '#222',
          max: 15,
        },
        legend: { enabled: false },
        tooltip: {
          valueSuffix: '%',
          backgroundColor: '#222',
          style: { color: '#fff' },
        },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
