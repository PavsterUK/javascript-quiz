import { questions } from "./questions.js";
let remainingTime = 76;

let startQuizButn = document.getElementById("start");
startQuizButn.addEventListener("click", startQuiz);

function showDiv(divID) {
  let targetDiv = document.getElementById(divID);
  let classList = targetDiv.classList;
  classList.remove("hide");
}

function hideDiv(divID) {
  let targetDiv = document.getElementById(divID);
  targetDiv.setAttribute("class", "hide");
}

function showQuestReturnAnsw(questionObj) {
  showDiv("questions");
  let questionDiv = document.getElementById("question-title");
  let questionText = document.createTextNode(questionObj.question);
  questionDiv.appendChild(questionText);

  let optionsDiv = document.getElementById("choices");
  const ol = document.createElement("ol");
  ol.setAttribute("id", "ol");
  let orderedList = document.getElementById("ol");
  
  for (const option of questionObj.options) {
    let optionText = document.createTextNode(option);
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.appendChild(optionText);
    li.appendChild(btn);
    ol.appendChild(li);
  }
  optionsDiv.appendChild(ol);
}

function startLoop() {
  setInterval(function () {
    if (remainingTime > 0) {
      remainingTime--;
      document.getElementById("time").textContent = remainingTime;
    }
  }, 1000);
}

function startQuiz() {
  hideDiv("start-screen");
  startLoop();
  showQuestReturnAnsw(questions[0]);
}
