const playBtn = document.getElementById("play");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const currTime = document.getElementById("currTime");

const songs = "zolf-namjoo";

function loadSong(song) {
  title.innerText = song;
  audio.src = `../assets/music/${song}.mp3`;
  cover.src = `../assets/music/cover/${song}.png`;
}

loadSong(songs);

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
  const { duration, currentTime } = e.srcElement;
  let curr = currentTime;
  const progressPercent = (currentTime / duration) * 100;
  timeFixer(curr.toFixed(0));
  progress.style.width = `${progressPercent}%`;
}

function timeFixer(time) {
  let min = time / 60;
  let sec = time % 60;
  currTime.innerText = "" + min.toFixed(0) + ":" + sec;
}

playBtn.addEventListener("click", () => {
  if (playBtn.checked) playSong();
  else pauseSong();
});

audio.addEventListener("timeupdate", updateProgress);
