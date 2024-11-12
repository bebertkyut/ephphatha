// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW65C2w8uxxDw9Va_GFOoCYQUVgm21cM4",
  authDomain: "ephphathadb.firebaseapp.com",
  projectId: "ephphathadb",
  storageBucket: "ephphathadb.appspot.com",
  messagingSenderId: "408778244868",
  appId: "1:408778244868:web:43bb14d52f45c4c5424651",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Make db available globally

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list ul");
  const loginBtn = document.getElementById("loginBtn");
  const loginForm = document.getElementById("loginForm");
  const closeBtn = document.getElementById("closeBtn");
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
    errorMessage.innerText = ""; // Clear previous error messages
  });

  // Login Form Submission
  const loginFormElement = document.getElementById('loginFormElement');
  loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('Username').value.trim();
    const password = document.getElementById('Password').value.trim();

    if (!username || !password) {
      errorMessage.innerText = "Please enter both username and password.";
      return;
    }

    // Fetch UserAccount Collection
    getDocs(collection(db, "UserAccount"))
      .then((querySnapshot) => {
        let userFound = false;

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.Username === username && userData.Password === password) {
            userFound = true;
            const userStatus = userData.Status;
            if (userStatus === "Active") {
              localStorage.setItem('userName', userData.Name);
              localStorage.setItem('userRole', userData.Role);
              window.location.href = "UserDashboard/dashboard.html";
            } else {
              errorMessage.innerText = "The Account is Inactive.";
            }
          }
        });

        if (!userFound) {
          // Check AdminAccount Collection
          getDocs(collection(db, "AdminAccount"))
            .then((adminSnapshot) => {
              let adminFound = false;

              adminSnapshot.forEach((adminDoc) => {
                const adminData = adminDoc.data();
                if (adminData.Username === username && adminData.Password === password) {
                  adminFound = true;
                  window.location.href = "Admin/AdminDashboard.html";
                }
              });

              if (!adminFound) {
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

// Function to fetch and display images for DynamicPages
async function fetchDynamicPageImages(pageName) {
  try {
    const querySnapshot = await getDocs(collection(db, "DynamicPages"));

    querySnapshot.forEach((doc) => {
      const pageData = doc.data();
      if (doc.id === pageName) { 
        const imageContainer = document.getElementById("imageContainer");
        imageContainer.innerHTML = ""; // Clear existing images
    
        pageData.HeaderImages.forEach((url) => {
          const img = document.createElement("img");
          img.src = url;
          img.alt = "Dynamic Image";
          img.classList.add("dynamic-image");
          imageContainer.appendChild(img);
        });
      }
    });
  } catch (error) {
    console.error("Error fetching images for DynamicPages:", error);
  }
}

// Function to fetch and update the About image from Firestore
async function updateAboutImage() {
  const docRef = doc(db, "DynamicPages", "LoginPage"); 
  const docSnap = await getDoc(docRef);
  const aboutImageUrl = docSnap.data().AboutImage;
  const aboutHeroContainer = document.querySelector(".about-hero");

  const imgElement = document.createElement("img");
  imgElement.src = aboutImageUrl;
  imgElement.alt = "About Header Image";

  aboutHeroContainer.innerHTML = ""; 
  aboutHeroContainer.appendChild(imgElement);
}

// Function to fetch contact details from Firestore
async function fetchContactDetails() {
  try {
    const docRef = doc(db, "DynamicPages", "LoginPage"); 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById('contactPhone').textContent = data.ContactPhone || 'Phone number not available';
      document.getElementById('contactEmail').textContent = data.ContactEmail || 'Email not available';
      document.getElementById('contactAddress').textContent = data.ContactAddress || 'Address not available';
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching contact details: ", error);
  }
}

window.onload = function() {
  updateAboutImage();
  fetchDynamicPageImages("LoginPage");
  fetchContactDetails();
};
