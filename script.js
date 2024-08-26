let currentFrame = 1;
let result1, result2;
let timer;
let returnToStartTimeout;

function showFrame(frameNumber) {
    document.querySelectorAll('.quiz-frame').forEach(frame => {
        frame.style.display = 'none';
    });
    document.getElementById(`frame-${frameNumber}`).style.display = 'flex';

    // Reset and start timer if applicable
    if (frameNumber === 2 || frameNumber === 3) {
        startTimer(5);
    }
}

function startTimer(seconds) {
    let timeLeft = seconds;
    document.getElementById('timer').textContent = timeLeft;

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            moveToNextFrame();
        }
    }, 1000);
}

function moveToNextFrame() {
    currentFrame++;
    if (currentFrame === 4) {
        analyzeResults();
    } else if (currentFrame === 5) {
        startReturnToStartTimer();
    } else {
        showFrame(currentFrame);
    }
}

document.querySelectorAll('.swipe-option').forEach(option => {
    option.addEventListener('touchend', handleSwipe, false);
});

function handleSwipe(event) {
    let answer = event.currentTarget.getAttribute('data-answer');
    
    if (currentFrame === 2) {
        result1 = answer;
    } else if (currentFrame === 3) {
        result2 = answer;
    }
    
    moveToNextFrame();
}

function analyzeResults() {
    showFrame(4);
    setTimeout(() => {
        showFrame(5);
        document.getElementById('result-text').textContent = `Your Result: ${result1} and ${result2}`;
    }, 2000);
}

function startReturnToStartTimer() {
    clearTimeout(returnToStartTimeout);
    returnToStartTimeout = setTimeout(() => {
        restartQuiz();
    }, 180000); // 3 minutes in milliseconds
}

function restartQuiz() {
    currentFrame = 1;
    showFrame(currentFrame);
}

document.getElementById('restart-button').addEventListener('click', () => {
    clearTimeout(returnToStartTimeout);
    restartQuiz();
});

// Start the quiz
showFrame(1);

// Move to the next frame on tap/click in the welcome screen
document.getElementById('frame-1').addEventListener('click', () => {
    currentFrame++;
    showFrame(currentFrame);
});
