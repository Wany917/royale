import { useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useRef } from "react";
import * as echarts from "echarts";

import { hours, days, mockAttackData } from "@/mock/_attack-data";

export default function AttackHeatmap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.ECharts>();

  useEffect(() => {
    if (chartRef.current) {
      chart.current = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          position: "top",
          formatter: function (params: any) {
            return `${params.name} - ${params.data[2]} attacks`;
          },
        },
        grid: {
          height: "50%",
          top: "10%",
        },
        xAxis: {
          type: "category",
          data: hours,
          splitArea: { show: true },
        },
        yAxis: {
          type: "category",
          data: days,
          splitArea: { show: true },
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: "horizontal",
          left: "center",
          bottom: "15%",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "Attacks",
            type: "heatmap",
            data: mockAttackData,
            label: { show: true },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      chart.current.setOption(option);
    }

    return () => {
      chart.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      chart.current?.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3 text-xl font-bold">
        Attack Distribution - <span className="text-xs">(Last 7 Days)</span>
      </CardHeader>
      <CardBody>
        <div ref={chartRef} style={{ height: "400px", width: "100%" }} />
      </CardBody>
    </Card>
  );
}
