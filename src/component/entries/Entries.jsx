import React, { useState } from "react";
import { useEntries } from "../hooks";
import { handleSort } from "../services";

import "./EntriesStyle.css";

const Entries = () => {
  const [sortAscending, setSortAscending] = useState(true);
  const { data, loading, currentPage, setCurrentPage, count, setCount } =
    useEntries();

  if (loading) {
    return <div>Loading........</div>;
  }

  return (
    <div className="entries">
      <h1>Show 10 data By Pagination</h1>
      <button
        onClick={() =>
          handleSort({
            sortAscending,
            setSortAscending,
            currentPage,
            setCurrentPage,
          })
        }
        id="sort"
      >
        Sort {sortAscending ? "Ascending" : "Descending"} By API
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>API</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentPage.map((entry, index) => (
            <tr key={index}>
              <td>{entry.API}</td>
              <td>{entry.Category}</td>
              <td>{entry.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          if (count >= 10) {
            return setCount(count - 10);
          }
        }}
      >
        Previous
      </button>
      <button>{count / 10 + 1}</button>
      <button>.....</button>
      <button>{Math.ceil(data.length / 10)}</button>
      <button onClick={() => setCount(count + 10)}>Next</button>
    </div>
  );
};

export default Entries;
