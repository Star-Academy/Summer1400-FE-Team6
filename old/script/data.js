const favoriteSongs = localStorage.getItem("favorite-dashboard")
  ? JSON.parse(localStorage.getItem("favorite-dashboard"))
  : [];

let availableSongs;

function setAvailableSongs(songs) {
  availableSongs = songs;
}
export { favoriteSongs, availableSongs, setAvailableSongs };
