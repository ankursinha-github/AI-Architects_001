function navigateToProfile() {

    document.querySelectorAll('.childCard').forEach((el, index, arr) => {
        if (index == 0) {
            el.addEventListener("click", prakashLinkedIn)
        }
        else if (index == 1) {
            el.addEventListener("click", atulLinkedIn)
        }
        else if (index == 2) {
            el.addEventListener("click", ankurLinkedIn)
        }
        else if (index == 3) {
            el.addEventListener("click", shashankLinkedIn)
        }
        else if (index == 4) {
            el.addEventListener("click", nandhaKishoreLinkedIn)
        }

    })

    function prakashLinkedIn() {
        window.location.href = "https://www.linkedin.com/in/prakash-paudel-226501251/"
    }

    function atulLinkedIn() {
        window.location.href = "https://www.linkedin.com/in/atul-raman-83b7291a3/"
    }

    function ankurLinkedIn() {
        window.location.href = "https://www.linkedin.com/in/ankur-sinha-a4449831a/"
    }

    function shashankLinkedIn() {
        window.location.href = "https://www.linkedin.com/in/shashanksinha4444/"
    }

    // function nandhaKishoreLinkedIn(){
    //     window.location.href = 
    // }

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

navigateToProfile()