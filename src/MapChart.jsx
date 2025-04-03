import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapData from "@highcharts/map-collection/custom/world.topo.json";
import MapModule from "highcharts/modules/map";

// Initialize the Highcharts map module
if (typeof MapModule === "function") {
  MapModule(Highcharts);
}

export default function MapChart({ data }) {
  const chartData = Object.entries(data).map(([key, value]) => {
    if (key === "USA") {
      key = "United States of America";
    }
    return { key, value: value.count };
  });

  const options = {
    title: {
      text: "Ramen Varieties Count Map",
    },
    colorAxis: {
      maxColor: "#FFBF00",
    },
    tooltip: {
      headerFormat: "",
      pointFormat: "<b>{point.key}</b>: {point.value}",
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    mapView: {
      zoom: 2,
      center: [10, 58],
    },
    series: [
      {
        mapData,
        name: "Ramen Count",
        data: chartData,
        joinBy: ["name", "key"],
        dataLabels: {
          format: "{point.key}: {point.value:.0f}",
          filter: {
            operator: ">",
            property: "labelrank",
            value: 5,
          },
          style: {
            fontWeight: "normal",
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
      />
    </div>
  );
}
