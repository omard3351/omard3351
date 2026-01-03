// Banco de preguntas de Stranger Things
// Apropiadas para niños de 9 años - enfoque en elementos divertidos y reconocibles

const allQuestions = [
  {
    id: 1,
    question: "¿Cuál es el nombre del pueblo donde viven los protagonistas?",
    options: [
      { id: "A", text: "Hawkins" },
      { id: "B", text: "Springfield" },
      { id: "C", text: "Riverdale" },
      { id: "D", text: "Derry" }
    ],
    correctAnswer: "A",
    difficulty: "easy",
    category: "lugares"
  },
  {
    id: 2,
    question: "¿Cuál es la comida favorita de Eleven?",
    options: [
      { id: "A", text: "Pizza" },
      { id: "B", text: "Waffles Eggo" },
      { id: "C", text: "Hamburguesas" },
      { id: "D", text: "Tacos" }
    ],
    correctAnswer: "B",
    difficulty: "easy",
    category: "personajes"
  },
  {
    id: 3,
    question: "¿Cómo se llama el mundo oscuro y terrorífico?",
    options: [
      { id: "A", text: "El Abismo" },
      { id: "B", text: "La Dimensión Oscura" },
      { id: "C", text: "El Upside Down (Mundo del Revés)" },
      { id: "D", text: "El Inframundo" }
    ],
    correctAnswer: "C",
    difficulty: "easy",
    category: "lugares"
  },
  {
    id: 4,
    question: "¿Qué poderes especiales tiene Eleven?",
    options: [
      { id: "A", text: "Volar y super fuerza" },
      { id: "B", text: "Telequinesis y telepatía" },
      { id: "C", text: "Invisibilidad" },
      { id: "D", text: "Super velocidad" }
    ],
    correctAnswer: "B",
    difficulty: "easy",
    category: "personajes"
  },
  {
    id: 5,
    question: "¿Cómo se comunica Joyce con Will cuando está atrapado?",
    options: [
      { id: "A", text: "Con un teléfono" },
      { id: "B", text: "Con luces de Navidad" },
      { id: "C", text: "Con señales de humo" },
      { id: "D", text: "Con un walkie-talkie" }
    ],
    correctAnswer: "B",
    difficulty: "medium",
    category: "momentos"
  },
  {
    id: 6,
    question: "¿Qué juego de mesa les gusta jugar a los chicos?",
    options: [
      { id: "A", text: "Monopoly" },
      { id: "B", text: "Ajedrez" },
      { id: "C", text: "Dungeons & Dragons" },
      { id: "D", text: "Scrabble" }
    ],
    correctAnswer: "C",
    difficulty: "easy",
    category: "objetos"
  },
  {
    id: 7,
    question: "¿Cómo se llama el hermano mayor de Mike?",
    options: [
      { id: "A", text: "Steve" },
      { id: "B", text: "Jonathan" },
      { id: "C", text: "Billy" },
      { id: "D", text: "No tiene hermano mayor" }
    ],
    correctAnswer: "D",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 8,
    question: "¿Qué criatura atacó a los chicos en la primera temporada?",
    options: [
      { id: "A", text: "El Demogorgon" },
      { id: "B", text: "El Mind Flayer" },
      { id: "C", text: "Vecna" },
      { id: "D", text: "Un dragón" }
    ],
    correctAnswer: "A",
    difficulty: "easy",
    category: "criaturas"
  },
  {
    id: 9,
    question: "¿En qué década se desarrolla la historia de Stranger Things?",
    options: [
      { id: "A", text: "Los años 70" },
      { id: "B", text: "Los años 80" },
      { id: "C", text: "Los años 90" },
      { id: "D", text: "Los años 2000" }
    ],
    correctAnswer: "B",
    difficulty: "easy",
    category: "lugares"
  },
  {
    id: 10,
    question: "¿Cómo se llama el jefe de policía de Hawkins?",
    options: [
      { id: "A", text: "Jim Hopper" },
      { id: "B", text: "Bob Newby" },
      { id: "C", text: "Murray Bauman" },
      { id: "D", text: "Martin Brenner" }
    ],
    correctAnswer: "A",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 11,
    question: "¿Qué usan los chicos para comunicarse cuando están lejos?",
    options: [
      { id: "A", text: "Teléfonos celulares" },
      { id: "B", text: "Walkie-talkies" },
      { id: "C", text: "Telegrama" },
      { id: "D", text: "Señales de luz" }
    ],
    correctAnswer: "B",
    difficulty: "easy",
    category: "objetos"
  },
  {
    id: 12,
    question: "¿Qué número tenía Eleven en el laboratorio?",
    options: [
      { id: "A", text: "Número 7" },
      { id: "B", text: "Número 8" },
      { id: "C", text: "Número 11" },
      { id: "D", text: "Número 1" }
    ],
    correctAnswer: "C",
    difficulty: "easy",
    category: "personajes"
  },
  {
    id: 13,
    question: "¿Dónde trabaja Steve en la tercera temporada?",
    options: [
      { id: "A", text: "En una librería" },
      { id: "B", text: "En Scoops Ahoy (heladería)" },
      { id: "C", text: "En un cine" },
      { id: "D", text: "En un restaurante" }
    ],
    correctAnswer: "B",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 14,
    question: "¿Quién es el mejor amigo de Will Byers?",
    options: [
      { id: "A", text: "Lucas" },
      { id: "B", text: "Dustin" },
      { id: "C", text: "Mike" },
      { id: "D", text: "Todos son sus mejores amigos" }
    ],
    correctAnswer: "D",
    difficulty: "easy",
    category: "personajes"
  },
  {
    id: 15,
    question: "¿Cómo se llama la mamá de Mike?",
    options: [
      { id: "A", text: "Joyce" },
      { id: "B", text: "Karen" },
      { id: "C", text: "Nancy" },
      { id: "D", text: "Barbara" }
    ],
    correctAnswer: "B",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 16,
    question: "¿Qué le gusta coleccionar a Dustin?",
    options: [
      { id: "A", text: "Cómics" },
      { id: "B", text: "Insectos y criaturas" },
      { id: "C", text: "Carros de juguete" },
      { id: "D", text: "Estampillas" }
    ],
    correctAnswer: "B",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 17,
    question: "¿Cómo se llama la hermana de Nancy?",
    options: [
      { id: "A", text: "Erica" },
      { id: "B", text: "Max" },
      { id: "C", text: "Holly" },
      { id: "D", text: "Robin" }
    ],
    correctAnswer: "C",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 18,
    question: "¿Qué deporte practica Lucas?",
    options: [
      { id: "A", text: "Fútbol" },
      { id: "B", text: "Béisbol" },
      { id: "C", text: "Básquetbol" },
      { id: "D", text: "Natación" }
    ],
    correctAnswer: "C",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 19,
    question: "¿Qué le gusta usar a Dustin en la cabeza?",
    options: [
      { id: "A", text: "Una gorra de béisbol" },
      { id: "B", text: "Un gorro con orejas" },
      { id: "C", text: "Una bandana" },
      { id: "D", text: "Nada, no usa nada" }
    ],
    correctAnswer: "B",
    difficulty: "easy",
    category: "personajes"
  },
  {
    id: 20,
    question: "¿Cómo se llama el centro comercial en la tercera temporada?",
    options: [
      { id: "A", text: "Hawkins Mall" },
      { id: "B", text: "Starcourt Mall" },
      { id: "C", text: "Upside Mall" },
      { id: "D", text: "Stranger Mall" }
    ],
    correctAnswer: "B",
    difficulty: "medium",
    category: "lugares"
  },
  {
    id: 21,
    question: "¿Cómo se llama la hermana de Eleven?",
    options: [
      { id: "A", text: "Diez" },
      { id: "B", text: "Ocho" },
      { id: "C", text: "Nueve" },
      { id: "D", text: "Siete" }
    ],
    correctAnswer: "B",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 22,
    question: "¿Qué le gusta comer a Dustin que encuentra en la basura?",
    options: [
      { id: "A", text: "Chocolate" },
      { id: "B", text: "Nuggets" },
      { id: "C", text: "3 Musketeers (barra de chocolate)" },
      { id: "D", text: "Hot dogs" }
    ],
    correctAnswer: "C",
    difficulty: "medium",
    category: "objetos"
  },
  {
    id: 23,
    question: "¿Cómo se llama la mamá de Will y Jonathan?",
    options: [
      { id: "A", text: "Karen" },
      { id: "B", text: "Joyce" },
      { id: "C", text: "Claudia" },
      { id: "D", text: "Susan" }
    ],
    correctAnswer: "B",
    difficulty: "easy",
    category: "personajes"
  },
  {
    id: 24,
    question: "¿Qué color de pelo tiene Max?",
    options: [
      { id: "A", text: "Rubio" },
      { id: "B", text: "Negro" },
      { id: "C", text: "Rojo/Pelirrojo" },
      { id: "D", text: "Castaño" }
    ],
    correctAnswer: "C",
    difficulty: "easy",
    category: "personajes"
  },
  {
    id: 25,
    question: "¿Qué le gusta mucho a Hopper?",
    options: [
      { id: "A", text: "Café y donas" },
      { id: "B", text: "Pizza" },
      { id: "C", text: "Ensaladas" },
      { id: "D", text: "Frutas" }
    ],
    correctAnswer: "A",
    difficulty: "easy",
    category: "personajes"
  },
  {
    id: 26,
    question: "¿Cómo le llaman los chicos a Eleven de cariño?",
    options: [
      { id: "A", text: "Ellie" },
      { id: "B", text: "El" },
      { id: "C", text: "Eve" },
      { id: "D", text: "Once" }
    ],
    correctAnswer: "B",
    difficulty: "easy",
    category: "personajes"
  },
  {
    id: 27,
    question: "¿Qué animal adopta Dustin como mascota?",
    options: [
      { id: "A", text: "Un gato" },
      { id: "B", text: "Un perro" },
      { id: "C", text: "Dart (una criatura del Upside Down)" },
      { id: "D", text: "Un hámster" }
    ],
    correctAnswer: "C",
    difficulty: "medium",
    category: "criaturas"
  },
  {
    id: 28,
    question: "¿Qué es lo primero que Eleven aprende a decir?",
    options: [
      { id: "A", text: "Hola" },
      { id: "B", text: "No" },
      { id: "C", text: "Mike" },
      { id: "D", text: "Waffles" }
    ],
    correctAnswer: "B",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 29,
    question: "¿Cómo se llama el hermano de Max?",
    options: [
      { id: "A", text: "Steve" },
      { id: "B", text: "Billy" },
      { id: "C", text: "Troy" },
      { id: "D", text: "Jason" }
    ],
    correctAnswer: "B",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 30,
    question: "¿Qué arma usa Hopper para defenderse?",
    options: [
      { id: "A", text: "Una espada" },
      { id: "B", text: "Un bate de béisbol" },
      { id: "C", text: "Una pistola y un rifle" },
      { id: "D", text: "Una resortera" }
    ],
    correctAnswer: "C",
    difficulty: "easy",
    category: "objetos"
  },
  {
    id: 31,
    question: "¿Qué arma usa Steve para pelear?",
    options: [
      { id: "A", text: "Una espada" },
      { id: "B", text: "Un bate de béisbol con clavos" },
      { id: "C", text: "Una pistola" },
      { id: "D", text: "Sus puños" }
    ],
    correctAnswer: "B",
    difficulty: "easy",
    category: "objetos"
  },
  {
    id: 32,
    question: "¿Cuál es el apodo de Will cuando está poseído?",
    options: [
      { id: "A", text: "Will el Sabio" },
      { id: "B", text: "Zombie Boy" },
      { id: "C", text: "El Elegido" },
      { id: "D", text: "Will el Valiente" }
    ],
    correctAnswer: "A",
    difficulty: "medium",
    category: "personajes"
  },
  {
    id: 33,
    question: "¿Qué vehículo usa Hopper?",
    options: [
      { id: "A", text: "Una camioneta roja" },
      { id: "B", text: "Una patrulla de policía" },
      { id: "C", text: "Una motocicleta" },
      { id: "D", text: "Un auto deportivo" }
    ],
    correctAnswer: "B",
    difficulty: "easy",
    category: "objetos"
  },
  {
    id: 34,
    question: "¿Qué actividad le gusta mucho a Mike y Will?",
    options: [
      { id: "A", text: "Fútbol" },
      { id: "B", text: "Dibujar y jugar D&D" },
      { id: "C", text: "Nadar" },
      { id: "D", text: "Cantar" }
    ],
    correctAnswer: "B",
    difficulty: "easy",
    category: "personajes"
  },
  {
    id: 35,
    question: "¿Cómo se llama la amiga de Steve que trabaja con él en la heladería?",
    options: [
      { id: "A", text: "Nancy" },
      { id: "B", text: "Robin" },
      { id: "C", text: "Max" },
      { id: "D", text: "Erica" }
    ],
    correctAnswer: "B",
    difficulty: "medium",
    category: "personajes"
  }
];

// Función para seleccionar 15 preguntas aleatorias
function getRandomQuestions(count = 15) {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Función para validar respuesta
function isCorrectAnswer(questionId, answerId) {
  const question = allQuestions.find(q => q.id === questionId);
  return question && question.correctAnswer === answerId;
}

module.exports = {
  allQuestions,
  getRandomQuestions,
  isCorrectAnswer
};
