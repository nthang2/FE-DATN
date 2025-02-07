import Highcharts from 'highcharts';
import { useMemo } from 'react';
import useHighchartsDefaultConfig from './useHighchartsDefaultConfig';

export default function useDonutChartConfig(extraOptions: Highcharts.Options, deps: unknown[] = []) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: 'pie',
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            borderRadius: 2,
          },
        },
        xAxis: {
          crosshair: {
            width: 15,
            snap: false,
            color: 'transparent',
            dashStyle: 'Solid',
          },
        },
        legend: {
          enabled: true,
          layout: 'horizontal',
          align: 'right',
          verticalAlign: 'top',
          itemMarginTop: 0,
          itemMarginBottom: 10,
        },
        tooltip: {
          shared: true,
        },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
