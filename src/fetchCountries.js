// src/fetchCountries.js
export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.com/v2/name/${searchQuery}`).then(
    (res) => {
      if (!res.ok) {
        throw new Error("Країну не знайдено");
      }
      return res.json();
    },
  );
}
