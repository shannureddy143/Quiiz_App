// Quiz Questions
const questions = [
  {
    question: "Which language is used for web apps?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: 1
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Sheet",
      "Colorful Style Syntax"
    ],
    answer: 0
  },
  {
    question: "Which tag is used to include JavaScript in HTML?",
    options: ["<js>", "<script>", "<code>", "<link>"],
    answer: 1
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Sun Microsystems", "Netscape", "Oracle"],
    answer: 2
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  options.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.classList.remove("selected");
  });
  selectedOption = null;
}

function selectOption(index) {
  options.forEach(btn => btn.classList.remove("selected"));
  options[index].classList.add("selected");
  selectedOption = index;
}

function nextQuestion() {
  if (selectedOption === null) {
    alert("Please select an answer!");
    return;
  }

  if (selectedOption === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
}

// Load first question
loadQuestion();
