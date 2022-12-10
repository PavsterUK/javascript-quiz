const highScoresOL = document.getElementById("highscores");
const clearScoresButton = document.getElementById("clear");

function listAllScores() {
  highScoresOL.innerHTML = "";
  if (localStorage.getItem("highScores")) {
    records = JSON.parse(localStorage.getItem("highScores"));

    for (record in records) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(`${record} - ${records[record]}`));
      highScoresOL.appendChild(li);
    }
  }
}

function clearLocalStorage() {
  localStorage.removeItem("highScores");
  listAllScores();
}

clearScoresButton.addEventListener("click", clearLocalStorage);

listAllScores();
