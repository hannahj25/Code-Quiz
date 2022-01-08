var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");

//const questions = [
    //{
        //question: "Which coding language makes up the 'skeleteon' of a webpage?",
        //answers: {
           // a: "HTML",
            //b: "CSS",
           // c: "Javascript"
       // },
       // correctAnswer: "a"
   // },
//]

function startQuiz() {
    timerCount = 60;
    // make start screen disappear
    // display question
    // start timer countdown
    startTimer ();
    //renderQuestions ();
}

//function renderQuestions () {

//}

//function finishQuiz () {

//}

function startTimer () {
    timer = setInterval(function() {
       timerElement.textContent = timerCount;
       if (timerCount > 0) {
           timerCount--;
       } else {
           clearInterval(timer);
       }
    }, 1000)
}

startButton.addEventListener("click", startQuiz);