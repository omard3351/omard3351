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
