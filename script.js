let currentFrame = 1;
let selectedAnswers = {};
let timer;

function showFrame(frameNumber) {
    clearTimer();
    document.querySelectorAll('.quiz-frame').forEach(frame => {
        frame.style.display = "none";
    });
    document.getElementById(`frame-${frameNumber}`).style.display = "flex";
    currentFrame = frameNumber;
    startTimer(frameNumber);
}

function handleSwipeLeft() {
    if (currentFrame === 3) selectedAnswers.question2 = "left";
    if (currentFrame === 5) selectedAnswers.question4 = "left";
    showFrame(currentFrame + 1);
}

function handleSwipeRight() {
    if (currentFrame === 3) selectedAnswers.question2 = "right";
    if (currentFrame === 5) selectedAnswers.question4 = "right";
    showFrame(currentFrame + 1);
}

function startTimer(frameNumber) {
    if (frameNumber >= 2 && frameNumber <= 7) {
        let timeLeft = 5;
        const timerElement = document.getElementById('timer');
        timerElement.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearTimer();
                showFrame(currentFrame + 1);
            }
        }, 1000);
    }
}

function clearTimer() {
    clearInterval(timer);
}

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

showFrame(1);
