export default function DataTable({ data }) {
  // Sort data
  const displayData = [...data].sort((a, b) => b.Stars - a.Stars);

  return (
    <div id="table-1" className="styled-table">
      <table border="1">
        <thead>
          <tr>
            <th>Variety</th>
            <th>Origin Country</th>
            <th>Star Rating</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((row) => (
            <tr key={row["Review #"]}>
              <td>{row["Variety"]}</td>
              <td>{row["Country"]}</td>
              <td>{row["Stars"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
