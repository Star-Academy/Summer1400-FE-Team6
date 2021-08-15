const favoriteSongs = localStorage.getItem("favorite-songs")
  ? JSON.parse(localStorage.getItem("favorite-songs"))
  : [];

let availableSongs;

function setAvailableSongs(songs) {
  availableSongs = songs;
}
export { favoriteSongs, availableSongs, setAvailableSongs };
