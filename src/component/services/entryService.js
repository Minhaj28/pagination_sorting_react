export const getData = async () => {
  const response = await fetch("https://api.publicapis.org/entries");
  const json = await response.json();
  console.log(json.entries);

  return json.entries;
};

export const handleSort = ({
  currentPage,
  setCurrentPage,
  sortAscending,
  setSortAscending,
}) => {
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
