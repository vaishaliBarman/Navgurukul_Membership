document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailaddresserror');
    const passwordError = document.getElementById('passworderror');
    const successMessage = document.getElementById('successMessage');
    const togglePassword = document.getElementById('togglePassword');

    // Email validation function
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@navgurukul\.org$/;
        return emailPattern.test(email);
    }

    // Phone number validation function
    function validatePhone(phone) {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    }

    // Password validation function
    function validatePassword(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const minLength = password.length >= 8;
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && minLength;
    }

    // Check if email already exists in localStorage
    function emailExists(email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.email === email);
    }

    // Store user details in localStorage
    function storeUserDetails(details) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(details);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Real-time validation feedback
    emailInput.addEventListener('input', () => {
        if (validateEmail(emailInput.value)) {
            if (emailExists(emailInput.value)) {
                emailError.textContent = 'This email is already registered.';
                emailInput.setCustomValidity('This email is already registered.');
            } else {
                emailError.textContent = '';
                emailInput.setCustomValidity('');
            }
        } else {
            emailError.textContent = 'Invalid email format. Must end with @navgurukul.org';
            emailInput.setCustomValidity('Invalid email format. Must end with @navgurukul.org');
        }
    });

    phoneInput.addEventListener('input', () => {
        if (validatePhone(phoneInput.value)) {
            phoneInput.setCustomValidity('');
        } else {
            phoneInput.setCustomValidity('Invalid phone number. Must be exactly 10 digits.');
        }
    });

    passwordInput.addEventListener('input', () => {
        if (validatePassword(passwordInput.value)) {
            passwordError.textContent = '';
            passwordInput.setCustomValidity('');
        } else {
            passwordError.textContent = 'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.';
            passwordInput.setCustomValidity('Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.');
        }
    });

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Prevent form submission if inputs are invalid
    form.addEventListener('submit', (event) => {
        if (!validateEmail(emailInput.value) || !validatePhone(phoneInput.value) || !validatePassword(passwordInput.value)) {
            event.preventDefault();
            alert('Please correct the errors in the form.');
        } else if (emailExists(emailInput.value)) {
            event.preventDefault();
            alert('This email is already registered.');
        } else {
            const userDetails = {
                email: emailInput.value,
                phone: phoneInput.value,
                password: passwordInput.value,
                // add other fields as necessary
            };
            storeUserDetails(userDetails);
            successMessage.style.display = 'block'; // Show success message
        }
    });
});
