const playBtn = document.getElementById("play");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const artist = document.querySelector(".artist");

const currTime = document.getElementById("currTime");
const durTime = document.getElementById("durTime");

const baseUrl = "https://songs.code-star.ir/song/one/";

let song;

function loginStatus(){
  if(localStorage.getItem("isLogin") === "false"){
    document.location = "login.html";
  }
}

loginStatus();

loadSong();

async function loadSong() {
  const urlParams = new URLSearchParams(window.location.search);
  const songId = urlParams.get("id");
  await fetchSong(songId);
  document.querySelector("title").textContent = song.name;
}

async function fetchSong(songId) {
  response = await fetch(baseUrl + songId);
  if (response.ok) {
    song = await response.json().then((json) => json.song);
    title.innerText = song.name;
    audio.src = song.file;
    cover.src = song.cover;
    artist.textContent = song.artist;
  }
}

function playSong() {
  document.querySelector(".far").classList.remove("fa-play-circle");
  document.querySelector(".far").classList.add("fa-pause-circle");
  audio.play();
}

function pauseSong() {
  document.querySelector(".far").classList.remove("fa-pause-circle");
  document.querySelector(".far").classList.add("fa-play-circle");
  audio.pause();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.target;
  let curr = currentTime;
  const progressPercent = (currentTime / duration) * 100;
  timeFixer(curr.toFixed(0));
  progress.style.width = `${progressPercent}%`;
}

function secFixer(n){
  return n > 9 ? "" + n: "0" + n;
}

function timeFixer(time) {
  let min = time / 60;
  let sec = time % 60;
  currTime.innerText = "" + secFixer(min.toFixed(0)) + ":" + secFixer(sec);
}

playBtn.addEventListener("click", () => {
  if (playBtn.checked) playSong();
  else pauseSong();
});

audio.addEventListener("timeupdate", updateProgress);