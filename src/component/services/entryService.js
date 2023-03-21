export const getData = async () => {
    const response = await fetch("https://api.publicapis.org/entries");
    const json = await response.json();
    console.log(json.entries);

    return json.entries;
}