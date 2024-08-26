let currentFrame = 1;
let answers = [];

document.addEventListener("DOMContentLoaded", function() {
    showFrame(currentFrame);

    document.getElementById("start-button").addEventListener("click", function() {
        currentFrame++;
        showFrame(currentFrame);
    });

    document.getElementById("restart-button").addEventListener("click", function() {
        currentFrame = 1;
        answers = [];
        showFrame(currentFrame);
    });

    document.querySelectorAll(".swipe-option").forEach(option => {
        option.addEventListener("click", handleSwipe);
    });
});

function showFrame(frameNumber) {
    document.querySelectorAll(".quiz-frame").forEach(frame => {
        frame.style.display = "none";
    });
    document.getElementById(`frame-${frameNumber}`).style.display = "flex";
    if (frameNumber >= 2 && frameNumber <= 6) {
        startTimer();
    }
}

function handleSwipe(event) {
    let choice = event.target.id.includes("left") ? "left" : "right";
    answers.push(choice);

    if (currentFrame === 3 || currentFrame === 5) {
        currentFrame++;
    }  else {
        currentFrame++;
    }
    showFrame(currentFrame);
}

function startTimer() {
    let timerElement = document.querySelector(`#timer-container-${currentFrame}`);
    let timeLeft = 5;

    let timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleSwipe({ target: { id: "right-portion" } }); // Auto-select right if time runs out
        }
        timerElement.textContent = timeLeft;
        timeLeft--;
    }, 1000);
}

function displayResult() {
    let result = determineResult();
    document.getElementById("result-text").textContent = `Your result is: ${result}`;
    currentFrame = 8;
    showFrame(currentFrame);
}

function determineResult() {
    let result;
    if (answers[1] === "left" && answers[3] === "left") {
        result = "Result 1";
    } else if (answers[1] === "right" && answers[3] === "right") {
        result = "Result 2";
    } else if (answers[1] === "left" && answers[3] === "right") {
        result = "Result 3";
    } else {
        result = "Result 4";
    }
    return result;
}
