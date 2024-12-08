let map;
let countryLayer;
let score = 3;
let currentCountryName = '';

// Oyunu başlat
startGame();

function startGame() {
  // Haritayı başlat
  map = L.map('map', { zoomControl: false }).setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Harita boyutunu güncelle
  window.addEventListener('load', () => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
  }).addTo(map);

  fetch('data/countries.geojson?t=' + new Date().getTime())
    .then(response => response.json())
    .then(data => {
      loadQuestion(data);
    });

  document.getElementById('submit-guess').addEventListener('click', () => {
    handleUserInput();
  });
}

function loadQuestion(data) {
  const countryFeatures = data.features;
  const randomCountry = countryFeatures[Math.floor(Math.random() * countryFeatures.length)];

  if (countryLayer) {
    map.removeLayer(countryLayer);
  }

  countryLayer = L.geoJSON(randomCountry, {
    style: { color: '#ff9000', weight: 2 }
  }).addTo(map);

  map.fitBounds(countryLayer.getBounds());
  currentCountryName = randomCountry.properties.ADMIN.toLowerCase();
}

function handleUserInput() {
  const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();

  if (userGuess === currentCountryName) {
    alert("Correct! 🎉");
    updateScore(1);
    fetch('data/countries.geojson')
      .then(response => response.json())
      .then(data => {
        loadQuestion(data);
      });
  } else {
    alert(`Wrong! The correct answer was ${currentCountryName.toUpperCase()}.`);
    updateScore(-1);
    fetch('countries.geojson')
      .then(response => response.json())
      .then(data => {
        loadQuestion(data);
      });
  }

  document.getElementById('guess-input').value = '';
}

function updateScore(points) {
  score += points;
  document.getElementById('stars').innerText = '⭐'.repeat(score);

  if (score <= 0) {
    alert('Game Over! You have no more stars.');
    location.reload();
  }
}
