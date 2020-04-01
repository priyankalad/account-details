import React from "react";

export default function TableHeader({ headers }) {
  return (
    <>
      <thead>
        <tr>
          {headers.map((header, index) => {
            return <th key={index}>{header.name}</th>;
          })}
        </tr>
      </thead>
    </>
  );
}
