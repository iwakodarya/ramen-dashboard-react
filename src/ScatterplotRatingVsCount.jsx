import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useRef, useEffect } from "react";

export default function ScatterplotRatingVsCount({
  data,
  highlightCountry,
  onPointClick,
  onPointHover,
}) {
  const chartRef = useRef(null);

  // Set up highlighted country clearing on mouse move
  useEffect(() => {
    const chart = chartRef.current?.chart;
    if (!chart) return;

    const handleMouseMove = () => {
      if (!chart.hoverPoint && highlightCountry !== undefined) {
        onPointHover(undefined);
      }
    };

    chart.container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      chart.container?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [highlightCountry]);

  // Transform into array of formatted object for chart input
  const chartData = Object.entries(data).map(([key, value]) => {
    return {
      x: Math.round(value.avg_rating * 10) / 10,
      y: value.count,
      label: key,
      color: key === highlightCountry ? "#FFBF00" : "#895129",
      dataLabels:
        key === highlightCountry
          ? {
              enabled: true,
              format: `{point.label}:<br>({point.x}, {point.y})`,
            }
          : {
              enabled: false,
            },
    };
  });

  const options = {
    chart: {
      type: "scatter",
      events: {
        click: function (e) {
          if (!e.point) {
            onPointClick(undefined);
          }
        },
      },
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              radiusPlus: 3,
            },
          },
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    title: {
      text: "Ramen Produced Count vs Avg Ramen Rating",
    },
    yAxis: {
      title: {
        text: "Count",
      },
    },
    xAxis: {
      title: {
        text: "Avg Rating",
      },
      min: 0,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        marker: {
          symbol: "diamond",
        },
        data: chartData,
        point: {
          events: {
            click: function () {
              onPointClick(this.label);
            },
            mouseOver: function () {
              onPointHover(this.label);
            },
          },
        },
      },
    ],
  };

  return (
    <div id="scatter-chart-1">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      ></HighchartsReact>
    </div>
  );
}
