function openRegister() {
    window.location.href = "register.html";
}

function openLogin(){
    window.location.href = "login.html";
}

// Check login status on load
window.onload = function () {
    const user = localStorage.getItem("loggedInUser");
    
    // Handle navigation links (common to all pages)
    if (user) {
        document.getElementById("login-link").style.display = "none";
        document.getElementById("logout-link").style.display = "block";
    }

    // Handle home page specific elements
    const bulletinBoard = document.getElementById("bulletinBoard");
    const authButtons = document.getElementById("authButtons");
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (bulletinBoard && authButtons && welcomeMessage) {  // Check if we're on home page
        if (user) {
            bulletinBoard.style.display = "block";
            authButtons.style.display = "none";
            welcomeMessage.style.display = "block";
        } else {
            bulletinBoard.style.display = "none";
            authButtons.style.display = "block";
            welcomeMessage.style.display = "none";
        }
    }

    // Handle register page specific elements
    const registerHeading = document.getElementById("register-heading");
    const alreadyLoggedIn = document.getElementById("already-logged-in");
    const contentContainer = document.querySelector(".content-container");

    if (registerHeading && alreadyLoggedIn && contentContainer) {  // Check if we're on register page
        if (user) {
            alreadyLoggedIn.style.display = "block";
            registerHeading.style.display = "none";
            contentContainer.style.display = "none";
        } else {
            alreadyLoggedIn.style.display = "none";
            registerHeading.style.display = "block";
            contentContainer.style.display = "block";
        }
    }
};

// Register Form Submission
document.getElementById("register-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const fullName = document.getElementById("fullName").value;


    // Check if email is already registered
    if (localStorage.getItem(email)) {
        alert("Email already registered. Please log in.");
        return;
    }
    // Password match check
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Store user data
    localStorage.setItem(email, JSON.stringify({ password }));
    localStorage.setItem("loggedInUser", email);
    localStorage.setItem("fullName", fullName);
    alert("Registration successful!");
    window.location.href = "home.html";

});

// Login Form Submission
document.getElementById("login-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem(email));
    if (!user) {
        alert("No account found with that email. Please register.");
        return;
    }
    if (user.password !== password) {
        alert("Incorrect password.");
        return;
    }

    localStorage.setItem("loggedInUser", email);
    alert("Login successful!");
    window.location.href = "home.html";
});

// Logout Function
document.getElementById("logout-link")?.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
    window.location.reload();
});

let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel-image');

function showNextImage() {
  images[currentImageIndex].style.display = 'none';
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].style.display = 'block';
}

function showPrevImage() {
    images[currentImageIndex].style.display = 'none';
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    images[currentImageIndex].style.display = 'block';
}

setInterval(showNextImage, 5000);
