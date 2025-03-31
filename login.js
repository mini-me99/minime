// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, setPersistence, browserLocalPersistence, browserSessionPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEzXf7HFkKe9zKsyeXmQnvnGKxexJgFxw",
    authDomain: "minimi-fd4a2.firebaseapp.com",
    projectId: "minimi-fd4a2",
    storageBucket: "minimi-fd4a2.firebasestorage.app",
    messagingSenderId: "648714372530",
    appId: "1:648714372530:web:321a7db9c00bd48c1850ab",
    measurementId: "G-7LFMLJKJNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const loginBox = document.querySelector('.login-box');
const signupBox = document.querySelector('.signup-box');
const showSignupBtn = document.getElementById('showSignup');
const showLoginBtn = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const googleLoginBtn = document.getElementById('googleLogin');

// Form switching animation
function switchForm(fromForm, toForm) {
    fromForm.style.animation = 'slideOut 0.5s ease forwards';
    setTimeout(() => {
        fromForm.classList.add('hidden');
        toForm.classList.remove('hidden');
        toForm.style.animation = 'slideIn 0.5s ease forwards';
    }, 500);
}

showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(loginBox, signupBox);
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(signupBox, loginBox);
});

// Google Sign In
googleLoginBtn.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log('Google Sign In Success:', result);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Google Sign In Error:', error);
            alert('Failed to sign in with Google. Please try again.');
        });
});

// Email/Password Sign In
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password);
        })
        .then((result) => {
            console.log('Email Sign In Success:', result);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Login Error:', error);
            alert('Failed to sign in. Please check your credentials and try again.');
        });
});

// Email/Password Sign Up
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Sign Up Success:', userCredential);
            return updateProfile(userCredential.user, {
                displayName: name
            });
        })
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Sign Up Error:', error);
            alert('Failed to create account. Please try again.');
        });
});

// Form validation animations
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach(group => {
    const input = group.querySelector('input');
    const label = group.querySelector('label');
    const line = group.querySelector('.line');

    input.addEventListener('focus', () => {
        label.classList.add('active');
        line.classList.add('active');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('active');
            line.classList.remove('active');
        }
    });
});

// Check if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = 'index.html';
    }
}); 