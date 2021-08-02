const allSongs = document.querySelector(".all-songs");
const favoriteSongs = document.querySelector(".favorite-songs");
const options = document.querySelectorAll(".options > a");
const listSongs = document.querySelectorAll(".items li");
options.forEach(option => option.addEventListener("click", changeUnderline));
favoriteSongs.addEventListener("click", filter)
allSongs.addEventListener("click", removeFilter);

function removeFilter() {
    document.querySelector(".playlist-header h1").innerHTML = "همه آهنگ ها"
    document.querySelector(".music-icon img").src = "../assets/pic/music_note.jpg"
    listSongs.forEach(song => song.style.display = "initial")
}

function filter() {
    document.querySelector(".playlist-header h1").innerHTML = "آهنگ های مورد علاقه"
    document.querySelector(".music-icon img").src = "../assets/pic/favorite_header.jpg"
    listSongs.forEach(song => {
        if (!song.querySelector("input").checked)
            song.style.display = "none";
    })
}

function changeUnderline() {
    options.forEach(option => option.classList.remove("underlined"))
    this.classList.add("underlined")
}