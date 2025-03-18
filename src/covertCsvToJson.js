/* Run this file using Node to conver CSV into JSON */

const csvToJson = await import("convert-csv-to-json");

csvToJson
  .fieldDelimiter(",")
  .formatValueByType()
  .generateJsonFileFromCsv("ramen-ratings.csv", "ramen-ratings.json");
