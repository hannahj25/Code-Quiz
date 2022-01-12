var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var timerText = document.querySelector(".timer-text");
var pos = 0
var correct = 0
var quiz, quizStatus, question, choice, choices, chA, chB, chC, chD;
var answerFeedback = document.createElement("p");
var newDiv = document.createElement("div");
var form = document.createElement("form");
var input = document.createElement("input");
var submit = document.createElement("button");
var viewScoreboard = document.querySelector(".view-scoreboard");
var scoreboard = document.querySelector(".scoreboard")


input.type = "text;";
input.name = "user-initial";
input.id = "user-initial";
submit.type = "submit";
submit.textContent = "Submit";

document.getElementsByTagName('body')[0].appendChild(newDiv);
newDiv.style.textAlign="center";
form.appendChild(input);
form.appendChild(submit);

scoreboard.style.display="none";

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



timerCount = 60;

 function startQuiz() {
    startButton.disabled = true;
    startTimer ();
    playQuiz ();
}; 

function get(x) {
    return document.getElementById(x);
};

function playQuiz () {
    quiz = get("quiz");
    if (pos >= questions.length) {
        timerElement.style.display="none";
        timerText.style.display="none";
        score = timerCount;
        quiz.innerHTML = "<h3>You got "+correct+" of "+questions.length+" questions correct. <br> Your score: "+score+". <br> Enter initials below to save your score. </h2>";
        get ("quiz-status").innerHTML = "Quiz Completed.";
        newDiv.appendChild(form);
        submit.addEventListener("click", function(event) {
            event.preventDefault()
            if (input.value === "") {
                window.alert("Field cannot be left blank!");
            } else {
                var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
                highScores.push({"Initials": input.value, "Score": score});
                localStorage.setItem("highScores", JSON.stringify(highScores));
               // var userScore = document.createElement("li");
               // userScore.textContent = input.value + ": " + score;
                //userScore.classList.add("list-group-item")
                //document.getElementsByTagName('ul')[0].appendChild(userScore);
                gameOver()
            }
        })
        pos = 0;
        correct = 0;
        return false;
    }
    get("quiz-status").innerHTML = "Question "+(pos+1)+" of "+questions.length;

    question = questions[pos].question;
    chA = questions[pos].a;
    chB = questions[pos].b;
    chC = questions[pos].c;
    chD = questions[pos].d;

    quiz.innerHTML = "<h3>"+question+"</h3>";

    quiz.innerHTML += "<label> <input type='radio' name='choices' value='A'> "+chA+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='B'> "+chB+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='C'> "+chC+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='D'> "+chD+"</label><br>";
    quiz.innerHTML += "<button onclick='checkAnswer() ' > Submit Answer</button>";

};

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

function gameOver () {
    startButton.disabled = false;
    toggleScoreboard();
}


 function startTimer () {
    timer = setInterval(function() {
        timerElement.textContent = timerCount;
        if (timerCount > 0) {
           timerCount--;
        } else if (timerCount = 0) {
            gameOver();
            clearInterval(timer);
        } 
    }, 1000)
}; 



 startButton.addEventListener("click", startQuiz);

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
                document.getElementsByTagName('ul')[0].appendChild(userScore);
          }
    } else if (scoreboard.style.display === "block") {
        viewScoreboard.textContent="View Scoreboard";
        scoreboard.style.display = "none";
    };
}

 viewScoreboard.addEventListener("click", toggleScoreboard);

