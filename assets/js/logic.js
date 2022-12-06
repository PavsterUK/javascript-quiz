import { questions } from "./questions.js";

const questionWrapper = document.getElementById("questions");
const questionH2 = document.getElementById("question-title");
const choisesDiv = document.getElementById("choices");
const startQuizBtn = document.getElementById("start");
let remainingTime = 75;

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
  const li = document.createElement("li");
  const btn = document.createElement("button");
  questionH2.appendChild(document.createTextNode(question.text));
  for (let choise of question.choises) {
    btn.appendChild(document.createTextNode(choise));
    li.appendChild(btn);
    ol.appendChild(li);
  }
  choisesDiv.appendChild(ol);
  showDiv("questions");
}

function startTimer() {
  setInterval(function () {
    if (remainingTime > 0) {
      remainingTime--;
      document.getElementById("time").textContent = remainingTime;
    }
  }, 1000);
}

function askQuestion(question) {
  setInterval(function () {}, remainingTime * 1000);
}

function startQuiz() {
  startTimer();
  hideDiv("start-screen");
  renderQuestion(questions[0]);
}

startQuizBtn.addEventListener("click", startQuiz);
