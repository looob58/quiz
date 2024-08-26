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
}

function startReturnToStartTimer() {
    clearTimeout(returnToStartTimeout);
    returnToStartTimeout = setTimeout(() => {
        showFrame(1);
    }, 180000); // 3 minutes
}

document.getElementById('start-button').addEventListener('click', () => {
    showFrame(2);
});

document.getElementById('restart-button').addEventListener('click', () => {
    showFrame(1);
});

const swipeHandler = (direction) => {
    handleSwipe(direction);
};

document.getElementById('left-portion').addEventListener('click', () => swipeHandler('left'));
document.getElementById('right-portion').addEventListener('click', () => swipeHandler('right'));

const handleSwipeEvent = (event) => {
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    let startX = event.touches[0].clientX;
    let startY = event.touches[0].clientY;

    const handleMove = (moveEvent) => {
        const distanceX = moveEvent.touches[0].clientX - startX;
        const distanceY = moveEvent.touches[0].clientY - startY;

        if (Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > swipeThreshold) {
            if (distanceX > 0) {
                swipeHandler('right');
            } else {
                swipeHandler('left');
            }
            document.removeEventListener('touchmove', handleMove);
        }
    };

    document.addEventListener('touchmove', handleMove);
};

document.getElementById('left-portion').addEventListener('touchstart', handleSwipeEvent);
document.getElementById('right-portion').addEventListener('touchstart', handleSwipeEvent);
