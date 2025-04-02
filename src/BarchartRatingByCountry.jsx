import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function BarchartRatingByCountry({ data }) {
  // Transform into array of formatted object for chart input
  const chartData = Object.entries(data)
    .map(([key, value]) => {
      return {
        name: key,
        y: Math.round(value.avg_rating * 100) / 100,
      };
    })
    .sort((a, b) => b.y - a.y);

  console.log(chartData);

  const options = {
    chart: {
      type: "bar",
    },
    tooltip: {
      headerFormat: "",
      pointFormat: "<b>{point.name}</b>:<br/>Avg Rating: {point.y}",
    },
    title: {
      text: "Avg Ramen Rating by Country",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Country",
      },
    },
    yAxis: {
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
