document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list ul");
  const loginBtn = document.getElementById("loginBtn");
  const loginForm = document.getElementById("loginForm");
  const closeBtn = document.getElementById("closeBtn");


  hamburger.addEventListener("click", function () {
    navList.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  loginBtn.addEventListener("click", function () {
    loginForm.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
    loginForm.style.display = "none";
  });
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

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('Email').value;
  const password = document.getElementById('Password').value;

  db.collection("UserAccount").where("Email", "==", email).where("Password", "==", password).get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userName = userData.Name;
          const userStatus = userData.Status;
          
          // Store user data in localStorage
          localStorage.setItem('userName', userName);
          localStorage.setItem('userStatus', userStatus);

          window.location.href = "dashboard.html";
        });
      } else {
        db.collection("AdminAccount").where("Email", "==", email).where("Password", "==", password).get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              window.location.href = "admin-dashboard.html";
            } else {
              document.getElementById("error-message").innerText = "Invalid login credentials";
            }
          })
          .catch((error) => {
            console.error("Error getting admin documents: ", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error getting user documents: ", error);
    });
});
