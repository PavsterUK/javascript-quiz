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

//Renders passed quesion object.
function renderQuestion(question) {
  questionH2.innerHTML = ""; //Clear previous questio text.
  choisesDiv.innerHTML = ""; //Clear previous choises.
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
  showElement("questions");
  currentQuestion++;
}

//Function triggered when user selects one of options.
function userSelectionHandler(e) {
  if (currentQuestion < questionList.length) {
    const userChoise = e.target.innerText;
    const correctAnswer = questionList[currentQuestion - 1].answer;
    if (userChoise === correctAnswer) {
      correctAnswerRoutine();
    } else {
      wrongAnswerRoutine();
    }
    renderQuestion(questionList[currentQuestion]);
  } else {
    quizEndRoutine();
  }
}

//Function to prompt user to enter initials and save score.
function quizEndRoutine() {
  finalScore.textContent = remainingTime;
  showElement("feedback");
  hideElement("questions");
  showElement("end-screen");
  setTimeout(function () {
    hideElement("feedback");
  }, 2000);
  clearInterval(timerID);
}

function correctAnswerRoutine() {
  showElement("feedback");
  feedbackDiv.textContent = "Correct!";
  const audio = new Audio("/starter/assets/sfx/correct.wav");
  audio.play();
  setTimeout(function () {
    hideElement("feedback");
  }, 2000);
}

function wrongAnswerRoutine() {
  remainingTime -= 15;
  showElement("feedback");
  feedbackDiv.textContent = "Wrong!";
  const audio = new Audio("/starter/assets/sfx/incorrect.wav");
  audio.play();
  setTimeout(function () {
    hideElement("feedback");
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

//Function to update local storage with latest scores.
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

//Function to start quiz.
function startQuiz() {
  startTimer();
  hideElement("start-screen");
  renderQuestion(questionList[currentQuestion]);
}

function submitBtnEventHandler() {
  const initials = document.getElementById("initials").value;
  syncWithLocalStorage(initials, remainingTime);
  window.location.href = "highscores.html";
}

startQuizBtn.addEventListener("click", startQuiz);
choisesDiv.addEventListener("click", userSelectionHandler);
submitBtn.addEventListener("click", submitBtnEventHandler);
