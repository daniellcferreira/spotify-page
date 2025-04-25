const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlist");
const playButton = document.getElementById("play-button");
const hamburgerButton = document.getElementById("hamburger-button");
const json = "../../api-artists/artists.json";
let currentMusic = "";
let isPlaying = false;
let sidebarStatus = false;
let artistId = 0;

function searchArtists(searchTerm) {
  fetch(json)
    .then((response) => response.json())
    .then((data) => {
      const result = data.artists.filter((element) =>
        element.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      displayResults(result);
    });
}

function displayResults(result) {
  resultPlaylist.classList.add("hidden");
  const artistName = document.getElementById("artist-name");
  const artistImage = document.getElementById("artist-img");

  result.forEach((element) => {
    artistName.innerText = element.name;
    artistImage.src = element.urlImg;
    artistId = element.id;
  });

  resultArtist.classList.remove("hidden");
}

function pauseMusic() {
  currentMusic.pause();
  currentMusic.currentTime = 0;
  isPlaying = false;
}

function playMusic(id) {
  if (isPlaying && !currentMusic.paused) {
    pauseMusic();
  }

  fetch(json)
    .then((response) => response.json())
    .then((data) => {
      const artist = data.artists.find((element) => element.id === id);
      currentMusic = new Audio(artist.urlMp3);

      currentMusic.play();
      isPlaying = true;
    });
}

function togglePlayPause() {
  if (isPlaying) {
    // Pausar música
    pauseMusic();
    // Mudar ícone para play
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
  } else {
    // Tocar música
    playMusic(artistId);
    // Mudar ícone para pause
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
  }
}

document.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultPlaylist.classList.remove("hidden");
    resultArtist.classList.add("hidden");
    return;
  }
  searchArtists(searchTerm);
});

document.addEventListener("DOMContentLoaded", function () {
  const saudacaoDiv = document.getElementById("saudacao");

  const horaAtual = new Date().getHours();

  let saudacao;
  if (horaAtual >= 0 && horaAtual < 5) {
    saudacao = "Boa Madrugada";
  } else if (horaAtual >= 5 && horaAtual < 12) {
    saudacao = "Bom Dia";
  } else if (horaAtual >= 12 && horaAtual < 18) {
    saudacao = "Boa Tarde";
  } else {
    saudacao = "Boa Noite";
  }

  saudacaoDiv.textContent = saudacao;
});

playButton.addEventListener("click", function () {
  togglePlayPause();
});

hamburgerButton.addEventListener("click", function () {
  if (!sidebarStatus) {
    document.getElementById("sidebar").style.display = "block";
    sidebarStatus = true;
  } else {
    document.getElementById("sidebar").style.display = "none";
    sidebarStatus = false;
  }
});
