// src/index.js
import debounce from "lodash.debounce";
import fetchCountries from "./fetchCountries.js"; // правильный путь

const input = document.querySelector("#search");

input.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  const value = e.target.value.trim();
  if (!value) return;

  fetchCountries(value)
    .then((data) => {
      console.log(data);
      renderCountries(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderCountries(countries) {
  const countriesDiv = document.getElementById("countries");
  countriesDiv.innerHTML = "";

  if (countries.length > 10) {
    countriesDiv.textContent =
      "Занадто багато збігів, введіть більш точну назву.";
    return;
  }

  countries.forEach((country) => {
    const div = document.createElement("div");
    div.textContent = country.name;
    countriesDiv.appendChild(div);
  });
}
