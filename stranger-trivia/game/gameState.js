// Lógica de estado del juego
const { getRandomQuestions, isCorrectAnswer } = require('./questions');

class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.status = 'lobby'; // 'lobby' | 'playing' | 'showing-results' | 'finished'
    this.mode = 'individual'; // 'individual' | 'teams'
    this.currentQuestionIndex = -1;
    this.questions = [];
    this.players = {};
    this.teams = {
      "Los Demogorgons": { score: 0, members: [] },
      "Eleven's Squad": { score: 0, members: [] },
      "Hawkins Heroes": { score: 0, members: [] },
      "The Mind Flayers": { score: 0, members: [] }
    };
    this.currentQuestion = null;
  }

  // Iniciar nuevo juego
  startGame(mode = 'individual') {
    this.mode = mode;
    this.questions = getRandomQuestions(15);
    this.currentQuestionIndex = -1;
    this.status = 'playing';

    // Reiniciar scores
    Object.keys(this.players).forEach(playerId => {
      this.players[playerId].score = 0;
      this.players[playerId].answerHistory = [];
    });

    if (mode === 'teams') {
      Object.keys(this.teams).forEach(teamName => {
        this.teams[teamName].score = 0;
      });
    }

    return this.nextQuestion();
  }

  // Avanzar a la siguiente pregunta
  nextQuestion() {
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.status = 'finished';
      return null;
    }

    const question = this.questions[this.currentQuestionIndex];
    this.currentQuestion = {
      questionData: {
        id: question.id,
        question: question.question,
        options: question.options,
        questionNumber: this.currentQuestionIndex + 1,
        totalQuestions: this.questions.length
      },
      startTime: Date.now(),
      answers: {}
    };

    this.status = 'playing';
    return this.currentQuestion.questionData;
  }

  // Registrar respuesta de jugador
  submitAnswer(playerId, answerId) {
    if (!this.currentQuestion || this.status !== 'playing') {
      return { success: false, error: 'No hay pregunta activa' };
    }

    if (this.currentQuestion.answers[playerId]) {
      return { success: false, error: 'Ya respondiste esta pregunta' };
    }

    const timestamp = Date.now();
    const timeElapsed = (timestamp - this.currentQuestion.startTime) / 1000; // segundos

    if (timeElapsed > 30) {
      return { success: false, error: 'Tiempo agotado' };
    }

    this.currentQuestion.answers[playerId] = {
      answerId,
      timestamp,
      timeElapsed
    };

    return { success: true };
  }

  // Calcular puntos por velocidad
  calculateSpeedBonus(timeElapsed) {
    if (timeElapsed <= 5) return 500;
    if (timeElapsed <= 10) return 300;
    if (timeElapsed <= 15) return 100;
    return 0;
  }

  // Finalizar pregunta y calcular resultados
  endQuestion() {
    if (!this.currentQuestion) {
      return null;
    }

    const question = this.questions[this.currentQuestionIndex];
    const results = {
      correctAnswer: question.correctAnswer,
      statistics: { A: 0, B: 0, C: 0, D: 0 },
      playerResults: {},
      topScorers: []
    };

    // Procesar respuestas de cada jugador
    Object.keys(this.currentQuestion.answers).forEach(playerId => {
      const answer = this.currentQuestion.answers[playerId];
      const isCorrect = answer.answerId === question.correctAnswer;

      // Estadísticas de respuestas
      results.statistics[answer.answerId]++;

      // Calcular puntos
      let points = 0;
      if (isCorrect) {
        points = 1000 + this.calculateSpeedBonus(answer.timeElapsed);
        this.players[playerId].score += points;
      }

      // Guardar resultado del jugador
      results.playerResults[playerId] = {
        answerId: answer.answerId,
        isCorrect,
        points,
        timeElapsed: answer.timeElapsed,
        totalScore: this.players[playerId].score
      };

      // Guardar en historial
      this.players[playerId].answerHistory.push({
        questionId: question.id,
        answerId: answer.answerId,
        isCorrect,
        points,
        timeElapsed: answer.timeElapsed
      });

      // Actualizar puntuación de equipo si es modo equipos
      if (this.mode === 'teams' && this.players[playerId].team) {
        const teamName = this.players[playerId].team;
        if (this.teams[teamName]) {
          this.teams[teamName].score += points;
        }
      }
    });

    // Encontrar top scorers de esta ronda
    const scorersThisRound = Object.keys(results.playerResults)
      .map(playerId => ({
        playerId,
        name: this.players[playerId].name,
        points: results.playerResults[playerId].points
      }))
      .filter(p => p.points > 0)
      .sort((a, b) => b.points - a.points)
      .slice(0, 3);

    results.topScorers = scorersThisRound;

    this.status = 'showing-results';
    return results;
  }

  // Obtener scoreboard
  getScoreboard() {
    if (this.mode === 'individual') {
      return Object.keys(this.players)
        .map(playerId => ({
          playerId,
          name: this.players[playerId].name,
          score: this.players[playerId].score
        }))
        .sort((a, b) => b.score - a.score);
    } else {
      // Modo equipos
      return Object.keys(this.teams)
        .map(teamName => ({
          teamName,
          score: this.teams[teamName].score,
          members: this.teams[teamName].members.map(playerId => ({
            name: this.players[playerId].name,
            score: this.players[playerId].score
          }))
        }))
        .sort((a, b) => b.score - a.score);
    }
  }

  // Agregar jugador
  addPlayer(playerId, name, team = null) {
    if (this.status !== 'lobby') {
      return { success: false, error: 'El juego ya comenzó' };
    }

    this.players[playerId] = {
      name,
      team,
      score: 0,
      answerHistory: [],
      connected: true
    };

    if (team && this.teams[team]) {
      this.teams[team].members.push(playerId);
    }

    return { success: true, playerId };
  }

  // Remover jugador
  removePlayer(playerId) {
    const player = this.players[playerId];
    if (player && player.team && this.teams[player.team]) {
      const index = this.teams[player.team].members.indexOf(playerId);
      if (index > -1) {
        this.teams[player.team].members.splice(index, 1);
      }
    }
    delete this.players[playerId];
  }

  // Marcar jugador como desconectado
  disconnectPlayer(playerId) {
    if (this.players[playerId]) {
      this.players[playerId].connected = false;
    }
  }

  // Reconectar jugador
  reconnectPlayer(playerId) {
    if (this.players[playerId]) {
      this.players[playerId].connected = true;
      return { success: true, player: this.players[playerId] };
    }
    return { success: false, error: 'Jugador no encontrado' };
  }

  // Obtener lista de jugadores
  getPlayers() {
    return Object.keys(this.players).map(playerId => ({
      playerId,
      name: this.players[playerId].name,
      team: this.players[playerId].team,
      connected: this.players[playerId].connected
    }));
  }

  // Obtener cuántos han respondido
  getAnswerCount() {
    if (!this.currentQuestion) return 0;
    return Object.keys(this.currentQuestion.answers).length;
  }

  // Verificar si todos respondieron
  allPlayersAnswered() {
    if (!this.currentQuestion) return false;
    const connectedPlayers = Object.keys(this.players).filter(
      playerId => this.players[playerId].connected
    );
    return this.getAnswerCount() >= connectedPlayers.length;
  }
}

module.exports = GameState;
