// variables to keep track of quiz state
    // currentQuestion
var currentQuestion = 0;
    // time
var time =  75;
    // timerId
var timerId = document.querySelector('#timerId');

// variables to reference DOM elements
var questionsEl = document.querySelector('#questions');
var endScreenEl = document.querySelector('#end-screen');
var choicesEl = document.querySelector('.choices');
var startEl = document.querySelector('.start');
var startButton = document.querySelector(".start-button");
var submitButton = document.querySelector('#submit');
var finalScore = document.querySelector('#final-score');
var responseEl = document.querySelector('#response');


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
        if (time < 10) {
            time = 0;
        } else {
            time -= 10;
        }

        // display new time on page
        timerId.textContent = "Time: " + time;

        // give them feedback, letting them know it's wrong
        responseEl.innerHTML = '<p>Incorrect</p>';
        responseEl.innerHTML += `<p>Correct answer is: '${questionAnswer.slice(3)}'</p>`;
    } else {
        // give them feedback, letting them know it's right
        responseEl.innerHTML = '<p>Correct</p>';
    }

    // flash right/wrong feedback on page for a short period of time
    responseEl.style.display = 'block';
    responseEl.style.opacity = 1;
    fadeOut(responseEl);

    // move to next question
    currentQuestion++;

    // check if we've run out of questions
        // if so, end the quiz
    if (questions.length === currentQuestion) {
        quizEnd();
    } 
        // else, get the next question 
    else {
        getQuestions(questionAnswer);
    } 

    return;
}

/* FUNCTION TO FADE OUT */
function fadeOut(element) {
    var op = 2;  // initial opacity
    
    setTimeout(function() {
        // wait
    }, 10)

    var timer = setInterval(function () {
        op -= op * 0.01;

        if (op < 0.99 && element.style.opacity == 1) { // if another instance of the function is called -> Quit current instance
            clearInterval(timer);
        } else if (op < 0.025) {  // if opacity reaches 0 -> Quit
            clearInterval(timer);
            element.style.display = 'none';
        }
        
        element.style.opacity = Math.min(op, 1);
    }, 10);
    // Learned the framework for a Fade Out function from https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
}

/* FUNCTION TO END THE QUIZ */
function quizEnd() {
    // show end screen
    endScreenEl.setAttribute("style", "display: block;");

    // show final score
    finalScore.textContent = time;

    // hide questions section
    questionsEl.setAttribute("style", "display: none;");
}

/* FUNCTION FOR UPDATING THE TIME */
function clockTick() {
    var timer = setInterval(function () {
        if(time !== 0 && questions.length !== currentQuestion) {
            // update time
            time--;
            timerId.textContent = "Time: " + time;
        } else {
            // check if user ran out of time
            clearInterval(timer);
            quizEnd();
        }
    }, 1000);
}

function saveHighscore() {
    // get value of input box - for initials
    var initialsEl = document.querySelector('#initials');

    // make sure value wasn't empty
    if (initialsEl.value !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var prevList = JSON.parse(localStorage.getItem("highscores"));

        // format new score object for current user
        var highscores = {
            names: initialsEl.value,
            scores: time
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
        location.href = "./highscores.html";
    }
}

/* CLICK EVENTS */
    // user clicks button to submit initials
submitButton.addEventListener("click", saveHighscore);
    // user clicks button to start quiz
startButton.addEventListener("click", startQuiz);
    // user clicks on element containing choices
choicesEl.addEventListener("click", questionClick);