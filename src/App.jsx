import { useState, useEffect } from "react";
import MapChart from "./MapChart";
import ScatterplotRatingVsCount from "./ScatterplotRatingVsCount";
import BarchartRatingByCountry from "./BarchartRatingByCountry";
import "./App.css";
import raw_data from "./ramen-ratings.json";
import RatingsHistogram from "./RatingsHistogram";
import DataTable from "./DataTable";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Data cleaning
    // 1) Remove "Unrated" entries
    const cleanRating = raw_data.filter((rating) => rating.Stars !== "Unrated");
    // 2) Filter for countries with >= 100 varieties produced
    const countByCountry = cleanRating.reduce((acc, next) => {
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
    const filteredData = cleanRating.filter((rating) =>
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

  return (
    <div id="main-container">
      <h2 id="header">Ramen Ratings Dashboard</h2>
      <MapChart data={aggByCountry} />
      <ScatterplotRatingVsCount data={aggByCountry} />
      <BarchartRatingByCountry data={aggByCountry} />
      <RatingsHistogram data={data} />
      <DataTable data={data} />
    </div>
  );
}

export default App;
