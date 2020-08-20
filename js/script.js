// ********* Global Variables ********* //
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const btnSubmit = document.getElementById('btn-submit');
const arrayOfInputs = [username, email, password, password2];

// ********* Functions ********* //
// Show input error
function showError(input, message) {

    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.className = 'form-control failure';
    small.innerText = message;

};

// Show success outline
function showSuccess(input) {

    const formControl = input.parentElement;
    formControl.className = 'form-control success';

};

// Check email is valid
function checkEmail(input) {

    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEx.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'This is not a valid email address');
    }

};

// Check required fields
function checkRequired(inputArr) {

    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            if (input.id === 'password2') {
                showError(input, 'Password is required')
            } else {
                showError(input, `${getFieldName(input)} is required`);
            }
        } else {
            showSuccess(input);
        }
    });

};

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        if (input.id === 'password2') {
            showError(input, `Password must be at least ${min} characters`)
        } else {
            showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        }
    } else if (input.value.length > max) {
        if (input.id === 'password2') {
            showError(input, `Password must be at least ${min} characters`)
        }
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
};

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(password2, 'Passwords do not match');
    }
}

// Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// ********* Event Listeners ********* //
// Check if all input fields have been field out
window.addEventListener('keyup', function () {

    let filledInputsCounter = 0;

    arrayOfInputs.forEach(inputField => {
        inputField.value.trim() !== '' ? filledInputsCounter++ : filledInputsCounter--;
    });

    if (filledInputsCounter === arrayOfInputs.length) {
        btnSubmit.classList.add('ready');
    } else {
        btnSubmit.classList.remove('ready');
    }

});

// When user moves out of input field
form.addEventListener('focusout', (event) => {

    if (event.target.id === 'username') {
        checkLength(event.target, 5, 15);
    }

    if (event.target.id === 'email') {
        checkEmail(email);
    }

    if (event.target.id === 'password' || event.target.id === 'password2') {
        checkLength(event.target, 6, 25);
    }

    if (event.target.id === 'password2') {
        checkPasswordsMatch(password, password2);
    }

});

// When submit button is clicked...
form.addEventListener('submit', function (e) {

    // Prevent Form From Submiting
    e.preventDefault();

    // Check if submitted info meets requirements
    checkRequired(arrayOfInputs);
    checkLength(username, 3, 15);
    checkLength(password, 5, 15);
    checkLength(password2, 5, 15);
    checkEmail(email);
    checkPasswordsMatch(password, password2);

});