# Code Quiz

 ## Purpose

 Presents user with a simple quiz of coding-related questions.

 ## Details

 Upon clicking "Start Quiz", a timer is started and the user is run through a short quiz in which they may select an answer to each question. Incorrect (or unanswered) questions subtract 10 seconds from the timer.After clicking through all the questions, user is presented with a score equal to seconds remaining on timer. User is able to input their initials to save their score, as well as view a scoreboard containing previous attempts.

 ## Screenshots

 ## Link
 https://hannahj25.github.io/code-quiz/

 ## Future considerations
 
 Add more and better questions!

 There is an issue where the quiz still runs after the timer reaches 0, meaning users can continue to answer questions (they will get a negative score if they answer incorrectly after timer is 0). I coded the gameOver function to be called when the timeCount is 0 but it doesn't work, so I want to fix that.

 The overall styling could be a lot nicer. Bootstrap's modal component may be a better option for displaying the scoreboard.

 ## Acknowledgements
 
 Used Bootstrap for styling.

 Much of the base for the javascript code which runs the quiz was taken from this tutorial: https://www.codemahal.com/video/javascript-quiz-tutorial/. I adapted it to suit my purposes and added extras e.g start button, timer, allowing user to save score, view scoreboard, etc.

