import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import RenderRows from "./RenderRows";

export default function AccountList() {
  let [accountList, setAccountList] = useState([]);
  let [searchList, setSearchList] = useState([]);
  const [activePage, setActivePage] = useState(0);
  let [search, setSearch] = useState("");
  const ref = useRef();
  useEffect(() => {
    axios
      .get("http://starlord.hackerearth.com/bankAccount")
      .then(res => {
        setAccountList(res.data);
        setSearchList(res.data);
      })
      .catch(err => console.log(err));
    return () => {
      //cleanup;
    };
  }, []);
  let handlePageChange = pageNum => {
    setActivePage(pageNum);
  };
  let handleSearch = () => {
    search = ref.current.value;
    if (search) {
      search = search.toLowerCase();
      setSearchList(
        accountList.filter(acc => {
          let accDetail = acc["Transaction Details"].toLowerCase();
          return accDetail.includes(search) || search.includes(accDetail);
        })
      );
    } else {
      setSearchList(accountList);
    }
  };

  let perPage = 10;
  return (
    <div className="container">
      <h1 className="text-center text-primary">Account List</h1>
      <div className="row mt-3">
        <div className="col-6 d-inline-flex">
          <input className="form-control" type="text" ref={ref} name="search" />
          <button
            className="btn btn-outline-primary ml-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Account No.</th>
                <th scope="col">Date</th>
                <th scope="col">Transaction Details</th>
                <th scope="col">Value Date</th>
                <th scope="col">Withdrawal Amt</th>
                <th scope="col">Deposit Amt</th>
                <th scope="col">Balance Amt</th>
              </tr>
            </thead>
            {searchList.length > 0 ? (
              <RenderRows activePage={activePage} data={searchList} />
            ) : (
              ""
            )}
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={searchList.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
