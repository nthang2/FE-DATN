import Highcharts from 'highcharts';
import { useMemo } from 'react';
import useHighchartsDefaultConfig from './useHighchartsDefaultConfig';

export default function useSolidGaugeConfig(extraOptions: Highcharts.Options, deps: unknown[] = []) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: 'gauge',
          backgroundColor: 'transparent',
        },
        plotOptions: {
          solidgauge: {
            borderRadius: 3,
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true,
            },
          },
        },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
