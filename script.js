let currentFrame = 1;
let timerInterval;
let countdownSeconds = 5; // Adjust as needed for each question
let answerQ2 = '';
let answerQ4 = '';
let returnToStartTimeout;

function showFrame(frameNumber) {
    document.querySelectorAll('.quiz-frame').forEach(frame => {
        frame.style.display = 'none';
    });
    document.getElementById(`frame-${frameNumber}`).style.display = 'flex';
    if (frameNumber >= 2 && frameNumber <= 6) {
        startTimer();
    } else {
        stopTimer();
    }
}

function startTimer() {
    let timerElement = document.getElementById('timer-container');
    timerElement.textContent = countdownSeconds; // Start countdown text
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        countdownSeconds--;
        timerElement.textContent = countdownSeconds;
        if (countdownSeconds <= 0) {
            clearInterval(timerInterval);
            handleSwipe('timeout'); // Handle timeout if no action is taken
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    countdownSeconds = 5; // Reset to default countdown seconds
}

function handleSwipe(answer) {
    stopTimer();
    if (currentFrame === 2) {
        // Redundant question, just go to next
        currentFrame++;
    } else if (currentFrame === 3) {
        answerQ2 = answer;
        currentFrame++;
    } else if (currentFrame === 4) {
        // Redundant question, just go to next
        currentFrame++;
    } else if (currentFrame === 5) {
        answerQ4 = answer;
        currentFrame++;
    } else if (currentFrame === 6) {
        // Redundant question, just go to next
        currentFrame++;
    } else if (currentFrame === 7) {
        currentFrame++;
    } else if (currentFrame === 8) {
        currentFrame = 1;
    }
    showFrame(currentFrame);
    if (currentFrame === 8) {
        startReturnToStartTimer();
    }
}

function getResult() {
    if (answerQ2 === 'result1' && answerQ4 === 'result3') {
        return 'Result A'; // Replace with actual result description
    } else if (answerQ2 === 'result1' && answerQ4 === 'result4') {
        return 'Result B'; // Replace with actual result description
    } else if (answerQ2 === 'result2' && answerQ4 === 'result3') {
        return 'Result C'; // Replace with actual result description
    } else if (answerQ2 === 'result2' && answerQ4 === 'result4') {
        return 'Result D'; // Replace with actual result description
    }
    return 'No result'; // Default or fallback result
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

document.getElementById('start-button').addEventListener('click', () => {
    currentFrame++;
    showFrame(currentFrame);
});

// Start the quiz
showFrame(1);
