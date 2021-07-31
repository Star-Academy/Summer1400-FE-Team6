const playBtn = document.getElementById('play');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const songs = [];
let songIndex = 2;

function loadSong(song) {
    title.innerText = song;
    audio.src = `../assets/music/${song}.mp3`;
    cover.src = `../assets/pic/${song}.jpg`;
}

loadSong(songs[songIndex]);

function playSong() {
    //todo change icons

    audio.play();
}

function pauseSong() {
    //todo change icons

    audio.pause();
}


// Update progress bar
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


playBtn.addEventListener('click', () => {
    //todo to know the state
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});


audio.addEventListener('timeupdate', updateProgress);



// Time of song
audio.addEventListener('timeupdate', durTime);