import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function BarchartRatingByCountry({
  data,
  highlightCountry,
  onPointClick,
  onPointHover,
}) {
  // Transform into array of formatted object for chart input
  const chartData = Object.entries(data)
    .map(([key, value]) => {
      return {
        name: key,
        y: Math.round(value.avg_rating * 10) / 10,
        color: highlightCountry === key ? "#FFBF00" : "#895129",
        dataLabels:
          key === highlightCountry
            ? {
                enabled: true,
                format: `{point.y}`,
              }
            : {
                enabled: false,
              },
      };
    })
    .sort((a, b) => b.y - a.y);

  const options = {
    chart: {
      type: "bar",
    },
    tooltip: {
      enabled: false,
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
        point: {
          events: {
            click: function () {
              onPointClick(this.key);
            },
            mouseOver: function () {
              onPointHover(this.key);
            },
          },
        },
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
