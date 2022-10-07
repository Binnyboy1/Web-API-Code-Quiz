var highscoresEl = document.querySelector('#highscores');
var clearButton = document.querySelector('#clear');

function printHighscores() {
    // either get scores from localstorage or set to empty array
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if (highscores === null) {
        highscores = [];
    }

    // sort highscores by score property in descending order
    if (highscores.scores === undefined) {   // When there is only 1 object in the list, highscores.score will register a value, otherwise it will be undefined
        highscores.sort((a, b) => b.scores - a.scores);     // when there is only 1 object in the list, the .sort() operation doesn't work
    }
    // sorted arcade style - if there is a tie, the first to achieve the highscore will be placed higher on the list

    // loop through scores
    highscoresEl.innerHTML = "";
    var cnt = 0;
    for (var item in highscores) {
        cnt++;
        if (item === "names" || item === "scores") {
            if (cnt === 2) {
                highscoresEl.innerHTML += `<li id="transparent-border">${highscores.names}: ${highscores.scores}</li>`;
            }
        } else {
            highscoresEl.innerHTML += `<li id="transparent-border">${highscores[item].names}: ${highscores[item].scores}</li>`;
        }
    }

    return;
}

/* FUNCTION TO CLEAR SCORES */
function clearHighscores() {
    // remove an item from local storage
    localStorage.clear();
    // reload the page
    printHighscores();
}

/* CLICK EVENT TO RUN THE CLEAR SCORES FUNCTION */
clearButton.addEventListener("click", clearHighscores);

// run function when page loads
printHighscores();