import { favoriteSongs, availableSongs } from "./data.js";

const HEART_SRC = "../assets/svg/Love_Heart_SVG.svg";
const LIKED_HEART_SRC = "../assets/svg/Love_Heart_Liked.svg";

function displaySongs(songs) {
  let listSongs = songs.map(createTemplate);
  clearList();
  listSongs.forEach((song) =>
    document.querySelector(".items ul").appendChild(song)
  );
  attachListener();
}

function createTemplate(song) {
  const templateString = createStringTemplate(song);
  const DOMTemplate = document.createElement("template");
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
                            <img src="${
                              isFavorite(song.id) ? LIKED_HEART_SRC : HEART_SRC
                            }" alt="like-icon" class="like-icon">
                            </span>
                        </a>
                    </li>`;
}

function isFavorite(id) {
  return favoriteSongs.some((song) => song.id == id);
}

function clearList() {
  document.querySelector(".items ul").innerHTML = null;
}

function attachListener() {
  const songElements = document.querySelectorAll(".song-item");
  songElements.forEach((el) => {
    el.addEventListener("click", redirectToSongPage);
    el.querySelector(".like-icon").addEventListener("click", toggleLike);
  });
}

function toggleLike(event) {
  const id = this.closest("li").id;
  const song = availableSongs.find((song) => song.id == id);
  if (isFavorite(id)) {
    console.log("what");
    this.setAttribute("src", HEART_SRC);
    removeFromFavorite(song);
  } else {
    this.setAttribute("src", LIKED_HEART_SRC);
    addToFavorites(song);
  }
  event.stopPropagation();
}

function addToFavorites(song) {
  favoriteSongs.push(song);
  localStorage.setItem("favorite-songs", JSON.stringify(favoriteSongs));
}

function removeFromFavorite(song) {
  const indexSong = favoriteSongs.findIndex((el) => song.id === el.id);
  favoriteSongs.splice(indexSong, 1);
  localStorage.setItem("favorite-songs", JSON.stringify(favoriteSongs));
}

function redirectToSongPage() {
  const songId = this.id;
  const urlParams = new URLSearchParams();
  urlParams.append("id", songId);
  location.href = "song.html?" + urlParams.toString();
}

export { displaySongs };
