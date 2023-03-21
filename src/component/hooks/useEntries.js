import { useEffect, useState } from "react";
import { getData } from "../services";

export const useEntries = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const remoteData = await getData();
        setData(remoteData);
        setCurrentPage(remoteData.slice(count, count + 10));
        setLoading(false);
      } catch (err) {
        alert("Loading Failed....");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(data.slice(count, count + 10));
  }, [count]);

  return {
    data,
    loading,
    currentPage,
    setCurrentPage,
    count,
    setCount,
  };
};
