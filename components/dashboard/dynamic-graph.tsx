import { useEffect, useRef } from "react";

import * as echarts from 'echarts';

interface DataItem {
  name: string;
  value: [string, number];
}

export default function DynamicGraph() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    // Initial data setup
    const now = new Date();
    const oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;
    const data: DataItem[] = [];

    for (let i = 0; i < 100; i++) {
      const newDate = new Date(+now - oneDay * i);
      data.unshift({
        name: newDate.toString(),
        value: [
          [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join('/'),
          Math.round(value)
        ]
      });
      value += Math.random() * 21 - 10;
    }

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const param = params[0];
          const date = new Date(param.name);
          return `${date.toLocaleDateString()}: ${param.value[1]} attacks`;
        }
      },
      xAxis: {
        type: 'time',
        splitLine: { show: false }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: { show: false }
      },
      series: [{
        name: 'Attacks',
        type: 'line',
        showSymbol: false,
        data: data,
        lineStyle: {
          color: '#0099ff',
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 153, 255, 0.3)' },
            { offset: 1, color: 'rgba(0, 153, 255, 0.1)' }
          ])
        }
      }]
    };

    chart.setOption(option);

    // Update data every second
    const timer = setInterval(() => {
      const newDate = new Date();
      const newValue = Math.round(Math.random() * 100);
      
      data.shift();
      data.push({
        name: newDate.toString(),
        value: [
          [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join('/'),
          newValue
        ]
      });

      chart.setOption({
        series: [{
          data: data
        }]
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={chartRef} style={{ height: '300px', width: '100%' }} />;
}