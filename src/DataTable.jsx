export default function DataTable({ data }) {
  // Sort data
  const displayData = [...data].sort((a, b) => b.Stars - a.Stars);

  return (
    <div id="table-1" className="styled-table">
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Variety</th>
            <th>Star Rating</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((row) => (
            <tr key={row["Review #"]}>
              <td>{row["Brand"]}</td>
              <td>{row["Variety"] + " (" + row["Style"] + ")"}</td>
              <td>{row["Stars"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
