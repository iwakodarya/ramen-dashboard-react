import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ScatterplotChart({ data }) {
  const aggByCountry = data.reduce((acc, next) => {
    if (next.Country in acc) {
      acc[next.Country].count += 1;
      acc[next.Country].rating_sum += next.Stars;
    } else {
      acc[next.Country] = {
        count: 1,
        rating_sum: next.Stars,
      };
    }
    return acc;
  }, {});

  // Calculate avg_rating
  Object.keys(aggByCountry).forEach((country) => {
    aggByCountry[country].avg_rating =
      aggByCountry[country].rating_sum / aggByCountry[country].count;
  });

  // Transform into array of formatted object for chart input
  const chartData = Object.entries(aggByCountry).map(([key, value]) => {
    return {
      x: Math.round(value.avg_rating * 100) / 100,
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
