import { useState } from "react";
import MapChart from "./MapChart";
import ScatterplotChart from "./ScatterplotChart";
import "./App.css";
import raw_data from "./ramen-ratings.json";

function App() {
  const [data, setData] = useState(
    raw_data.filter((rating) => rating.Stars !== "Unrated")
  );

  return (
    <>
      <MapChart data={data} />
      <ScatterplotChart data={data} />
    </>
  );
}

export default App;
