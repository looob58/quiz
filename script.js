let currentFrame = 1;
let answerQ2, answerQ4;
let timer;
let returnToStartTimeout;

function showFrame(frameNumber) {
    document.querySelectorAll('.quiz-frame').forEach(frame => {
        frame.style.display = 'none';
    });
    document.getElementById(`frame-${frameNumber}`).style.display = 'flex';

    if (frameNumber >= 2 && frameNumber <= 6) {
        startTimer(5);
    }
}

function startTimer(seconds) {
    let timeLeft = seconds;
    document.getElementById('timer-circle').style.animation = `countdown ${seconds}s linear forwards`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            moveToNextFrame();
        }
    }, 1000);
}

function moveToNextFrame() {
    currentFrame++;
    if (currentFrame === 7) {
        analyzeResults();
    } else if (currentFrame === 8) {
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
    
    // Store answers for specific questions
    if (currentFrame === 3) {
        answerQ2 = answer;
    } else if (currentFrame === 5) {
        answerQ4 = answer;
    }
    
    moveToNextFrame();
}

function analyzeResults() {
    showFrame(7);
    setTimeout(() => {
        showFrame(8);
        document.getElementById('result-text').textContent = `Your Result: ${getResult()}`;
    }, 2000);
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
