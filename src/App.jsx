import { useState, useEffect } from "react";
import MapChart from "./MapChart";
import ScatterplotChart from "./ScatterplotChart";
import "./App.css";
import raw_data from "./ramen-ratings.json";

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

  return (
    <>
      <MapChart data={data} />
      <ScatterplotChart data={data} />
    </>
  );
}

export default App;
