let currentFrame = 1;
let selectedAnswers = {};
let timer;
let timerElement = document.getElementById('timer');

// Function to show a specific frame
function showFrame(frameNumber) {
    clearTimer();
    document.querySelectorAll('.quiz-frame').forEach(frame => {
        frame.style.display = "none";
    });
    document.getElementById(`frame-${frameNumber}`).style.display = "flex";
    currentFrame = frameNumber;
    startTimer(frameNumber);
}

// Function to handle swipe left actions
function handleSwipeLeft() {
    if (currentFrame === 3) selectedAnswers.question2 = "left";
    if (currentFrame === 5) selectedAnswers.question4 = "left";
    
    if (currentFrame === 6) {
        analyzeResults();
    } else {
        showFrame(currentFrame + 1);
    }
}

// Function to handle swipe right actions
function handleSwipeRight() {
    if (currentFrame === 3) selectedAnswers.question2 = "right";
    if (currentFrame === 5) selectedAnswers.question4 = "right";

    if (currentFrame === 6) {
        analyzeResults();
    } else {
        showFrame(currentFrame + 1);
    }
}

// Function to analyze results and show the result frame
function analyzeResults() {
    showFrame(7);
    setTimeout(() => {
        showResult();
    }, 2000);  // 2 seconds delay before showing the result
}

// Function to start the timer for each question
function startTimer(frameNumber) {
    if (frameNumber >= 2 && frameNumber <= 6) {
        let timeLeft = 5;
        timerElement.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearTimer();
                showFrame(currentFrame + 1);
            }
        }, 1000);
    } else {
        timerElement.textContent = ''; // Clear timer for frames that don't have a timer
    }
}

// Function to clear the timer
function clearTimer() {
    clearInterval(timer);
    timerElement.textContent = ''; // Clear timer display
}

// Event listeners for buttons and swipe actions
document.getElementById('start-button').addEventListener('click', () => {
    showFrame(2);
});

document.getElementById('swipe-left-2').addEventListener('click', handleSwipeLeft);
document.getElementById('swipe-right-2').addEventListener('click', handleSwipeRight);

document.getElementById('swipe-left-3').addEventListener('click', handleSwipeLeft);
document.getElementById('swipe-right-3').addEventListener('click', handleSwipeRight);

document.getElementById('swipe-left-4').addEventListener('click', handleSwipeLeft);
document.getElementById('swipe-right-4').addEventListener('click', handleSwipeRight);

document.getElementById('swipe-left-5').addEventListener('click', handleSwipeLeft);
document.getElementById('swipe-right-5').addEventListener('click', handleSwipeRight);

document.getElementById('swipe-left-6').addEventListener('click', handleSwipeLeft);
document.getElementById('swipe-right-6').addEventListener('click', handleSwipeRight);

document.getElementById('restart-button').addEventListener('click', () => {
    showFrame(1);
});

// Function to show result based on the answers
function showResult() {
    const resultText = document.getElementById('result-text');
    if (selectedAnswers.question2 === 'left' && selectedAnswers.question4 === 'left') {
        resultText.textContent = "You got Result 1";
    } else if (selectedAnswers.question2 === 'right' && selectedAnswers.question4 === 'right') {
        resultText.textContent = "You got Result 4";
    } else {
        resultText.textContent = "You got a mixed result!";
    }
    showFrame(8);
    setTimeout(() => {
        showFrame(1);
    }, 120000);  // 2 minutes timer to go back to the main page
}

// Initialize the quiz by showing the welcome screen
showFrame(1);
