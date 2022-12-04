import qestions from "./questions";
let askedQueIndex = 0;

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

function startQuiz() {
  hideDiv("start-screen");
  showDiv("questions");
}

function iterateQuestion() {}
