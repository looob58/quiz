let currentFrame = 1;
let selectedAnswers = {};
let timer;
let timerElement = document.getElementById('timer');
let touchStartX = 0;

// Images for timer countdown (replace these with your actual image paths)
const timerImages = [
    'image1.jpg',  // Replace with actual image paths
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg'
];

// Function to show a specific frame
function showFrame(frameNumber) {
    clearTimer();
    document.querySelectorAll('.quiz-frame').forEach(frame => {
        frame.style.display = "none";
    });
    document.getElementById(`frame-${frameNumber}`).style.display = "flex";
    currentFrame = frameNumber;
    startTimer(frameNumber);
}

// Function to handle swipe left actions
function handleSwipeLeft() {
  if (currentFrame === 2) selectedAnswers.question1 = "A";
    if (currentFrame === 3) selectedAnswers.question2 = "A";
     if (currentFrame === 4) selectedAnswers.question3 = "A";
    if (currentFrame === 5) selectedAnswers.question4 = "A";
     if (currentFrame === 6) selectedAnswers.question5 = "A";
    if (currentFrame === 6) {
        analyzeResults();
    } else {
        showFrame(currentFrame + 1);
    }
}

// Function to handle swipe right actions
function handleSwipeRight() {
   
    if (currentFrame === 2) selectedAnswers.question1 = "B";
    if (currentFrame === 3) selectedAnswers.question2 = "B";
     if (currentFrame === 4) selectedAnswers.question3 = "B";
    if (currentFrame === 5) selectedAnswers.question4 = "B";
     if (currentFrame === 6) selectedAnswers.question5 = "B";
    if (currentFrame === 6) {
        analyzeResults();
    } else {
        showFrame(currentFrame + 1);
    }
}

// Function to analyze results and show the result frame
function analyzeResults() {
    showFrame(7);
    setTimeout(() => {
        showResult();
    }, 2000);  // 2 seconds delay before showing the result
}

// Function to start the timer for each question
function startTimer(frameNumber) {
    if (frameNumber >= 2 && frameNumber <= 6) {
        let timeLeft = 5;
        updateTimerImage(timeLeft);
        timer = setInterval(() => {
            timeLeft--;
            updateTimerImage(timeLeft);
            if (timeLeft <= 0) {
                clearTimer();
                handleSwipeRight();
            }
        }, 1000);
    } else {
        timerElement.style.backgroundImage = ''; // Clear timer for frames that don't have a timer
         timerElement.style.position='inline';
            timerElement.style.display='none';
    }
}

// Function to update the timer image
function updateTimerImage(timeLeft) {
    if (timeLeft > 0 && timeLeft <= 5) {
        timerElement.style.backgroundImage = `url(${timerImages[timeLeft - 1]})`;
timerElement.style.position='absolute';
            timerElement.style.display='flex';
    }
}

// Function to clear the timer
function clearTimer() {
    clearInterval(timer);
    timerElement.style.backgroundImage = ''; // Clear timer display
timerElement.style.position='inline';
            timerElement.style.display='none';
}
// Event listeners for buttons and swipe actions
document.getElementById('main-gif-container').addEventListener('click', () => {
    showFrame(2);
});



// Event listeners for swipe options with click detection
document.querySelectorAll('.swipe-option').forEach(element => {
    element.addEventListener('click', (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const clickX = event.clientX;

        if (clickX < centerX) {
            handleSwipeLeft();
        } else {
            handleSwipeRight();
        }
    });
});
document.getElementById('result-image').addEventListener('click', () => {
    showFrame(1);
});


// Function to show result based on the answers
function showResult() {
    const resultImage = document.getElementById('result-image');
    var resultext;
    resultext= selectedAnswers.question1 + selectedAnswers.question2  + selectedAnswers.question3 + selectedAnswers.question4 + selectedAnswers.question5;
  
     if (resultext ==='ABAAA') {
         resultImage.style.backgroundImage = "url('a1.jpg')";
   }
  if (resultext ==='ABAAB') {
         resultImage.style.backgroundImage = "url('a1.jpg')";
   }
  if (resultext ==='ABABA') {
         resultImage.style.backgroundImage = "url('a1.jpg')";
   }
  if (resultext ==='ABABB') {
         resultImage.style.backgroundImage = "url('a1.jpg')";
   }
  if (resultext ==='BBAAA') {
         resultImage.style.backgroundImage = "url('a1.jpg')";
   }
  if (resultext ==='BBAAB') {
         resultImage.style.backgroundImage = "url('a1.jpg')";
   }
  if (resultext ==='BBABA') {
         resultImage.style.backgroundImage = "url('a1.jpg')";
   }
  if (resultext ==='BBABB') {
         resultImage.style.backgroundImage = "url('a2.jpg')";
   }
  if (resultext ==='AAAAA') {
         resultImage.style.backgroundImage = "url('a2.jpg')";
   }
  if (resultext ==='AAAAB') {
         resultImage.style.backgroundImage = "url('a2.jpg')";
   }
  if (resultext ==='AAABA') {
         resultImage.style.backgroundImage = "url('a2.jpg')";
   }
  if (resultext ==='AAABB') {
         resultImage.style.backgroundImage = "url('a2.jpg')";
   }
  if (resultext ==='AABAA') {
         resultImage.style.backgroundImage = "url('a2.jpg')";
   }
  if (resultext ==='AABAB') {
         resultImage.style.backgroundImage = "url('a2.jpg')";
   }
  if (resultext ==='AABBA') {
         resultImage.style.backgroundImage = "url('a2.jpg')";
   }
  if (resultext ==='AABBB') {
         resultImage.style.backgroundImage = "url('a2.jpg')";
   }
  if (resultext ==='BAAAA') {
         resultImage.style.backgroundImage = "url('a3.jpg')";
   }
  if (resultext ==='BAAAB') {
         resultImage.style.backgroundImage = "url('a3.jpg')";
   }
  if (resultext ==='BAABA') {
         resultImage.style.backgroundImage = "url('a3.jpg')";
   }
  if (resultext ==='BAABB') {
         resultImage.style.backgroundImage = "url('a3.jpg')";
   }
  if (resultext ==='BABAA') {
         resultImage.style.backgroundImage = "url('a3.jpg')";
   }
  if (resultext ==='BABAB') {
         resultImage.style.backgroundImage = "url('a3.jpg')";
   }
  if (resultext ==='BABBA') {
         resultImage.style.backgroundImage = "url('a3.jpg')";
   }
  if (resultext ==='BABBB') {
         resultImage.style.backgroundImage = "url('a3.jpg')";
   }
  if (resultext ==='ABBAA') {
         resultImage.style.backgroundImage = "url('a4.jpg')";
   }
  if (resultext ==='ABBAB') {
         resultImage.style.backgroundImage = "url('a4.jpg')";
   }
  if (resultext ==='ABBBA') {
         resultImage.style.backgroundImage = "url('a4.jpg')";
   }
  if (resultext ==='ABBBB') {
         resultImage.style.backgroundImage = "url('a4.jpg')";
   }
  if (resultext ==='BBBAA') {
         resultImage.style.backgroundImage = "url('a4.jpg')";
   }
  if (resultext ==='BBBAB') {
         resultImage.style.backgroundImage = "url('a4.jpg')";
   }
  if (resultext ==='BBBBA') {
         resultImage.style.backgroundImage = "url('a4.jpg')";
   }
  if (resultext ==='BBBBB') {
         resultImage.style.backgroundImage = "url('a4.jpg')";
   }


    
    showFrame(8);
    setTimeout(() => {
        showFrame(1);
    }, 120000);  // 2 minutes timer to go back to the main page
}

// Function to detect swipe gestures
function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].screenX;
    const swipeThreshold = 50; // Minimum distance (in px) to recognize a swipe

    if (touchStartX - touchEndX > swipeThreshold) {
        handleSwipeLeft();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        handleSwipeRight();
    }
}

// Add touch event listeners
document.querySelectorAll('.swipe-option').forEach(element => {
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
});

// Initialize the quiz by showing the welcome screen
showFrame(1);
