import React from "react";

export default function RenderRows({ activePage, data }) {
  let rows = [];
  if (activePage * 10 > data.length) {
    rows.push(
      <tr>
        <td>You have reached end of the list</td>
      </tr>
    );
  }
  for (let i = activePage * 10, j = 0; j < 10; j++, i++) {
    if (data[i]) {
      rows.push(
        <tr key={i}>
          <th scope="row">{data[i]["Account No"]}</th>
          <td>{data[i]["Date"] || ""}</td>
          <td>{data[i]["Transaction Details"]}</td>
          <td>{data[i]["Value Date"]}</td>
          <td>{data[i]["Withdrawal AMT"]}</td>
          <td>{data[i]["Deposit AMT"]}</td>
          <td>{data[i]["Balance AMT"]}</td>
        </tr>
      );
    }
  }
  return <tbody>{rows}</tbody>;
}
