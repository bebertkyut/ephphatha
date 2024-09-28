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
 
   // Check if the user is in the UsersAccount collection
   db.collection("UserAccount").where("Email", "==", email).where("Password", "==", password).get()
     .then((querySnapshot) => {
       if (!querySnapshot.empty) {
         // User found, redirect to user dashboard
         window.location.href = "dashboard.html";
       } else {
         // Check if the user is in the AdminAccount collection
         db.collection("AdminAccount").where("Email", "==", email).where("Password", "==", password).get()
           .then((querySnapshot) => {
             if (!querySnapshot.empty) {
               // Admin found, redirect to admin dashboard
               window.location.href = "AdminDashboard.html";
             } else {
               // No match found in either collection
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
