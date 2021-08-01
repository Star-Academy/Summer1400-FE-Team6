const playBtn = document.getElementById('play');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const currTime = document.getElementById('currTime');
// const durTime = document.getElementById('durTime');

const songs = 'zolf-namjoo';

function loadSong(song) {
    console.log("hi")
    title.innerText = song;
    audio.src = `../assets/music/${song}.mp3`;
    cover.src = `../assets/music/cover/${song}.png`;

}

loadSong(songs);

function playSong() {
    playBtn.innerText = '||';
    playBtn.classList.remove('pause');
    playBtn.classList.add('play');
    audio.play();
}

function pauseSong() {
    //todo change icons
    playBtn.innerText = '▶';
    playBtn.classList.remove('play');
    playBtn.classList.add('pause');
    audio.pause();
}


// Update progress bar
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    let curr = currentTime;
    const progressPercent = (currentTime / duration) * 100;
    timeFixer(curr.toFixed(0))
    progress.style.width = `${progressPercent}%`;
}

function timeFixer(time ) {
    let min = time / 60;
   console.log(min.toFixed(0))
    let sec = time % 60;
    currTime.innerText = '' + min.toFixed(0) + ':' + sec;

}


playBtn.addEventListener('click', () => {
    //todo to know the state
    const isPlaying = playBtn.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});


audio.addEventListener('timeupdate', updateProgress);
