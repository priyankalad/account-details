import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderRows from "./RenderRows";
import TableHeader from "./TableHeader";
import Search from "./Search";
import Pagination from "./Pagination";
import SortableTableHeader from "./Sorting";
import accountData from "../data/accountData";

AccountList.defaultProps = {
  enablePagination: false,
  enableSorting: false
};

export default function AccountList({ enablePagination, enableSorting }) {
  let [accountList, setAccountList] = useState([]);
  let [searchList, setSearchList] = useState([]);
  const [rowsToDisplay, setRowsToDisplay] = useState([]);

  let headers = [
    { name: "Account No", dataType: "Number", orderBy: "" },
    { name: "Date", dataType: "Date", orderBy: "" },
    { name: "Transaction Details", dataType: "String", orderBy: "" },
    { name: "Value Date", dataType: "Date", orderBy: "" },
    { name: "Withdrawal AMT", dataType: "Number", orderBy: "" },
    { name: "Deposit AMT", dataType: "Number", orderBy: "" },
    { name: "Balance AMT", dataType: "Number", orderBy: "" }
  ];

  useEffect(() => {
    axios
      .get("http://starlord.hackerearth.com/bankAccount")
      .then(res => {
        let { data } = res;
        setAccountList(data);
        setSearchList(data);
        setRowsToDisplay(data);
      })
      .catch(err => {
        console.log(err);
        setAccountList(accountData);
        setSearchList(accountData);
        setRowsToDisplay(accountData);
      });
  }, []);

  let handlePageChange = rowsToDisplay => {
    setRowsToDisplay(rowsToDisplay);
  };
  let handleOrderBy = sortedData => {
    setSearchList(sortedData);
  };
  let handleSearch = searchBy => {
    if (searchBy) {
      let searchVal = searchBy.toLowerCase();
      setSearchList(
        accountList.filter(acc => {
          let accDetail = acc["Transaction Details"].toLowerCase();
          return accDetail.includes(searchVal) || searchVal.includes(accDetail);
        })
      );
    } else {
      setSearchList(accountList);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center text-primary">Account List</h1>
      <div className="row mt-3">
        <div className="col-6 d-inline-flex">
          <Search handleSearch={handleSearch} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          {searchList && searchList.length > 0 ? (
            <table className="table">
              {enableSorting ? (
                <SortableTableHeader
                  headers={headers}
                  data={[...searchList]}
                  defaultColumn={{
                    name: "Date",
                    dataType: "Date",
                    orderBy: "asc"
                  }}
                  handleOrderBy={handleOrderBy}
                />
              ) : (
                <TableHeader headers={headers} />
              )}
              <RenderRows data={rowsToDisplay} />
            </table>
          ) : (
            <p className="text-center">No data found</p>
          )}
        </div>
      </div>
      {searchList.length > 0 && enablePagination ? (
        <div className="row">
          <div className="col-12">
            <Pagination data={searchList} handlePageChange={handlePageChange} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
