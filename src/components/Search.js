import React, { useRef } from "react";

export default function Search({ handleSearch }) {
  const ref = useRef();

  return (
    <>
      <input className="form-control" type="text" ref={ref} name="search" />
      <button
        className="btn btn-outline-primary ml-4"
        onClick={() => {
          handleSearch(ref.current.value);
        }}
      >
        Search
      </button>
      <button
        className="btn btn-outline-secondary ml-4"
        onClick={() => {
          ref.current.value = "";
          handleSearch("");
        }}
      >
        Clear
      </button>
    </>
  );
}
