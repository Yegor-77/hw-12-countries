import fetchCountries from "./fetchCountries.js";

const input = document.querySelector("#search");

input.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  const value = e.target.value.trim();

  if (!value) {
    document.getElementById("countries").innerHTML = "";
    return;
  }

  fetchCountries(value)
    .then((data) => renderCountries(data))
    .catch((error) => {
      document.getElementById("countries").textContent = "Країну не знайдено";
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

// 🔹 свій debounce (замість lodash)
function debounce(fn, delay) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}
