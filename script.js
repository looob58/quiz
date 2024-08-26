let timerInterval;

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

function handleSwipeOrClick(nextFrame) {
    clearTimer(); // Clear the timer when a swipe or click happens
    showFrame(nextFrame);
    if (nextFrame <= 7) { // Start a timer only if not on the last result frame
        startTimer(5, () => handleSwipeOrClick(nextFrame + 1));
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

// Initialize the first frame and start the timer
document.addEventListener('DOMContentLoaded', () => {
    showFrame(1);

    // Event listeners for swipe and click (example for two buttons)
    document.getElementById('swipe-left').addEventListener('click', () => handleSwipeOrClick(2));
    document.getElementById('swipe-right').addEventListener('click', () => handleSwipeOrClick(3));
    
    // Repeat similar event listeners for other buttons or swipe actions
    // For example:
    // document.getElementById('swipe-left-2').addEventListener('click', () => handleSwipeOrClick(4));
    // document.getElementById('swipe-right-2').addEventListener('click', () => handleSwipeOrClick(5));
});

// Example restart button to go back to the first frame
document.getElementById('restart-button').addEventListener('click', () => {
    clearTimer();
    showFrame(1);
    startTimer(5, () => handleSwipeOrClick(2));
});
