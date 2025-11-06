let questions = JSON.parse(localStorage.getItem("questions")) || [
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: 2
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language"
    ],
    answer: 1
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Microsoft", "Google", "IBM"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let timerInterval;
let timeLeft = 30;
let username = "";

function startQuiz() {
  username = document.getElementById("username").value.trim();
  if (!username) return alert("Please enter your name!");

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  document.getElementById("welcome").textContent = "Hi, " + username + " 👋";
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.onclick = () => selectOption(i, btn);
    optionsContainer.appendChild(btn);
  });

  updateProgress();
}

function selectOption(index, btn) {
  document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
  btn.classList.add("selected");
  btn.dataset.selected = index;
}

function nextQuestion() {
  const selected = document.querySelector(".option.selected");
  if (!selected) return alert("Please select an answer!");

  const answerIndex = parseInt(selected.dataset.selected);
  if (answerIndex === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    resetTimer();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeLeft = 30;
  document.getElementById("timer").textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  startTimer();
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("result").textContent = `${username}, you scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  loadQuestion();
  resetTimer();
}

function showAddQuestion() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("add-screen").classList.remove("hidden");
}

function backToStart() {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById("start-screen").classList.remove("hidden");
}

function addQuestion() {
  const q = document.getElementById("newQuestion").value.trim();
  const opt1 = document.getElementById("opt1").value.trim();
  const opt2 = document.getElementById("opt2").value.trim();
  const opt3 = document.getElementById("opt3").value.trim();
  const opt4 = document.getElementById("opt4").value.trim();
  const correct = parseInt(document.getElementById("correct").value) - 1;

  if (!q || !opt1 || !opt2 || !opt3 || !opt4 || isNaN(correct) || correct < 0 || correct > 3) {
    return alert("Please fill all fields correctly!");
  }

  const newQuestion = {
    question: q,
    options: [opt1, opt2, opt3, opt4],
    answer: correct
  };

  questions.push(newQuestion);
  localStorage.setItem("questions", JSON.stringify(questions));

  alert("✅ Question Added Successfully!");
  document.querySelectorAll("#add-screen input").forEach(i => i.value = "");
  backToStart();
}
