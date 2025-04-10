import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapData from "@highcharts/map-collection/custom/world.topo.json";
import MapModule from "highcharts/modules/map";

// Initialize the Highcharts map module
if (typeof MapModule === "function") {
  MapModule(Highcharts);
}

export default function MapChart({
  data,
  highlightCountry,
  onPointClick,
  onPointHover,
}) {
  const chartData = Object.entries(data).map(([key, value]) => {
    return {
      key,
      value: value.count,
      dataLabels:
        key === highlightCountry
          ? {
              enabled: true,
              format: `{point.key}: {point.value}`,
            }
          : {
              enabled: false,
            },
      borderWidth: key === highlightCountry ? 2 : 0.5,
      borderColor: key === highlightCountry ? "black" : "#cccccc",
    };
  });

  const options = {
    chart: {
      animation: false,
    },
    title: {
      text: "Ramen Varieties Count Map",
    },
    colorAxis: {
      maxColor: "#FFBF00",
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        animation: false,
      },
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    mapView: {
      zoom: 2.5,
      center: [10, 58],
      animation: false,
    },
    series: [
      {
        mapData,
        name: "Ramen Count",
        data: chartData,
        joinBy: ["name", "key"],
        dataLabels: {
          format: "{point.key}: {point.value:.0f}",
        },
        borderColor: "#cccccc", // fallback
        borderWidth: 0.5, // fallback
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
    <div id="map-chart-1">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="mapChart"
        options={options}
        containerProps={{ style: { height: 500 } }}
      />
    </div>
  );
}
