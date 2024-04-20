const counterElement = document.getElementById('counter-display');
const decrementButton = document.getElementById('decrement-btn');
const incrementButton = document.getElementById('increment-btn');
const clearButton = document.getElementById('clear-btn');
const errorElement = document.getElementById('error-msg');

let count = 0;

function updateCounter() {
    counterElement.textContent = `Your current count is: ${count}`; // Update directly
    clearButton.style.display = count > 0 ? 'inline-block' : 'none';
    errorElement.style.display = count === 0 ? 'block' : 'none';
    decrementButton.disabled = count === 0;
    decrementButton.style.filter = count === 0 ? 'grayscale(100%)' : 'none'; // Gray out decrement button
}

updateCounter();  // Initial update

incrementButton.addEventListener('click', () => {
    count++;
    updateCounter();
});

decrementButton.addEventListener('click', () => {
    if (count > 0) {
        count--;
    }
    updateCounter();
});

clearButton.addEventListener('click', () => {
    count = 0;
    updateCounter();
});
