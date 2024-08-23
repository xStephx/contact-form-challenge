// DOM elements
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const general = document.getElementById('general');
const support = document.getElementById('support');
const message = document.getElementById('message');
const consent = document.getElementById('consent');

// DOM elements for errors
const errorFirstName = document.getElementById('error-first-name');
const errorLastName = document.getElementById('error-last-name');
const errorEmail = document.getElementById('error-email');
const errorQuery = document.getElementById('error-query');
const errorMessage = document.getElementById('error-msg');
const errorConsent = document.getElementById('error-consent');


// Submitting on button
document.getElementById('submit-btn').addEventListener('click', () => {
    // Reset error states
    resetErrors([firstName, lastName, email, message, consent]);

    // Validate fields
    let isValid = true;

    if (firstName.value.trim() === '') {
        showError(firstName, errorFirstName);
        isValid = false;
    }

    if (lastName.value.trim() === '') {
        showError(lastName, errorLastName);
        isValid = false;
    }

    if (email.value.trim() === '') {
        errorEmail.textContent = "This field is required";
        showError(email, errorEmail);
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        errorEmail.textContent = "Enter a valid email";
        showError(email, errorEmail);
        isValid = false;
    }

    if (!general.checked && !support.checked) {
        showError(null, errorQuery);
        isValid = false;
    }

    if (message.value.trim() === '') {
        showError(message, errorMessage);
        isValid = false;
    }

    if (!consent.checked) {
        showError(consent, errorConsent);
        isValid = false;
    }

    if (isValid) {
        //Show success message and clear form
        document.getElementById('main').classList.remove('mt-[30px]');
        document.getElementById('submitted').classList.remove('hidden');
        clearForm();
    }
});

function clearForm() {
    // Clear text inputs
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    message.value = '';
    // Clear radio buttons
    general.checked = false;
    support.checked = false;
    // Clear checkbox
    consent.checked = false;
}

function resetErrors(inputs) {
    // Hide all error messages, submitted box, red outline, and red text
    const errorMessages = document.querySelectorAll('span[id^="error-"]');
    errorMessages.forEach(message => message.classList.add('hidden'));
    inputs.forEach(input => {
        if (input) {
            input.classList.remove('outline-Red', 'text-Red');
        }
    });
    document.getElementById('main').classList.add('mt-[30px]');
    document.getElementById('submitted').classList.add('hidden');
}

function showError(input, message) {
    // Show error message, red outline, and red text
    if (input) {
        input.classList.add('outline-Red', 'text-Red');
    }
    message.classList.remove('hidden');
}

function isValidEmail(email) {
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}