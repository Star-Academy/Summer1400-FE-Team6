import { availableSongs, setAvailableSongs } from "./data.js";
import { displaySongs } from "./utils.js";

let filterSearch = document.getElementById("filter-search");

const pagingUrl = "http://130.185.120.192:5000/song/page";
const searchUrl = "http://130.185.120.192:5000/song/find";

const retrieveLastPage = () =>
  sessionStorage.getItem("lastPage")
    ? parseInt(sessionStorage.getItem("lastPage"))
    : 1;

const pagingOptions = {
  size: 10,
  current: retrieveLastPage(),
  sorter: null,
  desc: false,
};

let isInSearchMode = false;

requestManager();

const nextPageBtn = document.querySelector("#next-page");
const prevPageBtn = document.querySelector("#prev-page");

nextPageBtn.addEventListener("click", nextPage);
prevPageBtn.addEventListener("click", prevPage);

const pageSizeSelector = document.querySelector("#items-per-page");
const pageSorterSelector = document.querySelector("#sort-by");
const pageSortOrderSelector = document.querySelector("#sort-order");

pageSizeSelector.addEventListener("change", changePageSize);
pageSorterSelector.addEventListener("change", changeSorter);
pageSortOrderSelector.addEventListener("change", changeSortOrder);

const searchBox = document.querySelector("#searchBox");
const searchForm = document.querySelector("#searchForm");

const numberRelevantResultsSelector = document.querySelector(
  "#number-relevant-results"
);

searchForm.addEventListener("submit", performSearch);

function requestManager() {
  let body;
  let url;
  if (isInSearchMode) {
    url = searchUrl;
    body = {
      phrase: searchBox.value,
      count: parseInt(numberRelevantResultsSelector.value),
      sorter: pagingOptions.sorter,
      desc: pagingOptions.desc,
    };
  } else {
    url = pagingUrl;
    body = pagingOptions;
  }
  fetchSongs(url, body);
}

function performSearch(event) {
  event.preventDefault();
  pagingOptions.current = 1;
  isInSearchMode = !!searchBox.value;
  requestManager();
  document.querySelector(".search-container").classList.add("display-none");
  document.querySelector(".search-btn").classList.remove("display-none");
}

function changeSortOrder(event) {
  pagingOptions.current = 1;
  pagingOptions.desc = event.target.value === "descending";
  requestManager();
}

function changeSorter(event) {
  pagingOptions.current = 1;
  switch (event.target.value) {
    case "date":
      pagingOptions.sorter = null;
      break;
    case "artist":
      pagingOptions.sorter = "artist";
      break;
    case "song-name":
      pagingOptions.sorter = "name";
  }
  requestManager();
}

function changePageSize(event) {
  pagingOptions.current = 1;
  pagingOptions.size = parseInt(event.target.value);
  requestManager();
}

function prevPage() {
  pagingOptions.current--;
  if (!isInSearchMode) {
    requestManager();
  } else {
    displayManager();
  }
  sessionStorage.setItem("lastPage", pagingOptions.current.toString());
}

function nextPage() {
  pagingOptions.current++;
  if (!isInSearchMode) {
    requestManager();
  } else {
    displayManager();
  }
  sessionStorage.setItem("lastPage", pagingOptions.current.toString());
}

async function fetchSongs(url, body) {
  const serverResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (serverResponse.ok) {
    const jsonResponse = await serverResponse.json();
    setAvailableSongs(jsonResponse.songs);
    displayManager();
  }
}

function displayManager() {
  if (!isInSearchMode) displaySongs(availableSongs);
  else {
    const startIndex = (pagingOptions.current - 1) * pagingOptions.size;
    const endIndex = startIndex + pagingOptions.size;
    displaySongs(availableSongs.slice(startIndex, endIndex));
  }
  pagingBtnController();
}

function pagingBtnController() {
  prevPageBtn.disabled = pagingOptions.current === 1;
  if (isInSearchMode) {
    nextPageBtn.disabled =
      pagingOptions.current * pagingOptions.size >= availableSongs.length;
  }
}

filterSearch.addEventListener("click", () => {
  document.querySelector(".search-btn").classList.add("display-none");
  document.querySelector(".search-container").classList.remove("display-none");
});
