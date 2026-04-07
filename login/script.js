// Check if already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = '../tajwid/index.html';
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMessage');

    if (user === 'Muslim' && pass === 'Muslim1234') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '../tajwid/index.html';
    } else {
        errorMsg.classList.remove('hidden');
        setTimeout(() => errorMsg.classList.add('hidden'), 3000);
    }
});

// Toggle Dark Mode based on system
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
// SW Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js')
            .then(reg => console.log('SW Registered'))
            .catch(err => console.log('SW Error: ', err));
    });
}