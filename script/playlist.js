import { availableSongs, setAvailableSongs } from "./data.js";
import { displaySongs } from "./utils.js";

let filterSearch = document.getElementById("filter-search");
let logout = document.getElementById("logout");

const pagingUrl = "http://130.185.120.192:5000/song/page";
const searchUrl = "http://130.185.120.192:5000/song/find";

function loginStatus(){
  if(localStorage.getItem("isLogin") === "false"){
    document.location = "login.html";
  }
}

let pagingOptions = {
  size: 10,
  current: 1,
  sorter: null,
  desc: false,
};

let isInSearchMode = false;

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


loginStatus();
retrieveState();
requestManager();


function requestManager() {
  saveState();
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

function saveState() {
  const state = {
    isInSearchMode: isInSearchMode,
    phrase: searchBox.value,
    pagingOptions: pagingOptions
  }
  sessionStorage.setItem("state", JSON.stringify(state))
}

function retrieveState() {
  const state = sessionStorage.getItem("state")
  if (state) {
    const stateObj = JSON.parse(state);
    isInSearchMode = stateObj.isInSearchMode;
    searchBox.value = stateObj.phrase;
    pagingOptions = stateObj.pagingOptions;
    retrieveViews();
  }
}

function retrieveViews() {
  pageSizeSelector.value = pagingOptions.size.toString()
  pageSortOrderSelector.value = pagingOptions.desc ? "descending" : "ascending"
  pageSorterSelector.value = pagingOptions.sorter ? pagingOptions.sorter.toString() : "date";
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
    case "name":
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
  try {
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
  } catch (e) {
    console.log(e)
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

logout.addEventListener("click", () => {
  localStorage.clear();
  localStorage.setItem("isLogin", "false");
  document.location = "index.html";
});
