// Conectar con Socket.IO
const socket = io();

// Estado local
let currentMode = 'individual';
let players = [];

// Elementos del DOM
const screens = {
  lobby: document.getElementById('lobby-screen'),
  starting: document.getElementById('starting-screen'),
  question: document.getElementById('question-screen'),
  results: document.getElementById('results-screen'),
  final: document.getElementById('final-screen')
};

// Elementos del Lobby
const qrCodeDiv = document.getElementById('qr-code');
const connectionUrlP = document.getElementById('connection-url');
const playerCountSpan = document.getElementById('player-count');
const playersListDiv = document.getElementById('players-list');
const startGameBtn = document.getElementById('start-game-btn');
const modeIndividualBtn = document.getElementById('mode-individual');
const modeTeamsBtn = document.getElementById('mode-teams');

// Elementos de la pantalla de pregunta
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const timerBar = document.getElementById('timer-bar');
const timerText = document.getElementById('timer-text');
const answeredCount = document.getElementById('answered-count');
const optionsGrid = document.getElementById('options-grid');

// Elementos de resultados
const correctLetter = document.getElementById('correct-letter');
const correctText = document.getElementById('correct-text');
const statsA = document.getElementById('stat-a');
const statsB = document.getElementById('stat-b');
const statsC = document.getElementById('stat-c');
const statsD = document.getElementById('stat-d');
const statsACount = document.getElementById('stat-a-count');
const statsBCount = document.getElementById('stat-b-count');
const statsCCount = document.getElementById('stat-c-count');
const statsDCount = document.getElementById('stat-d-count');
const scoreboardList = document.getElementById('scoreboard-list');
const nextQuestionBtn = document.getElementById('next-question-btn');

// Elementos de pantalla final
const firstPlaceName = document.getElementById('first-place-name');
const firstPlaceScore = document.getElementById('first-place-score');
const secondPlaceName = document.getElementById('second-place-name');
const secondPlaceScore = document.getElementById('second-place-score');
const thirdPlaceName = document.getElementById('third-place-name');
const thirdPlaceScore = document.getElementById('third-place-score');
const finalScoreboardList = document.getElementById('final-scoreboard-list');
const playAgainBtn = document.getElementById('play-again-btn');
const backLobbyBtn = document.getElementById('back-lobby-btn');

// Generar QR Code
function generateQRCode() {
  const host = window.location.hostname;
  const port = window.location.port;
  const url = `http://${host}${port ? ':' + port : ''}`;

  connectionUrlP.textContent = url;

  // Crear QR code usando una librería simple
  qrCodeDiv.innerHTML = `
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}"
         alt="QR Code" style="display: block;">
  `;
}

// Cambiar pantalla
function showScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[screenName].classList.add('active');
}

// Actualizar lista de jugadores
function updatePlayersList() {
  playerCountSpan.textContent = players.length;

  if (players.length === 0) {
    playersListDiv.innerHTML = '<p class="no-players">Esperando jugadores...</p>';
    startGameBtn.disabled = true;
  } else {
    playersListDiv.innerHTML = players.map(player => `
      <div class="player-item">
        <div>
          <div class="player-name">${escapeHtml(player.name)}</div>
          ${player.team ? `<div class="player-team">${escapeHtml(player.team)}</div>` : ''}
        </div>
        <div style="color: ${player.connected ? 'var(--success-green)' : 'var(--error-red)'}">
          ${player.connected ? '●' : '○'}
        </div>
      </div>
    `).join('');

    startGameBtn.disabled = players.length < 2;
  }
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Mostrar pregunta
function showQuestion(questionData) {
  questionNumber.textContent = `Pregunta ${questionData.questionNumber} de ${questionData.totalQuestions}`;
  questionText.textContent = questionData.question;

  const optionTexts = {
    A: document.getElementById('option-a-text'),
    B: document.getElementById('option-b-text'),
    C: document.getElementById('option-c-text'),
    D: document.getElementById('option-d-text')
  };

  questionData.options.forEach(option => {
    if (optionTexts[option.id]) {
      optionTexts[option.id].textContent = option.text;
    }
  });

  showScreen('question');
}

// Actualizar temporizador
function updateTimer(timeLeft) {
  timerText.textContent = timeLeft;
  const percentage = (timeLeft / 30) * 100;
  timerBar.style.setProperty('--timer-width', percentage + '%');

  // Cambiar color según el tiempo
  if (timeLeft <= 5) {
    timerText.style.color = 'var(--error-red)';
  } else if (timeLeft <= 10) {
    timerText.style.color = 'var(--primary-red)';
  } else {
    timerText.style.color = 'var(--success-green)';
  }
}

// Mostrar resultados
function showResults(results) {
  // Mostrar respuesta correcta
  correctLetter.textContent = results.correctAnswer;
  const correctOption = document.querySelector(`[data-id="${results.correctAnswer}"] .option-text`);
  correctText.textContent = correctOption ? correctOption.textContent : 'Respuesta correcta';

  // Mostrar estadísticas
  const total = results.statistics.A + results.statistics.B + results.statistics.C + results.statistics.D;

  const updateStat = (element, count, countElement) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    element.style.width = percentage + '%';
    countElement.textContent = count;
  };

  updateStat(statsA, results.statistics.A, statsACount);
  updateStat(statsB, results.statistics.B, statsBCount);
  updateStat(statsC, results.statistics.C, statsCCount);
  updateStat(statsD, results.statistics.D, statsDCount);

  showScreen('results');
}

// Actualizar scoreboard
function updateScoreboard(data) {
  const { scoreboard } = data;

  scoreboardList.innerHTML = scoreboard.map((item, index) => {
    const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : '';
    const displayName = item.name || item.teamName || 'Jugador';

    return `
      <div class="scoreboard-item ${rankClass}">
        <span class="scoreboard-rank">${index + 1}°</span>
        <span class="scoreboard-name">${escapeHtml(displayName)}</span>
        <span class="scoreboard-score">${item.score}</span>
      </div>
    `;
  }).join('');
}

// Mostrar pantalla final
function showFinalScreen(data) {
  const { scoreboard } = data;

  // Actualizar podio
  if (scoreboard[0]) {
    firstPlaceName.textContent = scoreboard[0].name || scoreboard[0].teamName || '-';
    firstPlaceScore.textContent = scoreboard[0].score;
  }

  if (scoreboard[1]) {
    secondPlaceName.textContent = scoreboard[1].name || scoreboard[1].teamName || '-';
    secondPlaceScore.textContent = scoreboard[1].score;
  }

  if (scoreboard[2]) {
    thirdPlaceName.textContent = scoreboard[2].name || scoreboard[2].teamName || '-';
    thirdPlaceScore.textContent = scoreboard[2].score;
  }

  // Actualizar ranking completo
  finalScoreboardList.innerHTML = scoreboard.map((item, index) => {
    const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : '';
    const displayName = item.name || item.teamName || 'Jugador';

    return `
      <div class="scoreboard-item ${rankClass}">
        <span class="scoreboard-rank">${index + 1}°</span>
        <span class="scoreboard-name">${escapeHtml(displayName)}</span>
        <span class="scoreboard-score">${item.score}</span>
      </div>
    `;
  }).join('');

  showScreen('final');
}

// Event Listeners
startGameBtn.addEventListener('click', () => {
  socket.emit('host:start-game', { mode: currentMode });
});

modeIndividualBtn.addEventListener('click', () => {
  currentMode = 'individual';
  modeIndividualBtn.classList.add('active');
  modeTeamsBtn.classList.remove('active');
  socket.emit('host:change-mode', { mode: 'individual' });
});

modeTeamsBtn.addEventListener('click', () => {
  currentMode = 'teams';
  modeTeamsBtn.classList.add('active');
  modeIndividualBtn.classList.remove('active');
  socket.emit('host:change-mode', { mode: 'teams' });
});

nextQuestionBtn.addEventListener('click', () => {
  socket.emit('host:next-question');
});

playAgainBtn.addEventListener('click', () => {
  socket.emit('host:start-game', { mode: currentMode });
});

backLobbyBtn.addEventListener('click', () => {
  socket.emit('host:reset');
  showScreen('lobby');
});

// Socket.IO Event Handlers
socket.on('connect', () => {
  console.log('Conectado al servidor');
  generateQRCode();
});

socket.on('game:lobby-update', (data) => {
  players = data.players;
  updatePlayersList();
});

socket.on('game:starting', (data) => {
  showScreen('starting');
  let countdown = 3;
  const countdownEl = document.getElementById('countdown');

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownEl.textContent = countdown;
    } else {
      clearInterval(interval);
    }
  }, 1000);
});

socket.on('game:question', (questionData) => {
  showQuestion(questionData);
  updateTimer(30);
});

socket.on('game:timer-tick', (data) => {
  updateTimer(data.timeLeft);
});

socket.on('game:answer-count', (data) => {
  answeredCount.textContent = `${data.count}/${data.total}`;
});

socket.on('game:question-end', (results) => {
  showResults(results);
});

socket.on('game:scoreboard', (data) => {
  updateScoreboard(data);
});

socket.on('game:finished', (data) => {
  showFinalScreen(data);
});

socket.on('game:reset', () => {
  showScreen('lobby');
  players = [];
  updatePlayersList();
});

socket.on('game:mode-changed', (data) => {
  currentMode = data.mode;
});

socket.on('error', (data) => {
  console.error('Error:', data.message);
  alert('Error: ' + data.message);
});

// Agregar efecto al timer bar
const style = document.createElement('style');
style.textContent = `
  .timer-bar::after {
    width: var(--timer-width, 100%);
  }
`;
document.head.appendChild(style);

// Crear partículas de fondo (opcional)
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = Math.random() > 0.5 ? 'var(--primary-red)' : 'var(--secondary-blue)';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = Math.random() * 0.5;
    particle.style.animation = `float ${5 + Math.random() * 10}s infinite`;

    particlesContainer.appendChild(particle);
  }
}

const floatAnimation = document.createElement('style');
floatAnimation.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-20px) translateX(10px);
    }
    50% {
      transform: translateY(-40px) translateX(-10px);
    }
    75% {
      transform: translateY(-20px) translateX(5px);
    }
  }
`;
document.head.appendChild(floatAnimation);

createParticles();

console.log('Host interface loaded');
