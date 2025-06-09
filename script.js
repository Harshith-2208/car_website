function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        alert("Password must be at least 8 characters long.");
        return false;
    }
    if (!hasUpperCase) {
        alert("Password must contain at least one uppercase letter.");
        return false;
    }
    if (!hasLowerCase) {
        alert("Password must contain at least one lowercase letter.");
        return false;
    }
    if (!hasNumber) {
        alert("Password must contain at least one number.");
        return false;
    }
    if (!hasSpecialChar) {
        alert("Password must contain at least one special character (e.g., !, @, #, etc.).");
        return false;
    }
    return true;
}

function signup() {
    const userId = document.querySelector('#signupForm input[placeholder="User Id"]').value;
    const password = document.querySelector('#signupForm input[placeholder="Password"]').value;

    if (!userId || !password) {
        alert("Please fill in all fields.");
        return;
    }

    if (!validatePassword(password)) {
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.userId === userId);
    if (userExists) {
        alert("User ID already exists. Please choose a different User ID.");
        return;
    }

    users.push({ userId, password });
    localStorage.setItem('users', JSON.stringify(users));

    const storedUsers = JSON.parse(localStorage.getItem('users'));
    console.log("Users stored in localStorage after signup:", storedUsers);
    if (storedUsers && storedUsers.length > 0) {
        alert("Signup successful! User data stored. Please log in.");
    } else {
        alert("Error: User data was not stored in localStorage. Please try again.");
        return;
    }

    showLoginForm();
}

function login() {
    const userId = document.querySelector('#loginForm input[placeholder="User Id"]').value;
    const password = document.querySelector('#loginForm input[placeholder="Password"]').value;

    if (!userId || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        alert("No users found in localStorage. Please sign up first by clicking 'Sign Up?' below.");
        return;
    }

    console.log("Retrieved users from localStorage during login:", users);

    const user = users.find(user => user.userId === userId && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log("Current user set in localStorage:", user);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid User ID or Password.");
    }
}

function showLoginForm() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
}

function showSignupForm() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
}

function goToLoginPage() {
    localStorage.removeItem('currentUser');
    window.location.href = "auth.html";
}

function triggerImageUpload() {
    document.getElementById('imageUploadInput').click();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert("Please upload an image file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result; 
        localStorage.setItem('tempCarImage', imageData); 
        const uploadedImage = document.getElementById('uploadedImage');
        uploadedImage.src = imageData;
        uploadedImage.style.display = 'block';
        document.getElementById('uploadIcon').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function submitCar() {
    const carName = document.getElementById('carNameInput').value.trim();
    const yearOfMfg = document.getElementById('yearOfMfgInput').value.trim();
    const colour = document.getElementById('colourInput').value.trim();
    const description = document.getElementById('descriptionInput').value.trim();
    const imageData = localStorage.getItem('tempCarImage');


    if (!carName) {
        alert("Car Name is required.");
        return;
    }
    if (carName.length < 2) {
        alert("Car Name must be at least 2 characters long.");
        return;
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(carName)) {
        alert("Car Name can only contain letters, numbers, and spaces.");
        return;
    }

    if (!yearOfMfg) {
        alert("Year of Manufacturing is required.");
        return;
    }
    const yearNum = parseInt(yearOfMfg);
    if (!/^\d{4}$/.test(yearOfMfg) || isNaN(yearNum)) {
        alert("Year of Manufacturing must be a 4-digit number (e.g., 2020).");
        return;
    }
    if (yearNum < 1900 || yearNum > 2025) {
        alert("Year of Manufacturing must be between 1900 and 2025.");
        return;
    }

    if (!colour) {
        alert("Colour is required.");
        return;
    }
    if (colour.length < 2) {
        alert("Colour must be at least 2 characters long.");
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(colour)) {
        alert("Colour can only contain letters and spaces.");
        return;
    }

    if (!description) {
        alert("Other Description is required.");
        return;
    }
    if (description.length < 10) {
        alert("Other Description must be at least 10 characters long.");
        return;
    }

    if (!imageData) {
        alert("Please upload an image for the car.");
        return;
    }

    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    cars.push({ carName, yearOfMfg, colour, description, imageData });
    localStorage.setItem('cars', JSON.stringify(cars));

    document.getElementById('carNameInput').value = '';
    document.getElementById('yearOfMfgInput').value = '';
    document.getElementById('colourInput').value = '';
    document.getElementById('descriptionInput').value = '';
    
    document.getElementById('uploadedImage').style.display = 'none';
    document.getElementById('uploadIcon').style.display = 'block';
    document.getElementById('imageUploadInput').value = '';
    localStorage.removeItem('tempCarImage'); 

    alert("Car submitted successfully!");

    window.location.href = "buy.html";
}

function goToBuyPage() {
    window.location.href = "buy.html";
}

function goToSellPage() {
    window.location.href = "sell.html";
}

function initiatePayment() {
    alert("Payment initiated successfully!");
}

function bookTestDrive() {
    alert("Test drive booked successfully! You will receive a confirmation soon.");
}