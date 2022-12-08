import { questionList } from "./questions.js";

const questionWrapper = document.getElementById("questions");
const questionH2 = document.getElementById("question-title");
const choisesDiv = document.getElementById("choices");
const startQuizBtn = document.getElementById("start");
let remainingTime = 75;
let currentQuestion = 0;

function showDiv(divID) {
  let targetDiv = document.getElementById(divID);
  let classList = targetDiv.classList;
  classList.remove("hide");
}

function hideDiv(divID) {
  let targetDiv = document.getElementById(divID);
  targetDiv.setAttribute("class", "hide");
}

function renderQuestion(question) {
  const ol = document.createElement("ol");
  questionH2.appendChild(document.createTextNode(question.text));
  for (let choise of question.choises) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.appendChild(document.createTextNode(choise));
    li.appendChild(btn);
    ol.appendChild(li);
  }
  choisesDiv.appendChild(ol);
  showDiv("questions");
}

function checkAnswer(e) {
  const userChoise = e.target.innerText;
  const correctAnswer = questionList[currentQuestion].answer;
  if (userChoise === correctAnswer) {
    correctAnswerRoutine();
  }
}

function correctAnswerRoutine() {
  showDiv("feedback");
  const audio = new Audio("../sfx/correct.wav");
  audio.play();
}

function wrongAnswer() {}

function startTimer() {
  setInterval(function () {
    if (remainingTime > 0) {
      remainingTime--;
      document.getElementById("time").textContent = remainingTime;
    }
  }, 1000);
}

function startQuiz() {
  startTimer();
  hideDiv("start-screen");
  renderQuestion(questionList[currentQuestion]);
}

startQuizBtn.addEventListener("click", startQuiz);
choisesDiv.addEventListener("click", checkAnswer);
