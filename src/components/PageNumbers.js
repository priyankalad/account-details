import React from "react";

export default function PageNumbers({
  startPage,
  endPage,
  activePage,
  setPage
}) {
  let pageNums = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNums.push(
      <li
        key={i}
        className={activePage === i ? "page-item active" : "page-item"}
      >
        <button className="page-link" onClick={() => setPage(i)}>
          {i}
        </button>
      </li>
    );
  }
  return <>{pageNums}</>;
}
