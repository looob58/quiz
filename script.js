let currentFrame = 1;
let timerInterval;
let countdownSeconds = 5; // Time for each question in seconds
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
        // Analyzing screen, transition to result after analyzing
        setTimeout(() => {
            currentFrame++;
            showFrame(currentFrame);
        }, 2000); // 2 seconds delay for analyzing
        return; // Exit function to avoid immediate frame change
    } else if (currentFrame === 8) {
        // Display result based on answers
        document.getElementById('result-text').textContent = getResult();
        startReturnToStartTimer(); // Start timer to return to frame 1
        return; // Exit function to avoid immediate frame change
    }
    showFrame(currentFrame);
}

function getResult() {
    if (answerQ2 === 'left' && answerQ4 === 'left') {
        return 'Result A'; // Replace with actual result description
    } else if (answerQ2 === 'left' && answerQ4 === 'right') {
        return 'Result B'; // Replace with actual result description
    } else if (answerQ2 === 'right' && answerQ4 === 'left') {
        return 'Result C'; // Replace with actual result description
    } else if (answerQ2 === 'right' && answerQ4 === 'right') {
        return 'Result D'; // Replace with actual result description
    }
}

function startReturnToStartTimer() {
    clearTimeout(returnToStartTimeout);
    returnToStartTimeout = setTimeout(() => {
        currentFrame = 1;
        showFrame(currentFrame);
    }, 180000); // 3 minutes in milliseconds
}

document.getElementById('start-button').addEventListener('click', () => {
    currentFrame = 2;
    showFrame(currentFrame);
});

document.getElementById('restart-button').addEventListener('click', () => {
    currentFrame = 1;
    showFrame(currentFrame);
});

document.querySelectorAll('.swipe-option').forEach(option => {
    option.addEventListener('click', (e) => {
        const answer = e.target.id === 'left-portion' ? 'left' : 'right';
        handleSwipe(answer);
    });
});

document.addEventListener('swiped-left', () => handleSwipe('left'));
document.addEventListener('swiped-right', () => handleSwipe('right'));
