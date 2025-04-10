import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ScatterplotRatingVsCount({
  data,
  highlightCountry,
  onPointClick,
  onPointHover,
}) {
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
      text: "Ramen Count vs Avg Ramen Rating",
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
      ></HighchartsReact>
    </div>
  );
}
