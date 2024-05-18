document.addEventListener('DOMContentLoaded', function() {
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const clearBtn = document.getElementById('clear-btn');
    const countValue = document.getElementById('count-value');
    const errorMsg = document.getElementById('error-msg');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let count = 0;

    function updateDisplay() {
        countValue.textContent = count;
        clearBtn.style.display = count === 0 ? 'none' : 'inline-block';
    }

    function increment() {
        count++;
        errorMsg.style.display = 'none';
        updateDisplay();
    }

    function decrement() {
        if (count > 0) {
            count--;
            updateDisplay();
        } else {
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'Cannot decrement below 0';
        }
    }

    function clearCount() {
        count = 0;
        updateDisplay();
        errorMsg.style.display = 'none';
    }

    incrementBtn.addEventListener('click', increment);
    decrementBtn.addEventListener('click', decrement);
    clearBtn.addEventListener('click', clearCount);

    var toggleButton = document.getElementById('dark-mode-toggle');
    var body = document.body;
    updateToggleButton();

    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        updateToggleButton();
    });

    function updateToggleButton() {
        if (body.classList.contains('dark-mode')) {
            toggleButton.innerHTML = '<i class="fas fa-sun"></i> Toggle Light Mode';
        } else {
            toggleButton.innerHTML = '<i class="fas fa-moon"></i> Toggle Dark Mode';
        }
    }

    updateDisplay();
});
