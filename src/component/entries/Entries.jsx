import React, { useEffect, useState } from "react";

import "./EntriesStyle.css";

const API_URL = "https://api.publicapis.org/entries";

const Entries = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [count, setCount] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setData(json.entries);
        setCurrentPage(json.entries.slice(count, count + 10));
        setLoading(false);
      } catch (err) {
        alert("Loading Failed....");
      }
    };
    fetchData();
  }, []);

  const handleSort = () => {
    setSortAscending(!sortAscending);
    const sortedData = currentPage.sort((a, b) => {
      if (sortAscending) {
        return a.API.localeCompare(b.API);
      } else {
        return b.API.localeCompare(a.API);
      }
    });
    setCurrentPage(sortedData);
  };
  useEffect(() => {
    setCurrentPage(data.slice(count, count + 10));
  }, [count]);

  if (loading) {
    return <div>Loading........</div>;
  }

  return (
    <div className="entries">
      <h1>Show 10 data By Pageination</h1>
      <button onClick={handleSort} id="sort">
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
