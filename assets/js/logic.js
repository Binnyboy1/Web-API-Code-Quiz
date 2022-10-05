// variables to keep track of quiz state
    // currentQuestion
var currentQuestion = 0;
    // time
var time;
    // timerId
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var choicesEl = document.getElementById('choices');
var startEl = document.querySelector('.start');
var startButton = document.querySelector(".start-button");


/* FUNCTION TO START THE QUIZ */
function startQuiz() {
    // hide start screen
    startEl.setAttribute("style", "display: none;")

    // un-hide questions section
    questionsEl.setAttribute("style", "display: block;")

    // start timer

    // show starting time

    getQuestions();
}

/* FUNCTION TO GET/SHOW EACH QUESTION */
function getQuestions() {
    // get current question object from array
    localStorage.setItem("questionList", JSON.stringify(questions));
    var questionArr = JSON.parse(localStorage.getItem("questionList"));

    // update title with current question
    document.querySelector("#question-title").textContent = questionArr[currentQuestion].title;
    console.log(questionArr[currentQuestion].choices.length);

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices
    for (var i = 0; i < questionArr[currentQuestion].choices.length; i++) {
        choicesEl.innerHTML += `<button> ${ questionArr[currentQuestion].choices[i] } </button>`;
    }
}

/* FUNCTION FOR CLICKING A QUESTION */
function questionClick(event) {

    // if the clicked element is not a choice button, do nothing.
    if (something) {

    }

    // check if user guessed wrong
    if (something) {
        // penalize time

        // display new time on page

        // give them feedback, letting them know it's wrong
    } else {
        // give them feedback, letting them know it's right
    }

    // flash right/wrong feedback on page for a short period of time

    // move to next question

    // check if we've run out of questions
        // if so, end the quiz
        // else, get the next question    
}

/* FUNCTION TO END THE QUIZ */
function quizEnd() {
    // stop timer

    // show end screen

    // show final score

    // hide questions section
}

/* FUNCTION FOR UPDATING THE TIME */
function clockTick() {
    // update time

    // check if user ran out of time
}

function saveHighscore() {
    // get value of input box - for initials

    // make sure value wasn't empty
        // get saved scores from localstorage, or if not any, set to empty array

        // format new score object for current user

        // save to local storage

        // redirect to next page
}

/* CLICK EVENTS */
    // user clicks button to submit initials

    // user clicks button to start quiz
startButton.addEventListener("click", startQuiz);
    // user clicks on element containing choices