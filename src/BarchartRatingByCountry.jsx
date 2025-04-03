import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function BarchartRatingByCountry({ data }) {
  // Transform into array of formatted object for chart input
  const chartData = Object.entries(data)
    .map(([key, value]) => {
      return {
        name: key,
        y: Math.round(value.avg_rating * 10) / 10,
      };
    })
    .sort((a, b) => b.y - a.y);

  const options = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true, // Enable data labels
          format: "{y}", // Show just the y value (rating)
          align: "left", // Align to right inside the bar
          style: {
            fontWeight: "bold",
          },
        },
      },
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
    <div id="bar-chart-1">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      ></HighchartsReact>
    </div>
  );
}
