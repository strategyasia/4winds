// Simple authentication config
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Simple authentication check
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Set session
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('loginTime', new Date().getTime());

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Show error message
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.classList.add('show');

        // Hide error after 3 seconds
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
    }
});
