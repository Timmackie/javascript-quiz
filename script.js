var startBtn = document.getElementById('start-button')
var startContainer = document.getElementById('start-container')
var quizContainer = document.getElementById('quiz-container')
var scoreContainer = document.getElementById('score-container')
var questionText = document.getElementById('question')
var q1 = document.getElementById('q1')
var q2 = document.getElementById('q2')
var q3 = document.getElementById('q3')
var q4 = document.getElementById('q4')
var q5 = document.getElementById('q5')
var questionCounter = 0
var subScore = document.getElementById('submit')
var initialsInput = document.getElementById('initials')
var timeLeft = 60
var timerDisplay = document.getElementById('timer')

var questions = [
    {
        qtext: 'What does HTML stand for?',
        choices: ['Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper Text Markup Language', 'Hyperlinks and Tables Markup Language', 'None of the above'],
        answer: 'Hyper Text Markup Language'
    },
    {
        qtext: 'What does CSS stand for?',
        choices: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets', 'None of the above'],
        answer: 'Cascading Style Sheets'
    },
    {
        qtext: 'What is the correct HTML element for the largest heading?',
        choices: ['<h6>', '<heading>', '<head>', '<h1>', '<header>'],
        answer: '<h1>'
    },
    {
        qtext: 'What does the CSS property "float" do?',
        choices: ['It makes an element float to the top of the page', 'It makes text wrap around an element', 'It creates a border around an element', 'It makes an element invisible', 'None of the above'],
        answer: 'It makes text wrap around an element'
    },
    {
        qtext: 'What is the correct way to insert a JavaScript file in an HTML page?',
        choices: ['<script href="script.js">', '<script name="script.js">', '<script src="script.js">', '<script file="script.js">', '<script link="script.js">'],
        answer: '<script src="script.js">'
    }
]

startBtn.addEventListener('click', startQuiz)
q1.addEventListener('click', nextQuestion)
q2.addEventListener('click', nextQuestion)
q3.addEventListener('click', nextQuestion)
q4.addEventListener('click', nextQuestion)
q5.addEventListener('click', nextQuestion)
subScore.addEventListener('click', saveScore)
initialsInput.addEventListener('keydown', ()=> {
    if (initialsInput.value!==""){
    subScore.removeAttribute('disabled')
}
})

var timerInterval;

function startQuiz() {
    console.log('clicked');
    startContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    questionText.textContent = questions[questionCounter].qtext;
    q1.textContent = questions[questionCounter].choices[0];
    q2.textContent = questions[questionCounter].choices[1];
    q3.textContent = questions[questionCounter].choices[2];
    q4.textContent = questions[questionCounter].choices[3];
    q5.textContent = questions[questionCounter].choices[4];

    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer(dec) {
    timeToDec = dec || 1;
    timeLeft = timeLeft - timeToDec;
    timerDisplay.textContent = "Time Left: " + timeLeft;


    if (timeLeft === 0) {
        clearInterval(timerInterval);
        endQuiz();
    }
}

function endQuiz() {
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
}

function nextQuestion(event) {
    // Get the selected answer
    var selectedAnswer = event.target.textContent;
    console.log(selectedAnswer == questions[questionCounter].answer)
    // Check if the answer is correct
    if (selectedAnswer == questions[questionCounter].answer) {
        // Show the correct message
        document.getElementById('correct-message').classList.remove('hidden');
        document.getElementById('incorrect-message').classList.add('hidden');
    } else {
        // Show the incorrect message
        document.getElementById('correct-message').classList.add('hidden');
        document.getElementById('incorrect-message').classList.remove('hidden');
        updateTimer(10)
    }

    // Increment the question counter
    questionCounter++;

    // Check if there are more questions
    if (questions.length == questionCounter) {
        // End the quiz
        endQuiz();
    } else {
        // Show the next question
        questionText.textContent = questions[questionCounter].qtext;
        q1.textContent = questions[questionCounter].choices[0];
        q2.textContent = questions[questionCounter].choices[1];
        q3.textContent = questions[questionCounter].choices[2];
        q4.textContent = questions[questionCounter].choices[3];
        q5.textContent = questions[questionCounter].choices[4];



    }
}
function saveScore() {
    var initials = initialsInput.value;
    var score = timeLeft;

    var data = {
        initials: initials,
        score: score,
    };

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(data);
    localStorage.setItem("highScores", JSON.stringify(highScores));


    clearInterval(timerInterval);
    window.location.href = 'highscore.html';
}

