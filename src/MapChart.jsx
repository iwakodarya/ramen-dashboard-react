import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapData from "@highcharts/map-collection/custom/world.topo.json";
import MapModule from "highcharts/modules/map";

// Initialize the Highcharts map module
if (typeof MapModule === "function") {
  MapModule(Highcharts);
}

export default function MapChart({ data }) {
  const countByCountry = data.reduce((acc, next) => {
    if (next.Country in acc) {
      acc[next.Country] += 1;
    } else {
      acc[next.Country] = 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(countByCountry)
    // .filter(([_, value]) => value >= 100)
    .map(([name, value]) => {
      if (name === "USA") {
        name = "United States of America";
      }
      return { name, value };
    });

  const options = {
    title: {
      text: "Ramen Varieties Count Map",
    },
    colorAxis: {
      min: 0,
      minColor: "#f7fbff", // Lightest color (low value)
      maxColor: "#08306b", // Darkest color (high value)
    },
    tooltip: {
      headerFormat: "",
      pointFormat: "<b>{point.name}</b>: {point.value}",
    },
    series: [
      {
        mapData,
        name: "Ramen Count",
        data: chartData,
        joinBy: "name",
        states: {
          hover: {
            color: "#BADA55",
          },
        },
        dataLabels: {
          format: "{point.name}: {point.value:.0f}",
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
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="mapChart"
      options={options}
    />
  );
}
