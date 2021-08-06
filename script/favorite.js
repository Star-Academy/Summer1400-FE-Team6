import { favoriteSongs, setAvailableSongs } from "./data.js";
import { displaySongs } from "./utils.js";

setAvailableSongs([...favoriteSongs]);
displaySongs(favoriteSongs);
