// Selects start button and timer elements br class and assigns them to variables
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var timerText = document.querySelector(".timer-text");
// Selects scoreboard elements by class and assigns them to variables
var viewScoreboard = document.querySelector(".view-scoreboard");
var scoreboard = document.querySelector(".scoreboard")
// Creates variables to be used for position of quiz, number of correct answers, questions, choices etc.
var pos = 0
var correct = 0
var quiz, quizStatus, question, choice, choices, chA, chB, chC, chD;
// Creates p element to give answer feedback
var answerFeedback = document.createElement("p");
// Creates elements for score submission, defines parameters, styles and appends
var newDiv = document.createElement("div");
var form = document.createElement("form");
var input = document.createElement("input");
var submit = document.createElement("button");
input.type = "text;";
input.name = "user-initial";
input.id = "user-initial";
submit.type = "submit";
submit.textContent = "Submit";
submit.classList.add("btn");
submit.classList.add("btn-success");

document.getElementsByTagName('main')[0].appendChild(newDiv);
newDiv.style.textAlign="center";
form.appendChild(input);
form.appendChild(submit);

var timer;

// Sets scoreboard and timer to default as hidden
scoreboard.style.display="none";
timerElement.style.display="none";
timerText.style.display="none";

// Creates an array containing the quiz's questions, possible choices, and defines correct answer
// TO-DO: Add more/better questions
var questions = [
    { 
        question: "Which coding language makes up the 'skeleton' of a webpage?",
        a: "HTML",
        b: "CSS",
        c: "Javascript",
        d: "jQuery",
        answer: "A"
    },
    {
        question: "Which is NOT a commonly used data type in Javascript?",
        a: "String", 
        b: "Function",
        c: "Boolean",
        d: "Number",
        answer: "B"
    },
    {
        question: "What does API stand for?",
        a: "Application Programming Interference",
        b: "Application Powered Integration",
        c: "Application Programming Interface", 
        d: "Average Programmer Intellect",
        answer: "C"
    },
    {
        question: "Which tag is used to define a list item in HTML?",
        a: "ul", 
        b: "li",
        c: "l",
        d: "item",
        answer: "B"
    },
    {
        question: "Within which part of a HTML document do we link a CSS stylesheet?",
        a: "Body", 
        b: "Style", 
        c: "Main", 
        d: "Head",
        answer: "D"
    }, 

];


// Starts timer and quiz
// TO-DO: this function is un-needed? can go inside playQuiz function?
function startQuiz() {
    startButton.disabled = true;
    timerCount = 59;
    timerElement.style.display="block";
    timerText.style.display="block";
    startTimer ();
    playQuiz ();
}; 

// Simple function to simplify getting elements by id
function get(x) {
    return document.getElementById(x);
};

// Runs the quiz
function playQuiz () {  
    newDiv.style.display="none";
    quiz = get("quiz");
    // Sets position and correct answers to 0. Calls gameOver function when all Q's are answered
    if (pos >= questions.length) {
        gameOver ()
        pos = 0;
        correct = 0;
        return false;
    }
    // Adds text defining position in quiz
    get("quiz-status").innerHTML = "Question "+(pos+1)+" of "+questions.length;

    // Assigns content of questions and choices to variables
    question = questions[pos].question;
    chA = questions[pos].a;
    chB = questions[pos].b;
    chC = questions[pos].c;
    chD = questions[pos].d;

    quiz.innerHTML = "<h3>"+question+"</h3>";

    // Creates inputs to select answers and submit
    quiz.innerHTML += "<br><label> <input type='radio' name='choices' value='A'> "+chA+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='B'> "+chB+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='C'> "+chC+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='D'> "+chD+"</label><br><br>";
    quiz.innerHTML += "<button onclick='checkAnswer() ' class='btn btn-success'> Submit Answer</button>";

};

// Function checks whether answers are correct or incorrect then allows player to proceed to next question
function checkAnswer() {
    choices = document.getElementsByName("choices");
    for (var i=0; i<choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    if (choice == questions[pos].answer) {
        newDiv.appendChild(answerFeedback);
        answerFeedback.textContent = "Previous answer was correct!"
        correct++;
    } else {
        newDiv.appendChild(answerFeedback);
        answerFeedback.textContent = "Previous answer was incorrect!"
        timerCount -= 10;

        
    }

    pos++;


    playQuiz();
}

// Displays quiz results/score, allows user to save score and/or play again
function gameOver () {
    startButton.disabled = false;
    startButton.textContent="Play Quiz Again!"
    score = timerCount;
    clearInterval(timer);
    timerElement.style.display="none";
    timerText.style.display="none";
    quiz.innerHTML = "<h3>You got "+correct+" of "+questions.length+" questions correct. <br> Your score: "+score+". <br> Enter initials below to save your score to the scoreboard. </h2>";
    get ("quiz-status").innerHTML = "Quiz Completed.";
    newDiv.style.display="block";
    // Appends form and input so user can input initials to save score
    newDiv.appendChild(form);
    submit.addEventListener("click", function(event) {
        event.preventDefault()
        if (input.value === "") {
            window.alert("Field cannot be left blank!");
        } else {
            var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
            highScores.push({"Initials": input.value, "Score": score});
            localStorage.setItem("highScores", JSON.stringify(highScores));
            newDiv.style.display="none";
        }
    })
}

function youLose () {
    startButton.disabled = false;
    startButton.textContent="Play Quiz Again!"
    score = timerCount;
    clearInterval(timer);
    timerElement.style.display="none";
    timerText.style.display="none";
    quiz.innerHTML = "<h3>You got "+correct+" of "+questions.length+" questions correct. </h2>";
    get ("quiz-status").innerHTML = "Time Up!";

}

// Runs timer
function startTimer () {
    timer = setInterval(function() {
        timerElement.textContent = timerCount;
        if (timerCount > 0) {
           timerCount--;
        } else if (timerCount === 0) {
           youLose();
        } 
    }, 1000)
}; 


// Starts quiz when user clicks start button
startButton.addEventListener("click", startQuiz);

// Controls scoreboard visibility and adds scores
function toggleScoreboard() {
    if (scoreboard.style.display === "none") {
        viewScoreboard.textContent="Hide Scoreboard";
        scoreboard.style.display = "block";
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        document.getElementsByTagName('ul')[0].innerHTML="";
        for (const element of highScores) {
            var userScore = document.createElement("li");
                userScore.textContent = element.Initials + ": " + element.Score;
                userScore.classList.add("list-group-item");
                userScore.classList.add("scoreboard-item");
                document.getElementsByTagName('ul')[0].appendChild(userScore);
          }
    } else if (scoreboard.style.display === "block") {
        viewScoreboard.textContent="View Scoreboard";
        scoreboard.style.display = "none";
    };
}

// Display scoreboard when user clicks view scoreboard
viewScoreboard.addEventListener("click", toggleScoreboard);

