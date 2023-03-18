import { questionList } from "./questions.js";

const questionText = document.getElementById("question-title");
const choisesDiv = document.getElementById("choices");
const feedbackDiv = document.getElementById("feedback");
const startQuizBtn = document.getElementById("start");
const finalScore = document.getElementById("final-score");
const submitBtn = document.getElementById("submit");

let timerID = undefined;
let remainingTime = 76;
let currentQuestion = 0;

//Function to make an element visible, removes "hide" class.
function showElement(ElementID) {
  let targetDiv = document.getElementById(ElementID);
  let classList = targetDiv.classList;
  classList.remove("hide");
}

//Function to make an element invisible, adds "hide" class.
function hideElement(ElementID) {
  let targetDiv = document.getElementById(ElementID);
  targetDiv.setAttribute("class", "hide feedback");
}

//Function to start quiz.
function startQuiz() {
  intevLoopFn();
  hideElement("start-screen");
  showElement("questions");
  renderQuestion(questionList[currentQuestion]);
}

//Renders passed question object.
function renderQuestion(question) {
  if (currentQuestion === questionList.length) {
    endQuiz();
    return;
  }

  questionText.innerText = question.text;
  choisesDiv.innerHTML = ""; //Clear previous choises.

  question.choises.forEach((choise, index) => {
    choisesDiv.insertAdjacentHTML(
      "beforeend",
      `<div id="choise-${index}" class="choise"><button> 
        ${choise}
      </button></div>`
    );
  });
}

//Function triggered when user selects one of options.
function checkAnswer(e) {
  const userChoise = e.target.innerText;
  const correctAnswer = questionList[currentQuestion].answer;

  userChoise.includes(correctAnswer)
    ? correctAnswerRoutine()
    : wrongAnswerRoutine();

  setTimeout(function () {
    currentQuestion++;
    renderQuestion(questionList[currentQuestion]);
  }, 1000);
}

function correctAnswerRoutine() {
  showElement("feedback");
  feedbackDiv.textContent = "Correct!";
  feedbackDiv.style.color = "green";
  const audio = new Audio("assets/sfx/correct.wav");
  audio.play();
  setTimeout(function () {
    hideElement("feedback");
  }, 1000);
}

function wrongAnswerRoutine() {
  decreaseTimer(15);
  showElement("feedback");
  feedbackDiv.textContent = "Wrong!";
  feedbackDiv.style.color = "red";
  const audio = new Audio("assets/sfx/incorrect.wav");
  audio.play();
  setTimeout(function () {
    hideElement("feedback");
  }, 1000);
}

function intevLoopFn() {
  timerID = setInterval(function () {
    decreaseTimer(1);
  }, 1000);
}

function decreaseTimer(decAmount) {
  if (remainingTime > decAmount) {
    remainingTime -= decAmount;
  } else {
    remainingTime = 0;
  }

  if (remainingTime <= 20) {
    document.getElementById("time").style.color = "red";
  }

  document.getElementById("time").textContent = remainingTime;
}

function submitBtnEventHandler() {
  const initials = document.getElementById("initials").value;
  syncWithLocalStorage(initials, remainingTime);
  window.location.href = "highscores.html";
}

//Function to update local storage with latest score.
function syncWithLocalStorage(initials, userScore) {
  if (!localStorage.getItem("highScores")) {
    let highScores = {
      [`${initials}`]: userScore,
    };
    localStorage.setItem("highScores", JSON.stringify(highScores));
  } else {
    let highScores = JSON.parse(localStorage.getItem("highScores"));
    highScores[initials] = userScore; //Add new record.
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}

//Function to prompt user to enter initials and save score.
function endQuiz() {
  finalScore.textContent = remainingTime;
  hideElement("questions");
  showElement("end-screen");
  clearInterval(timerID);
}

startQuizBtn.addEventListener("click", startQuiz);
choisesDiv.addEventListener("click", checkAnswer);
submitBtn.addEventListener("click", submitBtnEventHandler);
