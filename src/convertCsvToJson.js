import fs from "fs";
import Papa from "papaparse";

// Read the CSV file
fs.readFile("./ramen-ratings.csv", "utf8", (err, csvData) => {
  if (err) {
    console.error("Error reading the CSV file:", err);
    return;
  }

  // Parse the CSV data
  Papa.parse(csvData, {
    header: true, // Treat the first row as column headers
    dynamicTyping: true, // Automatically type-cast values based on the content
    skipEmptyLines: true, // Skip empty lines in the CSV
    complete: (result) => {
      // Write the parsed JSON to a file
      fs.writeFile(
        "./ramen-ratings.json",
        JSON.stringify(result.data, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing the JSON file:", err);
          } else {
            console.log("CSV file successfully converted to JSON");
          }
        }
      );
    },
    error: (error) => {
      console.error("Error parsing the CSV:", error);
    },
  });
});
