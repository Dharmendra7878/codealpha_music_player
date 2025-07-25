const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const cover = document.getElementById("cover");

let isShuffle = false;
let repeatMode = "all";
let currentSong = 0;

const songs = [
  {
    title: "MohanVeena - Indian Guitar",
    artist: "Saseendran VV",
    src: "songs/song1.mp3",
    cover: "images/song1.jpg"
  },
  {
    title: "EONA - Emotional Ambient Pop",
    artist: "Rockot",
    src: "songs/song2.mp3",
    cover: "images/song2.webp"
  },
  {
    title: "Jungle Waves (Drum&Bass Electronic In",
    artist: "DIMMYSAD",
    src: "songs/song3.mp3",
    cover: "images/song3.jpg"
  }
];

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover || "images/default.jpg";
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function nextSong() {
  if (isShuffle) {
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸️";
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸️";
}





audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  current.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  if (repeatMode === "one") {
    audio.currentTime = 0;
    audio.play();
  } else if (repeatMode === "all" || isShuffle) {
    nextSong();
  }
});

// Load playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.onclick = () => {
    currentSong = index;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸️";
  };
  playlistEl.appendChild(li);
});

function formatTime(t) {
  const min = Math.floor(t / 60);
  const sec = Math.floor(t % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

// Start
loadSong(currentSong);
