document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list ul");
  const loginBtn = document.getElementById("loginBtn");
  const loginForm = document.getElementById("loginForm");
  const closeBtn = document.getElementById("closeBtn");
  const submitBtn = document.getElementById("submit");
  const errorMessage = document.getElementById("error-message");

  // Toggle Navigation Menu
  hamburger.addEventListener("click", function () {
    navList.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Show Login Form
  loginBtn.addEventListener("click", function () {
    loginForm.style.display = "flex";
  });

  // Hide Login Form
  closeBtn.addEventListener("click", function () {
    loginForm.style.display = "none";
    errorMessage.innerText = ""; // Clear any previous error messages
  });

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW65C2w8uxxDw9Va_GFOoCYQUVgm21cM4",
  authDomain: "ephphathadb.firebaseapp.com",
  projectId: "ephphathadb",
  storageBucket: "ephphathadb.appspot.com",
  messagingSenderId: "408778244868",
  appId: "1:408778244868:web:43bb14d52f45c4c5424651",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const loginFormElement = document.getElementById('loginFormElement');
loginFormElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('Username').value.trim();
  const password = document.getElementById('Password').value.trim();

  if (!username || !password) {
    errorMessage.innerText = "Please enter both username and password.";
    return;
  }

  // Query UserAccount Collection
  db.collection("UserAccount")
    .where("Username", "==", username)
    .where("Password", "==", password)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data(); //Info from firestore
          //Name and Status in Firestore
          const userName = userData.Name; 
          const userStatus = userData.Status;

          // Check if the account is active
          if (userStatus === "Active") {
            // Store user data in localStorage
            localStorage.setItem('userName', userName);
            localStorage.setItem('userStatus', userStatus);

            // Redirect to user dashboard
            window.location.href = "../UserDashboard/dashboard.html";
          } else {
            // If status is Inactive
            errorMessage.innerText = "The Account is Inactive.";
          }
        });
      } else {
        // If not found in UserAccount, check AdminAccount
        db.collection("AdminAccount")
          .where("Username", "==", username)
          .where("Password", "==", password)
          .get()
          .then((adminSnapshot) => {
            if (!adminSnapshot.empty) {
              // Redirect to Admin Dashboard
              window.location.href = "Admin/AdminDashboard.html";
            } else {
              // Display error message
              errorMessage.innerText = "Invalid login credentials.";
            }
          })
          .catch((error) => {
            console.error("Error getting admin documents: ", error);
            errorMessage.innerText = "An error occurred. Please try again later.";
          });
      }
    })
    .catch((error) => {
      console.error("Error getting user documents: ", error);
      errorMessage.innerText = "An error occurred. Please try again later.";
    });
});
});