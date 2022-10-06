// variables to keep track of quiz state
    // currentQuestion
var currentQuestion = 0;
    // time
var time = 0;
    // timerId
var timerId;

// variables to reference DOM elements
var questionsEl = document.querySelector('#questions');
var endScreenEl = document.querySelector('#end-screen');
var choicesEl = document.querySelector('.choices');
var startEl = document.querySelector('.start');
var startButton = document.querySelector(".start-button");
var initialsEl = document.querySelector('#initials');
var submitButton = document.querySelector('#submit');


/* FUNCTION TO START THE QUIZ */
function startQuiz() {
    // hide start screen
    startEl.setAttribute("style", "display: none;");

    // un-hide questions section
    questionsEl.setAttribute("style", "display: block;");

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

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices
    for (var i = 0; i < questionArr[currentQuestion].choices.length; i++) {
        choicesEl.innerHTML += `<button> ${ questionArr[currentQuestion].choices[i] } </button>`;
    }

    return;
}

/* FUNCTION FOR CLICKING A QUESTION */
function questionClick(event) {
    // retrieving answer
    localStorage.setItem("questionList", JSON.stringify(questions));
    var questionArr = JSON.parse(localStorage.getItem("questionList"));
    var questionAnswer = questionArr[currentQuestion].answer;

    // if the clicked element is not a choice button, do nothing.
    if (event.target.nodeName !== "BUTTON") {
        return;
    }

    // check if user guessed wrong
    if (event.target.innerText !== questionAnswer) {
        // penalize time
        console.log("wrong");
        // display new time on page

        // give them feedback, letting them know it's wrong
    } else {
        // give them feedback, letting them know it's right
        console.log("right");
    }

    // flash right/wrong feedback on page for a short period of time

    // move to next question
    currentQuestion++;

    // check if we've run out of questions
        // if so, end the quiz
    if (questionArr.length === currentQuestion) {
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

    // show end screen
    endScreenEl.setAttribute("style", "display: block;");

    // show final score

    // hide questions section
    questionsEl.setAttribute("style", "display: none;");
}

/* FUNCTION FOR UPDATING THE TIME */
function clockTick() {
    // update time

    // check if user ran out of time
}

function saveHighscore() {
    // get value of input box - for initials
    console.log(initialsEl.value);

    // make sure value wasn't empty
    if (initialsEl.value !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var names = [];
        var scores = [];
        var prevNames = localStorage.getItem("names");
        var prevScores = localStorage.getItem("scores");

        if (prevNames !== null) {
            names.push(localStorage.getItem("names"));
        }
        if (prevScores !== null) {
            scores.push(localStorage.getItem("scores"));
        }

        // format new score object for current user
        names.push(initialsEl.value);
        scores.push(time);

        // save to local storage
        localStorage.setItem("names", names);
        localStorage.setItem("scores", scores);

        // redirect to next page
        console.log(names);
        console.log(scores);
    }
}

/* CLICK EVENTS */
    // user clicks button to submit initials
submitButton.addEventListener("click", saveHighscore);
    // user clicks button to start quiz
startButton.addEventListener("click", startQuiz);
    // user clicks on element containing choices
choicesEl.addEventListener("click", questionClick);