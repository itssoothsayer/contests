const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.querySelectorAll('.error-message');
const successMessage = document.querySelector('.success-message');
const form = document.getElementById('signup-form');
const submitButton = form.querySelector('button[type="submit"]');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,}$/;

function validateForm() {
    return emailRegex.test(emailInput.value) && passwordRegex.test(passwordInput.value);
}


submitButton.disabled = !validateForm();

emailInput.addEventListener('change', (event) => {
    const emailValue = event.target.value;
    if (emailValue.length > 3 && emailRegex.test(emailValue)) {
        errorMessage[0].style.display = 'none';
        emailInput.style.color = 'black';
    } else {
        errorMessage[0].style.display = 'block';
        errorMessage[0].textContent = 'Please enter a valid email address.';
        emailInput.style.color = 'red';
    }
    submitButton.disabled = !validateForm();
});

passwordInput.addEventListener('change', (event) => {
    const passwordValue = event.target.value;
    if (passwordRegex.test(passwordValue)) {
        errorMessage[1].style.display = 'none';
        passwordInput.style.color = 'black';
    } else {
        errorMessage[1].style.display = 'block';
        errorMessage[1].textContent = 'Password must be at least 8 characters long.';
        passwordInput.style.color = 'red';
    }
    submitButton.disabled = !validateForm();
});


emailInput.addEventListener('focus', () => {
    emailInput.style.color = 'black';
});

passwordInput.addEventListener('focus', () => {
    passwordInput.style.color = 'black';
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        successMessage.style.display = 'block';
        form.reset();
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    } else {
        alert('Please fix the errors in the form.');
    }
});
