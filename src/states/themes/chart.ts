import Highcharts from 'highcharts';
import StockHighcharts from 'highcharts/highstock';
import { alpha, Theme, useTheme } from '@mui/material';
import { useMemo } from 'react';

export type TDataPieChart = {
    title: string;
    valuePercentage: number;
};

export const color1 = '#4CADD3';
export const color2 = '#585F5A';
export const color3 = '#F0B189';
export const color4 = '#927AD1';
export const color5 = '#FCAE6B';
export const color6 = '#A5A5A5';

export const COLOR_ARRAY = [color1, color2, color3, color4, color5, color6];

export const defaultYAxisConfig = {
    labels: {
        enabled: false,
    },
    title: {
        text: undefined,
    },
    gridLineWidth: 0,
};

const defaultOption = (theme: Theme): Highcharts.Options => ({
    chart: {
        backgroundColor: 'transparent',
        style: {
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '14px',
        },
    },
    title: {
        text: '',
        style: {
            color: theme.palette.primary.main,
            fontSize: '16px',
        },
    },
    credits: {
        enabled: false,
    },
    yAxis: {
        // gridLineColor: theme.palette.mode === 'dark' ? '#263343' : '#D7DFEC',
        // lineColor: alpha(theme.palette.primary.main, 0.1),
        // tickColor: alpha(theme.palette.primary.main, 0.1),
        title: {
            text: '',
            style: {
                color: theme.palette.text.primary,
            },
        },
        labels: {
            enabled: false,
            style: {
                color: theme.palette.text.primary,
            },
        },
        gridLineWidth: 0,
    },
    xAxis: {
        gridLineColor: theme.palette.mode === 'dark' ? '#263343' : '#9A9E9A',
        tickColor: alpha('#9A9E9A', 0),
        lineColor: alpha('#9A9E9A', 0.2),
        lineWidth: 2,
        title: {
            style: {
                color: theme.palette.text.primary,
            },
        },
        labels: {
            style: {
                color: '#9A9E9A',
                fontSize: '12px',
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: '400',
            },
        },
        crosshair: {
            dashStyle: 'Dash', // ?: đây là cái thanh thẳng đứng lúc hover hiện ra tooltip
        },
    },
    legend: {
        itemStyle: {
            color: theme.palette.text.secondary,
        },
        itemHoverStyle: {
            color: theme.palette.primary.main,
        },
        itemHiddenStyle: {
            color: theme.palette.mode === 'dark' ? '#7a7a7a' : '#cccccc',
        },
    },
    plotOptions: {
        line: {
            marker: {
                // enabled: false,
                radius: 3, // TODO: set bán kính của dot
                symbol: 'circle',
            },
            lineWidth: 1, // TODO: set lineWidth of chart is 1
            states: {
                hover: {
                    halo: null, // TODO: box shadow của điểm tròn biến mất
                    lineWidth: 1, // TODO: onHover event on chart set lineWidth of chart is 1
                },
            },
        },
        pie: {
            clip: true,
            crisp: false,
        },
    },
    colors: COLOR_ARRAY,
    time: {
        // useUTC: false,
    },
    tooltip: {
        style: {
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '12px',
        },
        shadow: {
            color: '#0000001F',
            offsetX: 0,
            offsetY: 0,
            opacity: 0.2,
            width: 6,
        },
        backgroundColor: 'white',
    },
});

export default function BaseChartStyle() {
    const theme = useTheme();

    useMemo(() => {
        Highcharts.setOptions(defaultOption(theme));
        StockHighcharts.setOptions(defaultOption(theme));
    }, [theme]);

    return null;
}
