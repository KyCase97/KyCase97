import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiA-CPBjHgdNMSkECYJ3D55S-OJWeRpNM",
  authDomain: "noir-b0cf8.firebaseapp.com",
  databaseURL:
    "https://noir-b0cf8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "noir-b0cf8",
  storageBucket: "noir-b0cf8.appspot.com",
  messagingSenderId: "265741421264",
  appId: "1:265741421264:web:5d6af087a996b58a9cecd5",
  measurementId: "G-CDZKCSXS56",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Function to get cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document.addEventListener("DOMContentLoaded", function () {
  // If Firebase token exists, redirect to main page
  const firebaseToken = getCookie("firebaseToken");
  if (!firebaseToken) {
    window.location.replace("login.html");
  }

  // Mendapatkan semua elemen input
  const inputElements = document.querySelectorAll("input");

  // Loop melalui setiap elemen input
  inputElements.forEach(function (input) {
    // Mengecek apakah ada nilai yang disimpan di localStorage
    const savedValue = localStorage.getItem(input.id);
    if (savedValue) {
      // Mengatur nilai input ke nilai yang disimpan di localStorage
      input.value = savedValue;
    }

    // Menyimpan nilai setiap kali input berubah
    input.addEventListener("input", function () {
      localStorage.setItem(input.id, input.value);
    });
  });
});
