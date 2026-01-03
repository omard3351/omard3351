// Conectar con Socket.IO
const socket = io();

// Estado del jugador
let playerId = null;
let playerName = null;
let playerTeam = null;
let hasAnswered = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

// Elementos del DOM
const screens = {
  register: document.getElementById('register-screen'),
  waiting: document.getElementById('waiting-screen'),
  countdown: document.getElementById('countdown-screen'),
  question: document.getElementById('question-screen'),
  result: document.getElementById('result-screen'),
  final: document.getElementById('final-screen'),
  reconnect: document.getElementById('reconnect-screen')
};

// Elementos de Registro
const playerNameInput = document.getElementById('player-name');
const playerTeamSelect = document.getElementById('player-team');
const teamSelection = document.getElementById('team-selection');
const joinBtn = document.getElementById('join-btn');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');

// Elementos de Espera
const playerInfoName = document.getElementById('player-info-name');
const waitingPlayerCount = document.getElementById('waiting-player-count');

// Elementos de Pregunta
const timerMobile = document.getElementById('timer-mobile');
const questionInfo = document.getElementById('question-info');
const optionsContainer = document.getElementById('options-container');
const answerFeedback = document.getElementById('answer-feedback');

// Elementos de Resultado
const resultIcon = document.getElementById('result-icon');
const resultTitle = document.getElementById('result-title');
const pointsEarned = document.getElementById('points-earned');
const totalScore = document.getElementById('total-score');
const playerPosition = document.getElementById('player-position');

// Elementos Finales
const finalPosition = document.getElementById('final-position');
const finalScore = document.getElementById('final-score');
const finalMessage = document.getElementById('final-message');

// Elementos de Reconexión
const retryBtn = document.getElementById('retry-btn');

// Cambiar pantalla
function showScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[screenName].classList.add('active');
}

// Habilitar/deshabilitar botón de unirse
playerNameInput.addEventListener('input', () => {
  const name = playerNameInput.value.trim();
  joinBtn.disabled = name.length < 2;
});

// Unirse al juego
joinBtn.addEventListener('click', () => {
  playerName = playerNameInput.value.trim();
  playerTeam = playerTeamSelect.value || null;

  if (playerName.length >= 2) {
    socket.emit('player:join', { name: playerName, team: playerTeam });
  }
});

// Presionar Enter para unirse
playerNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !joinBtn.disabled) {
    joinBtn.click();
  }
});

// Seleccionar respuesta
function setupAnswerButtons() {
  const buttons = document.querySelectorAll('.option-btn-mobile');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (hasAnswered) return;

      const answerId = button.dataset.id;

      // Enviar respuesta al servidor
      socket.emit('player:answer', { answerId });

      // Marcar como respondido
      hasAnswered = true;
      button.classList.add('selected');

      // Deshabilitar todos los botones
      buttons.forEach(btn => btn.disabled = true);

      // Mostrar feedback
      answerFeedback.style.display = 'block';
    });
  });
}

// Actualizar temporizador
function updateTimer(timeLeft) {
  timerMobile.textContent = timeLeft;

  if (timeLeft <= 5) {
    timerMobile.classList.add('warning');
  } else {
    timerMobile.classList.remove('warning');
  }
}

// Mostrar resultado
function showResult(result) {
  const isCorrect = result.isCorrect;

  // Icono
  resultIcon.textContent = isCorrect ? '✓' : '✗';

  // Título
  resultTitle.textContent = isCorrect ? '¡Correcto!' : 'Incorrecto';
  resultTitle.className = 'result-title ' + (isCorrect ? 'correct' : 'incorrect');

  // Puntos
  pointsEarned.textContent = result.points > 0 ? `+${result.points}` : '0';

  // Score total
  totalScore.textContent = result.totalScore;

  showScreen('result');
}

// Actualizar posición del jugador
function updatePlayerPosition(scoreboard) {
  if (!playerId) return;

  const position = scoreboard.findIndex(item => {
    if (item.playerId === playerId) return true;
    return false;
  });

  if (position >= 0) {
    playerPosition.textContent = `${position + 1}°`;
  }
}

// Mostrar pantalla final
function showFinalScreen(data) {
  const { scoreboard } = data;

  // Encontrar posición del jugador
  const position = scoreboard.findIndex(item => item.playerId === playerId);
  const playerData = scoreboard[position];

  if (playerData) {
    finalPosition.textContent = `${position + 1}°`;
    finalScore.textContent = playerData.score;

    // Mensaje personalizado según posición
    if (position === 0) {
      finalMessage.textContent = '🏆 ¡GANASTE! ¡Increíble! 🏆';
    } else if (position === 1) {
      finalMessage.textContent = '🥈 ¡Segundo lugar! ¡Muy bien! 🥈';
    } else if (position === 2) {
      finalMessage.textContent = '🥉 ¡Tercer lugar! ¡Excelente! 🥉';
    } else if (position < scoreboard.length / 2) {
      finalMessage.textContent = '¡Gran trabajo!';
    } else {
      finalMessage.textContent = '¡Gracias por jugar!';
    }
  }

  showScreen('final');
}

// Intentar reconexión
function attemptReconnect() {
  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS && playerId) {
    reconnectAttempts++;
    socket.emit('player:reconnect', { playerId });
  } else {
    retryBtn.style.display = 'block';
  }
}

retryBtn.addEventListener('click', () => {
  reconnectAttempts = 0;
  retryBtn.style.display = 'none';
  socket.connect();
});

// Socket.IO Event Handlers
socket.on('connect', () => {
  console.log('Conectado al servidor');
  statusIndicator.classList.add('connected');
  statusText.textContent = 'Conectado';

  // Si ya estaba registrado, intentar reconectar
  if (playerId) {
    attemptReconnect();
  }
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
  statusIndicator.classList.remove('connected');
  statusText.textContent = 'Desconectado';

  // Mostrar pantalla de reconexión si estaba jugando
  if (playerId && screens.register.classList.contains('active') === false) {
    showScreen('reconnect');
  }
});

socket.on('player:registered', (data) => {
  playerId = data.playerId;
  playerName = data.name;
  playerTeam = data.team;

  playerInfoName.textContent = playerName;
  showScreen('waiting');

  console.log('Registrado como:', playerName);
});

socket.on('player:reconnected', (player) => {
  console.log('Reconectado exitosamente');
  // Volver a la pantalla donde estaba
  showScreen('waiting');
});

socket.on('game:lobby-update', (data) => {
  waitingPlayerCount.textContent = `${data.players.length} jugadores conectados`;

  // Actualizar selector de equipo según el modo
  if (data.mode === 'teams') {
    teamSelection.style.display = 'block';
  } else {
    teamSelection.style.display = 'none';
  }
});

socket.on('game:starting', (data) => {
  showScreen('countdown');

  let countdown = 3;
  const countdownNumber = document.getElementById('countdown-number');

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownNumber.textContent = countdown;
    } else {
      clearInterval(interval);
    }
  }, 1000);
});

socket.on('game:question', (questionData) => {
  hasAnswered = false;
  answerFeedback.style.display = 'none';

  // Resetear botones
  const buttons = document.querySelectorAll('.option-btn-mobile');
  buttons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('selected');
  });

  questionInfo.textContent = `Pregunta ${questionData.questionNumber}/${questionData.totalQuestions}`;

  showScreen('question');
  updateTimer(30);
});

socket.on('game:timer-tick', (data) => {
  updateTimer(data.timeLeft);
});

socket.on('player:answer-received', (data) => {
  console.log('Respuesta recibida:', data.answerId);
});

socket.on('player:result', (result) => {
  showResult(result);
});

socket.on('game:scoreboard', (data) => {
  updatePlayerPosition(data.scoreboard);
});

socket.on('game:question-end', (results) => {
  // Si el jugador no respondió, mostrar que no respondió
  if (!hasAnswered) {
    showResult({
      isCorrect: false,
      points: 0,
      totalScore: 0,
      timeElapsed: 30
    });
  }
});

socket.on('game:finished', (data) => {
  showFinalScreen(data);
});

socket.on('game:reset', () => {
  playerId = null;
  playerName = null;
  playerTeam = null;
  hasAnswered = false;
  playerNameInput.value = '';
  playerTeamSelect.value = '';
  showScreen('register');
});

socket.on('error', (data) => {
  console.error('Error:', data.message);
  alert('Error: ' + data.message);
});

// Configurar event listeners de botones de respuesta
setupAnswerButtons();

// Prevenir zoom en inputs en iOS
document.querySelectorAll('input, select').forEach(element => {
  element.addEventListener('touchstart', function(e) {
    e.currentTarget.style.fontSize = '16px';
  });
});

// Mantener pantalla activa
let wakeLock = null;

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake Lock activado');
    }
  } catch (err) {
    console.log('Wake Lock no disponible:', err);
  }
}

// Activar wake lock cuando se une al juego
joinBtn.addEventListener('click', () => {
  requestWakeLock();
});

// Reactivar wake lock si la pantalla se desbloquea
document.addEventListener('visibilitychange', () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    requestWakeLock();
  }
});

console.log('Player interface loaded');
