let startX, currentCard, nextCard;

document.querySelectorAll('.quiz-card').forEach(card => {
    card.addEventListener('touchstart', handleTouchStart, false);
    card.addEventListener('touchmove', handleTouchMove, false);
    card.addEventListener('touchend', handleTouchEnd, false);
});

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    currentCard = event.currentTarget;
    nextCard = currentCard.nextElementSibling;
}

function handleTouchMove(event) {
    let touchX = event.touches[0].clientX;
    let moveX = touchX - startX;

    currentCard.classList.add('swiping');
    currentCard.style.transform = `translateX(${moveX}px) rotate(${moveX * 0.1}deg)`;

    if (nextCard) {
        nextCard.style.transform = `scale(${1 - Math.abs(moveX) / 1000})`;
        nextCard.style.opacity = `${0.8 + Math.abs(moveX) / 1000}`;
    }
}

function handleTouchEnd(event) {
    let moveX = event.changedTouches[0].clientX - startX;

    if (Math.abs(moveX) > 100) {
        currentCard.style.transform = `translateX(${moveX > 0 ? 500 : -500}px) rotate(${moveX * 0.1}deg)`;
        currentCard.style.opacity = 0;
        currentCard.addEventListener('transitionend', () => {
            currentCard.remove();
        });

        // Handle the answer here
        let answer = currentCard.getAttribute('data-answer');
        console.log('User answered:', answer);

        // Move the next card up
        if (nextCard) {
            nextCard.style.zIndex = 2;
            nextCard.style.transform = 'scale(1)';
            nextCard.style.opacity = '1';
        }
    } else {
        currentCard.classList.remove('swiping');
        currentCard.style.transform = 'translateX(0) rotate(0)';

        if (nextCard) {
            nextCard.style.transform = 'scale(0.95)';
            nextCard.style.opacity = '0.8';
        }
    }
}
