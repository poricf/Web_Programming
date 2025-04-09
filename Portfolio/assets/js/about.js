document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('themeSwitch');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(savedTheme);
        themeSwitch.checked = savedTheme === 'light-mode';
    }

    // Toggle theme on switch change
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });
});