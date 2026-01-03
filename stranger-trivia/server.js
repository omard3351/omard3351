const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const os = require('os');
const QRCode = require('qrcode');
const GameState = require('./game/gameState');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;
const gameState = new GameState();

// Temporizador de pregunta
let questionTimer = null;
const QUESTION_DURATION = 30000; // 30 segundos

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'player', 'index.html'));
});

app.get('/host', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'host', 'index.html'));
});

// Obtener todas las IPs locales
function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Saltar direcciones internas y no IPv4
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }

  return ips;
}

// Socket.IO - Manejo de conexiones
io.on('connection', (socket) => {
  console.log(`Nueva conexión: ${socket.id}`);

  // Evento: Jugador se une
  socket.on('player:join', (data) => {
    const { name, team } = data;
    const result = gameState.addPlayer(socket.id, name, team);

    if (result.success) {
      socket.emit('player:registered', {
        playerId: socket.id,
        name,
        team
      });

      // Notificar a todos sobre la actualización del lobby
      io.emit('game:lobby-update', {
        players: gameState.getPlayers(),
        mode: gameState.mode
      });

      console.log(`Jugador registrado: ${name} (${socket.id})`);
    } else {
      socket.emit('error', { message: result.error });
    }
  });

  // Evento: Jugador envía respuesta
  socket.on('player:answer', (data) => {
    const { answerId } = data;
    const result = gameState.submitAnswer(socket.id, answerId);

    if (result.success) {
      socket.emit('player:answer-received', { answerId });

      // Notificar al host cuántos han respondido
      io.emit('game:answer-count', {
        count: gameState.getAnswerCount(),
        total: Object.keys(gameState.players).filter(id => gameState.players[id].connected).length
      });

      // Si todos respondieron, terminar pregunta automáticamente
      if (gameState.allPlayersAnswered()) {
        endCurrentQuestion();
      }
    } else {
      socket.emit('error', { message: result.error });
    }
  });

  // Evento: Host inicia juego
  socket.on('host:start-game', (data) => {
    const { mode } = data;
    const question = gameState.startGame(mode);

    if (question) {
      // Notificar a todos que el juego está comenzando
      io.emit('game:starting', { mode });

      setTimeout(() => {
        io.emit('game:question', question);
        startQuestionTimer();
      }, 3000); // 3 segundos de cuenta regresiva

      console.log(`Juego iniciado en modo: ${mode}`);
    }
  });

  // Evento: Host avanza a la siguiente pregunta
  socket.on('host:next-question', () => {
    const question = gameState.nextQuestion();

    if (question) {
      io.emit('game:question', question);
      startQuestionTimer();
    } else {
      // Juego terminado
      const scoreboard = gameState.getScoreboard();
      io.emit('game:finished', { scoreboard });
      console.log('Juego terminado');
    }
  });

  // Evento: Host resetea el juego
  socket.on('host:reset', () => {
    stopQuestionTimer();
    gameState.reset();
    io.emit('game:reset');
    io.emit('game:lobby-update', {
      players: gameState.getPlayers(),
      mode: gameState.mode
    });
    console.log('Juego reseteado');
  });

  // Evento: Cambiar modo de juego
  socket.on('host:change-mode', (data) => {
    if (gameState.status === 'lobby') {
      gameState.mode = data.mode;
      io.emit('game:mode-changed', { mode: data.mode });
    }
  });

  // Evento: Reconexión de jugador
  socket.on('player:reconnect', (data) => {
    const { playerId } = data;
    const result = gameState.reconnectPlayer(playerId);

    if (result.success) {
      socket.emit('player:reconnected', result.player);
      io.emit('game:lobby-update', {
        players: gameState.getPlayers(),
        mode: gameState.mode
      });
    }
  });

  // Evento: Desconexión
  socket.on('disconnect', () => {
    gameState.disconnectPlayer(socket.id);
    io.emit('game:lobby-update', {
      players: gameState.getPlayers(),
      mode: gameState.mode
    });
    console.log(`Desconectado: ${socket.id}`);
  });
});

// Función para iniciar temporizador de pregunta
function startQuestionTimer() {
  stopQuestionTimer(); // Limpiar cualquier temporizador anterior

  let timeLeft = 30;

  questionTimer = setInterval(() => {
    timeLeft--;
    io.emit('game:timer-tick', { timeLeft });

    if (timeLeft <= 0) {
      endCurrentQuestion();
    }
  }, 1000);
}

// Función para detener temporizador
function stopQuestionTimer() {
  if (questionTimer) {
    clearInterval(questionTimer);
    questionTimer = null;
  }
}

// Función para terminar pregunta actual
function endCurrentQuestion() {
  stopQuestionTimer();

  const results = gameState.endQuestion();
  if (results) {
    io.emit('game:question-end', results);

    // Enviar resultados individuales a cada jugador
    Object.keys(results.playerResults).forEach(playerId => {
      io.to(playerId).emit('player:result', results.playerResults[playerId]);
    });

    // Enviar scoreboard actualizado
    const scoreboard = gameState.getScoreboard();
    io.emit('game:scoreboard', { scoreboard });
  }
}

// Iniciar servidor
server.listen(PORT, () => {
  console.log('\n==============================================');
  console.log('🎮 TRIVIA STRANGER THINGS - SERVIDOR ACTIVO 🎮');
  console.log('==============================================\n');

  const ips = getLocalIPs();

  if (ips.length > 0) {
    console.log('📺 PANTALLA HOST (TV/Proyector):');
    console.log(`   http://localhost:${PORT}/host\n`);

    console.log('📱 JUGADORES - Conectarse desde el teléfono:');
    ips.forEach(ip => {
      const url = `http://${ip}:${PORT}`;
      console.log(`   ${url}`);
    });

    console.log('\n📋 Generar QR Code para jugadores:');
    const mainUrl = `http://${ips[0]}:${PORT}`;

    QRCode.toString(mainUrl, { type: 'terminal', small: true }, (err, qr) => {
      if (!err) {
        console.log(qr);
      }
      console.log('\n==============================================');
      console.log('¡Feliz Cumpleaños Romina! 🎂');
      console.log('==============================================\n');
    });
  } else {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('⚠️  No se detectó una conexión de red local.');
    console.log('   Asegúrate de estar conectado a WiFi.\n');
  }
});

// Manejo de errores
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Promesa rechazada no manejada:', err);
});
