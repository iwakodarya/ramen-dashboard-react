import { useState, useEffect } from "react";
import MapChart from "./MapChart";
import ScatterplotRatingVsCount from "./ScatterplotRatingVsCount";
import BarchartRatingByCountry from "./BarchartRatingByCountry";
import "./App.css";
import raw_data from "./ramen-ratings.json";
import RatingsHistogram from "./RatingsHistogram";
import DataTable from "./DataTable";
import Highcharts from "highcharts";

function App() {
  const [data, setData] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState(undefined);
  const [highlightCountry, setHighlightCountry] = useState(undefined);

  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily: "Urbanist", // Set global font for chart content
        fontSize: "18px", // Set global font size
      },
    },
  });

  useEffect(() => {
    // Data cleaning
    // 1) Remove "Unrated" entries
    const cleanRating = raw_data.filter((rating) => rating.Stars !== "Unrated");
    // Clean up USA to be "United States of America"
    const cleanUSA = cleanRating.map((rating) => {
      return rating.Country === "USA"
        ? { ...rating, Country: "United States of America" }
        : rating;
    });
    // 2) Filter for countries with >= 100 varieties produced
    const countByCountry = cleanUSA.reduce((acc, next) => {
      if (!acc[next.Country]) {
        acc[next.Country] = 1;
      } else {
        acc[next.Country] += 1;
      }
      return acc;
    }, {});
    const includeCountries = Object.entries(countByCountry)
      .filter(([_, count]) => count >= 100)
      .map(([country, _]) => country);
    const filteredData = cleanUSA.filter((rating) =>
      includeCountries.includes(rating.Country)
    );

    setData(filteredData);
  }, []);

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

  console.log(aggByCountry["China"]);
  console.log(aggByCountry);

  return (
    <div id="main-container">
      <h1 id="header">
        Ramen Ratings Dashboard, selected country: {filteredCountry || "None"}{" "}
        hover country: {highlightCountry || "None"}
      </h1>
      <MapChart
        data={
          filteredCountry
            ? { [filteredCountry]: aggByCountry[filteredCountry] }
            : aggByCountry
        }
        highlightCountry={highlightCountry}
        onPointClick={setFilteredCountry}
        onPointHover={setHighlightCountry}
      />
      <ScatterplotRatingVsCount
        data={
          filteredCountry
            ? { [filteredCountry]: aggByCountry[filteredCountry] }
            : aggByCountry
        }
        highlightCountry={highlightCountry}
        onPointClick={setFilteredCountry}
        onPointHover={setHighlightCountry}
      />
      <BarchartRatingByCountry
        data={
          filteredCountry
            ? { [filteredCountry]: aggByCountry[filteredCountry] }
            : aggByCountry
        }
        highlightCountry={highlightCountry}
        onPointClick={setFilteredCountry}
        onPointHover={setHighlightCountry}
      />
      <RatingsHistogram
        data={
          filteredCountry
            ? data.filter((item) => item.Country === filteredCountry)
            : data
        }
        filteredCountry={filteredCountry}
      />
      <DataTable
        data={
          filteredCountry
            ? data.filter((item) => item.Country === filteredCountry)
            : data
        }
        filteredCountry={filteredCountry}
      />
    </div>
  );
}

export default App;
