"use strict";

//Selecting elements
const searchEl = document.getElementById("search");
const searchIconEl = document.getElementById("search-icon");
const suggestionsListEl = document.getElementById("suggestions-list");

let suggestionsArray = [];

async function fetchMovies(search) {
  try {
    const url = `http://www.omdbapi.com/?t=${search}&apikey=c0eebbf7`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function addSuggestionToDom(data) {
  const li = document.createElement("li");

  li.innerHTML = `<div class="single-movie">
  <div>
      <img src="${data.Poster}" alt="">
      <span>${data.Title}</span>
  </div>
  <i class="fa-solid fa-heart"></i>

    </div>`;

  suggestionsListEl.append(li);
}

function renderSuggestions(data) {
  suggestionsListEl.innerHTML = "";
  let isMoviePresent = false;
  suggestionsArray.forEach((movie) => {
    if (movie.Title == data.Title) {
      isMoviePresent = true;
    }
  });

  if (!isMoviePresent && data.Title != undefined) {
    suggestionsArray.unshift(data);
  }
  for (let i = 0; i < suggestionsArray.length; i++) {
    addSuggestionToDom(suggestionsArray[i]);
  }
}

document.addEventListener("click", function (e) {
  const target = e.target;
  document.querySelector(".search-results-container").classList.add("hidden");

  if (target.className == "search") {
    document
      .querySelector(".search-results-container")
      .classList.remove("hidden");
  }
});

searchEl.addEventListener("keyup", function () {
  let search = searchEl.value;
  if (search === "") {
    // suggestionsContainer.innerHTML = "";
    suggestionsArray = [];
  }
  (async function fetchMoviesSearch() {
    let data = await fetchMovies(search);
    // console.log(data);
    renderSuggestions(data);
  })();
});
