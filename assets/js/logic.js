import { questionList } from "./questions.js";

const questionH2 = document.getElementById("question-title");
const choisesDiv = document.getElementById("choices");
const feedbackDiv = document.getElementById("feedback");
const startQuizBtn = document.getElementById("start");
const finalScore = document.getElementById("final-score");
const submitBtn = document.getElementById("submit");

let timerID = undefined;
let remainingTime = 75;
let currentQuestion = 0;

function showDiv(divID) {
  let targetDiv = document.getElementById(divID);
  let classList = targetDiv.classList;
  classList.remove("hide");
}

function hideDiv(divID) {
  let targetDiv = document.getElementById(divID);
  targetDiv.setAttribute("class", "hide feedback");
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
  currentQuestion++;
}

function userSelectionHandler(e) {
  if (currentQuestion < questionList.length) {
    const userChoise = e.target.innerText;
    const correctAnswer = questionList[currentQuestion - 1].answer;
    if (userChoise === correctAnswer) {
      correctAnswerRoutine();
    } else {
      wrongAnswerRoutine();
    }
    questionH2.innerHTML = ""; //Clear previous question.
    choisesDiv.innerHTML = ""; //Clear previous choises.
    renderQuestion(questionList[currentQuestion]);
  } else {
    finalScore.textContent = remainingTime;
    showDiv("feedback");
    hideDiv("questions");
    showDiv("end-screen");
    document;
    setTimeout(function () {
      hideDiv("feedback");
    }, 2000);
    clearInterval(timerID);
  }
}

function correctAnswerRoutine() {
  showDiv("feedback");
  feedbackDiv.textContent = "Correct!";
  const audio = new Audio("/starter/assets/sfx/correct.wav");
  audio.play();
  setTimeout(function () {
    hideDiv("feedback");
  }, 2000);
}

function wrongAnswerRoutine() {
  remainingTime -= 15;
  showDiv("feedback");
  feedbackDiv.textContent = "Wrong!";
  const audio = new Audio("/starter/assets/sfx/incorrect.wav");
  audio.play();
  setTimeout(function () {
    hideDiv("feedback");
  }, 2000);
}

function startTimer() {
  timerID = setInterval(function () {
    if (remainingTime > 0) {
      remainingTime--;
      document.getElementById("time").textContent = remainingTime;
    }
  }, 1000);
}

function submitBtnEventHandler() {
  const initials = document.getElementById("initials").value;
  syncWithLocalStorage(initials, remainingTime);
}

function syncWithLocalStorage(initials, userScore) {
  if (!localStorage.getItem("highScores")) {
    let highScores = {
      [`${initials}`]: userScore,
    };
    localStorage.setItem("highScores", JSON.stringify(highScores));
  } else {
    let highScores = JSON.parse(localStorage.getItem("highScores"));
    highScores[initials] = userScore;
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}

function loadFromLocalStorage() {
  
}

function startQuiz() {
  startTimer();
  hideDiv("start-screen");
  renderQuestion(questionList[currentQuestion]);
}

startQuizBtn.addEventListener("click", startQuiz);
choisesDiv.addEventListener("click", userSelectionHandler);
submitBtn.addEventListener("click", submitBtnEventHandler);
