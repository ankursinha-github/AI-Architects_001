function copyToClipboard(button) {
    const codeBlock = button.closest('.code_block');
    const codeElement = codeBlock.querySelector('pre code');
    let codeText = codeElement.textContent;

    // Trim leading and trailing whitespace from each line
    const trimmedCodeText = codeText.split('\n').map(line => line.trimStart()).join('\n');

    navigator.clipboard.writeText(trimmedCodeText).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = "green";

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = "#3498db";
        }, 2000);
        
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

// Scroll effect for the navbar
window.onscroll = function () {
    const nav = document.querySelector("nav");
    const scrollButton = document.querySelector(".scroll-to-top");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        nav.classList.add("scrolled");
        scrollButton.style.display = "block"; // Show scroll to top button
    } else {
        nav.classList.remove("scrolled");
        scrollButton.style.display = "none"; // Hide scroll to top button
    }
};

// Toggle hamburger menu
function toggleMenu() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
}

// Toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark");
    const themeButton = document.querySelector(".nav-buttons .btn-signup");
    themeButton.textContent = body.classList.contains("dark") ? "Light Theme" : "Dark Theme";
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}