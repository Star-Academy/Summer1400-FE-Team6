const allSongs = document.querySelector(".all-songs");
const favoriteSongs = document.querySelector(".favorite-songs");
const options = document.querySelectorAll(".options > a");
const listSongs = document.querySelectorAll(".items li");
let filterSearch = document.getElementById("filter-search");
let syncSearch = document.getElementById("sync-search");
options.forEach((option) => option.addEventListener("click", changeUnderline));
favoriteSongs.addEventListener("click", filter);
allSongs.addEventListener("click", removeFilter);

function removeFilter() {
    document.querySelector(".playlist-header h1").innerHTML = "همه آهنگ ها";
    document.querySelector(".music-icon img").src =
        "../assets/pic/music_note.jpg";
    listSongs.forEach((song) => (song.style.display = "initial"));
}

function filter() {
    document.querySelector(".playlist-header h1").innerHTML =
        "آهنگ های مورد علاقه";
    document.querySelector(".music-icon img").src =
        "../assets/pic/favorite_header.jpg";
    listSongs.forEach((song) => {
        if (!song.querySelector("input").checked) song.style.display = "none";
    });
}

function changeUnderline() {
    options.forEach((option) => option.classList.remove("underlined"));
    this.classList.add("underlined");
}

const pagingUrl = "http://130.185.120.192:5000/song/page";
const searchUrl = "http://130.185.120.192:5000/song/find";

const pagingOptions = {
    size: 10,
    current: 1,
    sorter: null,
    desc: false,
};

let isInSearchMode = false;
let requestedSongs;

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
}

function nextPage() {
    pagingOptions.current++;
    if (!isInSearchMode) {
        requestManager();
    } else {
        displayManager();
    }
}

function clearList() {
    document.querySelector(".items ul").innerHTML = null;
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
        jsonResponse = await serverResponse.json();
        requestedSongs = jsonResponse.songs;
        displayManager();
    }
}

function displayManager() {
    if (!isInSearchMode) displaySongs(requestedSongs);
    else {
        startIndex = (pagingOptions.current - 1) * pagingOptions.size;
        endIndex = startIndex + pagingOptions.size;
        displaySongs(requestedSongs.slice(startIndex, endIndex));
    }
    pagingBtnController();
    attachListener();
}

function attachListener() {
    const songElements = document.querySelectorAll(".song-item");
    songElements.forEach((el) =>
        el.addEventListener("click", redirectToSongPage)
    );
}

function redirectToSongPage() {
    const songId = this.id;
    const urlParams = new URLSearchParams();
    urlParams.append("id", songId);
    location.href = "song.html?" + urlParams.toString();
}

function pagingBtnController() {
    prevPageBtn.disabled = pagingOptions.current === 1;
    if (isInSearchMode) {
        nextPageBtn.disabled =
            pagingOptions.current * pagingOptions.size >= requestedSongs.length;
    }
}

function displaySongs(songs) {
    let listSongs = songs.map(createTemplate);
    clearList();
    listSongs.forEach((song) =>
        document.querySelector(".items ul").appendChild(song)
    );
}

function createTemplate(song) {
    templateString = createStringTemplate(song);
    DOMTemplate = document.createElement("template");
    DOMTemplate.innerHTML = templateString;
    return DOMTemplate.content;
}

function createStringTemplate(song) {
    return ` <li class="song-item" id="${song.id}">
                        <a href="#">
                            <img src="${song.cover}" alt="cover" class="cover">
                            <span class="song-name">${song.name}</span>
                            <span class="row-2">
                                <span class="artist">${song.artist}</span>
                            <label class="favorite">
                                <input type="checkbox">
                                <i class="fas fa-heart fa-lg"></i>
                            </label>
                            </span>
                        </a>
                    </li>`;
}




filterSearch.addEventListener("click", () => {
    document.querySelector(".search-btn").classList.add("display-none");
    document.querySelector(".search-container").classList.remove("display-none");
});

// syncSearch.addEventListener("click", () => {
//     setTimeout()
//     document.querySelector(".search-container").classList.add("display-none");
//     document.querySelector(".search-btn").classList.remove("display-none");
// });