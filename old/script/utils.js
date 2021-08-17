import { favoriteSongs, availableSongs } from "./data.js";

const menuButton = document.querySelector(".menu-icon");
const menu = document.querySelector(".menu");
menuButton.addEventListener("click", openMenu);

function openMenu() {
  menu.classList.toggle("open");
  menuButton.innerHTML = menu.classList.contains("open")
    ? '<i class="far fa-times-circle fa-2x"></i>'
    : '<i class="fa fa-bars fa-2x"></i>';
}

function displaySongs(songs) {
  let listSongs = songs.map(createTemplate);
  clearList();
  if (songs.length === 0)
    document.querySelector(".items ul").textContent =
      "متاسفانه نتیجه‌ای یافت نشد :(";
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
                            <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->
<svg
   xmlns:svg="http://www.w3.org/2000/svg"
   class="like-icon ${isFavorite(song.id)}"
   viewBox="-20 -50 700 700"
   xmlns="http://www.w3.org/2000/svg"
   version="1.0"
   width="25"
   height="25"
   id="svg2"
   fill="white"
   >
  <defs
     id="defs4" />
  <g
     id="layer1">
    <path
       d="M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z"
       id="path2417" />
    <g
       transform="translate(129.28571,-64.285714)"
       id="g2221" />
  </g>
</svg>

                            </span>
                        </a>
                    </li>`;
}

function isFavorite(id) {
  return favoriteSongs.some((song) => song.id == id) ? "liked" : "";
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
  if (this.classList.contains("liked")) {
    removeFromFavorite(song);
  } else {
    addToFavorites(song);
  }
  this.classList.toggle("liked");
  event.stopPropagation();
}

function addToFavorites(song) {
  favoriteSongs.push(song);
  localStorage.setItem("favorite-dashboard", JSON.stringify(favoriteSongs));
}

function removeFromFavorite(song) {
  const indexSong = favoriteSongs.findIndex((el) => song.id === el.id);
  favoriteSongs.splice(indexSong, 1);
  localStorage.setItem("favorite-dashboard", JSON.stringify(favoriteSongs));
}

function redirectToSongPage() {
  const songId = this.id;
  const urlParams = new URLSearchParams();
  urlParams.append("id", songId);
  location.href = "song.html?" + urlParams.toString();
}

export { displaySongs };