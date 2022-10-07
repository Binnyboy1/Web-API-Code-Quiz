// variables to keep track of quiz state
    // currentQuestion
var currentQuestion = 0;
    // time
var time = 75;
    // timerId
var timerId = document.querySelector('#timerId');

var finalTime;

// variables to reference DOM elements
var questionsEl = document.querySelector('#questions');
var endScreenEl = document.querySelector('#end-screen');
var choicesEl = document.querySelector('.choices');
var startEl = document.querySelector('.start');
var startButton = document.querySelector(".start-button");
var initialsEl = document.querySelector('#initials');
var submitButton = document.querySelector('#submit');
var finalScore = document.querySelector('#final-score');


/* FUNCTION TO START THE QUIZ */
function startQuiz() {
    // hide start screen
    startEl.setAttribute("style", "display: none;");

    // un-hide questions section
    questionsEl.setAttribute("style", "display: block;");

    // start timer
    clockTick();

    // show starting time
    timerId.textContent = "Time: " + time;

    getQuestions();
}

/* FUNCTION TO GET/SHOW EACH QUESTION */
function getQuestions() {
    // get current question object from array
    var currentQ = questions[currentQuestion];

    // update title with current question
    document.querySelector("#question-title").textContent = currentQ.title;

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices
    for (var i = 0; i < currentQ.choices.length; i++) {
        choicesEl.innerHTML += `<button> ${ currentQ.choices[i] } </button>`;
    }

    return;
}

/* FUNCTION FOR CLICKING A QUESTION */
function questionClick(event) {
    // retrieving answer
    var questionAnswer = questions[currentQuestion].answer;

    // if the clicked element is not a choice button, do nothing.
    if (event.target.nodeName !== "BUTTON") {
        return;
    }

    // check if user guessed wrong
    if (event.target.innerText !== questionAnswer) {
        // penalize time
        time -= 10;

        // display new time on page
        timerId.textContent = "Time: " + time;

        // give them feedback, letting them know it's wrong
        console.log("wrong");
    } else {
        // give them feedback, letting them know it's right
        console.log("right");
    }

    // flash right/wrong feedback on page for a short period of time

    // move to next question
    currentQuestion++;

    // check if we've run out of questions
        // if so, end the quiz
    if (questions.length === currentQuestion) {
        quizEnd();
        console.log("end");
    } 
        // else, get the next question 
    else {
        getQuestions();
    } 

    return;
}

/* FUNCTION TO END THE QUIZ */
function quizEnd() {
    // stop timer
    finalTime = time;
    time = 0;
    timerId.textContent = "Time: " + finalTime;

    // show end screen
    endScreenEl.setAttribute("style", "display: block;");

    // show final score
    finalScore.textContent = finalTime;

    // hide questions section
    questionsEl.setAttribute("style", "display: none;");
}

/* FUNCTION FOR UPDATING THE TIME */
function clockTick() {
    // update time
    var timer = setInterval(function () {
        if(time !== 0) {
            time--;
            timerId.textContent = "Time: " + time;
        }
    }, 1000);

    // check if user ran out of time
    if(time === 0) {
        clearInterval(timer);
        quizEnd();
    }
}

function saveHighscore() {
    // get value of input box - for initials
    console.log(initialsEl.value);

    // make sure value wasn't empty
    if (initialsEl.value !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var prevList = JSON.parse(localStorage.getItem("highscores"));

        // format new score object for current user
        var highscores = {
            names: initialsEl.value,
            scores: finalTime
        }

        // save to local storage
        if (prevList === null) {
            localStorage.setItem("highscores", JSON.stringify(highscores));
        } else if (prevList.length > 1) {
            localStorage.setItem("highscores", JSON.stringify([...prevList, highscores]));
            // Learned from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        } else {
            localStorage.setItem("highscores", JSON.stringify([prevList, highscores]));
        }

        // redirect to next page
        setTimeout(function() {
            location.href = "./highscores.html";
        }, 2000);
    }
}

/* CLICK EVENTS */
    // user clicks button to submit initials
submitButton.addEventListener("click", saveHighscore);
    // user clicks button to start quiz
startButton.addEventListener("click", startQuiz);
    // user clicks on element containing choices
choicesEl.addEventListener("click", questionClick);