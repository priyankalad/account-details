import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PageNumbers from "./PageNumbers";

Pagination.defaultProps = {
  initialPage: 1,
  showPages: 5,
  rowsPerPage: 10
};

Pagination.propTypes = {
  initialPage: PropTypes.number,
  data: PropTypes.array.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  showPages: PropTypes.number,
  rowsPerPage: PropTypes.number
};

export default function Pagination(props) {
  let { data, handlePageChange, initialPage, rowsPerPage, showPages } = props;
  const [activePage, setActivePage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / rowsPerPage)
  );
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  useEffect(() => {
    let totPages = Math.ceil(data.length / rowsPerPage);
    setTotalPages(Math.ceil(data.length / rowsPerPage));
    setEndPage(totPages < showPages ? totPages : showPages);
    setPage(initialPage);
  }, [data]);

  let setPage = page => {
    let rowsToDisplay = [];
    if (page >= 1 && page <= data.length) {
      let startIndex = (page - 1) * rowsPerPage;
      let endIndex = startIndex + rowsPerPage;
      rowsToDisplay = data.slice(startIndex, endIndex);
    }
    setActivePage(page);
    handlePageChange(rowsToDisplay);
  };

  let handleNext = () => {
    if (activePage === endPage) {
      setStartPage(startPage + 1);
      setEndPage(activePage + 1);
    }
    setPage(activePage + 1);
  };
  let handlePrevious = () => {
    if (activePage === startPage) {
      setEndPage(endPage - 1);
      setStartPage(startPage - 1);
    }
    setPage(activePage - 1);
  };
  let handleFirst = () => {
    setStartPage(initialPage);
    if (totalPages > showPages) {
      setEndPage(initialPage + showPages - 1);
    }
    setPage(initialPage);
  };
  let handleLast = () => {
    if (totalPages > showPages) setStartPage(totalPages - showPages + 1);
    setEndPage(totalPages);
    setPage(totalPages);
  };

  return (
    <ul className="pagination">
      <li className={activePage === 1 ? "page-item disabled" : "page-item"}>
        <button className="page-link" onClick={handleFirst}>
          First
        </button>
      </li>
      <li className={activePage === 1 ? "page-item disabled" : "page-item"}>
        <button className="page-link" onClick={handlePrevious}>
          Previous
        </button>
      </li>
      <PageNumbers
        startPage={startPage}
        endPage={endPage}
        activePage={activePage}
        setPage={setPage}
      />
      <li
        className={
          activePage === totalPages ? "page-item disabled" : "page-item"
        }
      >
        <button className="page-link" onClick={handleNext}>
          Next
        </button>
      </li>
      <li
        className={
          activePage === totalPages ? "page-item disabled" : "page-item"
        }
      >
        <button className="page-link" onClick={handleLast}>
          Last
        </button>
      </li>
    </ul>
  );
}
