import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function RatingsHistogram({ data, filteredCountry }) {
  // Manually calculate the histogram bins
  const bins = [0, 0, 0, 0, 0, 0]; // For 0-1, 1-2, 2-3, 3-4, 4-5, 5-6

  data.forEach((item) => {
    const rating = item.Stars;
    if (rating >= 0 && rating < 6) {
      const binIndex = Math.floor(rating);
      bins[binIndex]++;
    }
  });

  const options = {
    chart: {
      type: "column",
    },
    plotOptions: {
      column: {
        pointPadding: 0.02,
        groupPadding: 0.02,
        dataLabels: {
          enabled: true,
          formatter: function () {
            const pct = (this.y / data.length) * 100;
            return `${this.y}<br><i>(${pct.toFixed(0)}%)<i>`;
          },
          style: {
            fontSize: "12px",
          },
        },
      },
    },
    title: {
      text: `Star Rating Distribution ${
        filteredCountry ? "(" + filteredCountry + ")" : "(all countries)"
      }`,
    },
    xAxis: {
      categories: ["0 ⭐️", "1 ⭐️", "2 ⭐️", "3 ⭐️", "4 ⭐️", "5 ⭐️"],
      title: { text: "Star Rating" },
      labels: {
        style: {
          fontSize: "16px", // Change this value to your desired font size
          fontWeight: "bold", // Optionally make it bold
        },
      },
    },
    yAxis: {
      visible: false,
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Ratings",
        data: bins,
        color: "#FFBF00",
      },
    ],
  };

  return (
    <div id="hist-chart-1">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: 270 } }}
      />
    </div>
  );
}
