let currentFrame = 1;
let result1, result2;
let returnToStartTimeout;

function showFrame(frameNumber) {
    document.querySelectorAll('.quiz-frame').forEach(frame => {
        frame.style.display = 'none';
    });
    document.getElementById(`frame-${frameNumber}`).style.display = 'flex';
}

document.querySelectorAll('.swipe-option').forEach(option => {
    option.addEventListener('touchend', handleSwipe, false);
});

function handleSwipe(event) {
    let answer = event.currentTarget.getAttribute('data-answer');
    
    if (currentFrame === 3) {
        result1 = answer;
    } else if (currentFrame === 5) {
        result2 = answer;
    }
    
    currentFrame++;
    if (currentFrame === 7) {
        analyzeResults();
    } else {
        showFrame(currentFrame);
    }
}

function analyzeResults() {
    showFrame(7);
    setTimeout(() => {
        showFrame(8);
        document.getElementById('result-text').textContent = `Your Result: ${result1} and ${result2}`;
        startReturnToStartTimer();
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
