import { favoriteSongs, availableSongs } from "./data.js";

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
                            <i class="fas fa-heart fa-lg ${isFavorite(
                              song.id
                            )}""></i>
                            </span>
                        </a>
                    </li>`;
}

function isFavorite(id) {
  return favoriteSongs.some((song) => song.id === id) ? "liked" : "";
}

function clearList() {
  document.querySelector(".items ul").innerHTML = null;
}

function attachListener() {
  const songElements = document.querySelectorAll(".song-item");
  songElements.forEach((el) => {
    el.addEventListener("click", redirectToSongPage);
    el.querySelector(".fa-heart").addEventListener("click", toggleLike);
  });
}

function toggleLike(event) {
  const id = this.closest("li").id;
  const song = availableSongs.find((song) => song.id == id);
  if (this.classList.contains("liked")) {
    this.classList.remove("liked");
    removeFromFavorite(song);
  } else {
    this.classList.add("liked");
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
