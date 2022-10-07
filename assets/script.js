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

// start timer
function countdown() {
    time--;
    displayTime();
    if (time < 1) {
      endQuiz();
    }
}

// to display time on screen
function displayTime() {
    timeDisplay.textContent = time;
}

// to display question 
function displayQuestion() {
    let question = questions[currentQuestion];
    let options = question.options;
    // link the options to appear with the question-text
    let h1QuestionElement = document.querySelector("#question-text");
    h1QuestionElement.textContent = question.questionText;
    // for loops to get options
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let optionButton = document.querySelector("#option" + i);
      optionButton.textContent = option;
    }
}

document.querySelector("#quiz-options").addEventListener("click", checkAnswer);
  function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
}
function checkAnswer(eventObject) {
  let optionButton = eventObject.target;
  resultDiv.style.display = "block";
  if (optionIsCorrect(optionButton)) {
    // if the answer is 'correct' text will appear on the side
    resultText.textContent = "Correct!";
    setTimeout(hideResultText, 1000);
  } else {
    // if the answer is 'incorrect' text will appear on the side
    resultText.textContent = "Incorrect!";
    setTimeout(hideResultText, 1000);
    if (time >= 10) {
      time = time - 10;
      displayTime();
    } else { // if time is 0 the quiz will end and display time as score
      time = 0;
      displayTime();
      endQuiz();
    }
  }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        // display next question
        displayQuestion();
    } else {
        // if there is none the quiz will end
        endQuiz();
    }
}
// when the quiz ends, timer is clear, and displays score
function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
}
// when the button is clicked the initials is stored in highscore
submitButton.addEventListener("click", storeScore);
function storeScore(event) {
  // prevent default behaviour of form submission
  event.preventDefault();
  // check for a users input
  if (!inputElement.value) { // alert if theres no user input
    alert("Error, please enter your initials!");
    return;
  }

  // keeps score and initails together
  let leaderboardItem = {
    initials: inputElement.value,
    score: time,
  };

  updateStoredLeaderboard(leaderboardItem);
  //hide the question card, display the leaderboardcard
  hideCards();
  leaderboardCard.removeAttribute("hidden");

  renderLeaderboard();
}

// updates the leaderboard stored in local storage
function updateStoredLeaderboard(leaderboardItem) {
  let leaderboardArray = getLeaderboard();
  // append new leaderboard item to leaderboard array
  leaderboardArray.push(leaderboardItem);
  // an array to be stored into local storage.
  localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}


// get array of leaderboard from local storage and parse it into javascript object
function getLeaderboard() {
  let storedLeaderboard = localStorage.getItem("leaderboardArray");
  if (storedLeaderboard !== null) {
    let leaderboardArray = JSON.parse(storedLeaderboard);
    return leaderboardArray;
  } else {
    leaderboardArray = [];
  }
  return leaderboardArray;
}