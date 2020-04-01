import React from "react";

export default function RenderRows({ data }) {
  let rows = [];
  if (data.length > 0) {
    data.forEach((d, i) => {
      let row = (
        <tr key={i}>
          <th scope="row">{d["Account No"]}</th>
          <td>{d["Date"] || ""}</td>
          <td>{d["Transaction Details"]}</td>
          <td>{d["Value Date"]}</td>
          <td>{d["Withdrawal AMT"]}</td>
          <td>{d["Deposit AMT"]}</td>
          <td>{d["Balance AMT"]}</td>
        </tr>
      );
      rows.push(row);
    });
  }
  return <tbody>{rows}</tbody>;
}
