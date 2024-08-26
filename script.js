let timerInterval;
let answers = {}; // To store answers from questions 2 and 4

function startTimer(seconds, callback) {
    let remainingTime = seconds;
    updateTimerDisplay(remainingTime);

    timerInterval = setInterval(() => {
        remainingTime--;
        updateTimerDisplay(remainingTime);

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            callback();
        }
    }, 1000);
}

function updateTimerDisplay(time) {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = `Time Left: ${time}s`;
    }
}

function clearTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function handleSwipeOrClick(nextFrame, answerKey, answerValue) {
    clearTimer(); // Clear the timer when a swipe or click happens

    // Store the answer if it's from question 2 or 4
    if (answerKey && answerValue) {
        answers[answerKey] = answerValue;
    }

    if (nextFrame <= 7) {
        showFrame(nextFrame);
        startTimer(5, () => handleSwipeOrClick(nextFrame + 1));
    } else {
        showResults();
    }
}

function showFrame(frameNumber) {
    // Hide all frames
    for (let i = 1; i <= 8; i++) {
        const frame = document.getElementById(`frame-${i}`);
        if (frame) {
            frame.style.display = "none";
        }
    }

    // Show the requested frame
    const currentFrame = document.getElementById(`frame-${frameNumber}`);
    if (currentFrame) {
        currentFrame.style.display = "flex";
    } else {
        console.error(`Frame ${frameNumber} does not exist.`);
    }
}

function showResults() {
    // Calculate results based on answers from questions 2 and 4
    let resultText = "";
    if (answers.q2 === "left" && answers.q4 === "left") {
        resultText = "Result 1";
    } else if (answers.q2 === "right" && answers.q4 === "right") {
        resultText = "Result 2";
    } else if (answers.q2 === "left" && answers.q4 === "right") {
        resultText = "Result 3";
    } else if (answers.q2 === "right" && answers.q4 === "left") {
        resultText = "Result 4";
    } else {
        resultText = "No result found.";
    }

    // Display the result
    document.getElementById('result-text').textContent = resultText;
    showFrame(8);
}

// Initialize the first frame and start the timer
document.addEventListener('DOMContentLoaded', () => {
    showFrame(1);

    // Event listeners for swipe and click (example for two buttons)
    document.getElementById('start-button').addEventListener('click', () => handleSwipeOrClick(2));
    document.getElementById('swipe-left-2').addEventListener('click', () => handleSwipeOrClick(4, 'q2', 'left'));
    document.getElementById('swipe-right-2').addEventListener('click', () => handleSwipeOrClick(4, 'q2', 'right'));
    document.getElementById('swipe-left-4').addEventListener('click', () => handleSwipeOrClick(6, 'q4', 'left'));
    document.getElementById('swipe-right-4').addEventListener('click', () => handleSwipeOrClick(6, 'q4', 'right'));
    // Add similar event listeners for redundant questions
});

// Example restart button to go back to the first frame
document.getElementById('restart-button').addEventListener('click', () => {
    clearTimer();
    answers = {}; // Reset the answers
    showFrame(1);
    startTimer(5, () => handleSwipeOrClick(2));
});
