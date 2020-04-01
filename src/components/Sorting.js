import React, { useState } from "react";
import PropTypes from "prop-types";

SortableTableHeader.defaultProps = {};
SortableTableHeader.propTypes = {
  defaultColumn: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  handleOrderBy: PropTypes.func.isRequired
};

export default function SortableTableHeader(props) {
  let { defaultColumn, data, handleOrderBy, headers } = props;
  let [columnHeaders, setColumnHeaders] = useState(headers);
  let [columnHeader, setColumnHeader] = useState(defaultColumn);

  let removeSortingOnOthers = exceptHeader => {
    let updatedHeaders = columnHeaders.map(h => {
      if (h.name !== exceptHeader.name) h.orderBy = "";
      return h;
    });
    setColumnHeaders(updatedHeaders);
  };

  let doNumberSorting = (name, orderBy) => {
    data.sort((a, b) => {
      let numA = isNaN(a[name]) ? Number(a[name].replace(/,/g, "")) : a[name];
      let numB = isNaN(b[name]) ? Number(b[name].replace(/,/g, "")) : b[name];
      return orderBy === "asc" ? numA - numB : numB - numA;
    });
  };
  let doDateSorting = (name, orderBy) => {
    data.sort((a, b) => {
      let dateA = new Date(a[name]);
      let dateB = new Date(b[name]);
      return orderBy === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  let doStringSorting = (name, orderBy) => {
    data.sort((a, b) => {
      let nameA = a[name].toLowerCase();
      let nameB = b[name].toLowerCase();
      if (
        (orderBy === "asc" && nameA < nameB) ||
        (orderBy === "desc" && nameA > nameB)
      )
        return -1;
      if (
        (orderBy === "asc" && nameA > nameB) ||
        (orderBy === "desc" && nameA < nameB)
      )
        return 1;
      return 0;
    });
  };

  let doSorting = header => {
    if (columnHeader["name"] !== header["name"]) {
      removeSortingOnOthers(header);
      header.orderBy = "asc";
    } else header.orderBy = columnHeader.orderBy === "asc" ? "desc" : "asc";

    setColumnHeader(header);
    let { name, orderBy, dataType } = header;
    switch (dataType) {
      case "Number":
        doNumberSorting(name, orderBy);
        break;
      case "Date":
        doDateSorting(name, orderBy);
        break;
      default:
        doStringSorting(name, orderBy);
        break;
    }
    let updatedHeaders = columnHeaders.map(h => {
      if (h.name === header.name) h = header;
      return h;
    });
    setColumnHeaders(updatedHeaders);
    handleOrderBy(data);
  };

  return (
    <>
      <thead>
        <tr style={{ cursor: "pointer" }}>
          {columnHeaders.map((header, index) => {
            let { orderBy } = header;
            let isColumnToSort = header.name === columnHeader.name;
            return (
              <th key={index} onClick={() => doSorting(header)}>
                {header.name}
                {isColumnToSort ? (
                  orderBy === "asc" ? (
                    <span role="img" aria-label="" className="ml-2">
                      🔼
                    </span>
                  ) : (
                    <span role="img" aria-label="" className="ml-2">
                      🔽
                    </span>
                  )
                ) : (
                  ""
                )}
              </th>
            );
          })}
        </tr>
      </thead>
    </>
  );
}
