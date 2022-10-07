const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-card");
const scoreCard = document.querySelector("#score-card");
const leaderboardCard = document.querySelector("#highscore-card");
const timeDisplay = document.querySelector("#time");
const resultDiv = document.querySelector("#result-div");
const resultText = document.querySelector("#result-text");
const score = document.querySelector("#score");
const submitButton = document.querySelector("#submit-button");
const inputElement = document.querySelector("#initials");
const clearButton = document.querySelector("#clear-button");
const backButton = document.querySelector("#back-button");
const highscoreList = document.querySelector("#highscore-list");
  
// cards that are hidden from page
function hideCards() {
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
}

// questions are arrays
const questions = [
    {
      questionText: "Commonly used data types DO NOT include:",
      options: ["A. strings", "B. booleans", "C. alerts", "D. numbers"],
      answer: "C. alerts",
    },
    {
      questionText: "The condition in an if / else statement is enclosed with ______",
      options: [
        "A. quotes", "B. curly brackets", "C. parenthesis", "D. square brackets",
      ],
      answer: "C. parenthesis",
    },
    {
      questionText:
        "Arrays in JavaScript can be used to store ______",
      options: ["A. number and strings", "B. other arrays", "C. booleans", "D. all of the above"],
      answer: "D. all of the above",
    },
    {
      questionText:
        "String values must be enclosed within ______ when being assigned to variables.",
      options: ["A. commas","B. curly brackets","C. quotes", "D. parenthesis"],
      answer: "D. parenthesis",
    },
    {
      questionText:
        "A very useful tool used during development and debugging for printing content to the debugging is: ",
      options: ["A. Javascript", "B. terminal/bash", "C. for loops", "D. console.log"],
      answer: "D. console.log",
    },
];

function hideResultText() {
resultDiv.style.display = "none";
}

var intervalID;
var time;
var currentQuestion;
  
document.querySelector("#start-button").addEventListener("click", startQuiz);
// starts quiz
function startQuiz() {
    hideCards(); // line 17 for cards that are hidden
    questionCard.removeAttribute("hidden");
    currentQuestion = 0;
    displayQuestion();
    time = questions.length * 10;
    intervalID = setInterval(countdown, 1000);
    displayTime();
}
