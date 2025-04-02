import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ScatterplotRatingVsCount({ data }) {
  // Transform into array of formatted object for chart input
  const chartData = Object.entries(data).map(([key, value]) => {
    return {
      x: Math.round(value.avg_rating * 10) / 10,
      y: value.count,
      label: key,
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
      headerFormat: "",
      pointFormat:
        "<b>{point.label}</b>:<br/>Avg Rating: {point.x}<br/>Count: {point.y}",
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
        color: "#895129",
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    ></HighchartsReact>
  );
}
