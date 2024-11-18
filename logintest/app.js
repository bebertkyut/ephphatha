// Firebase configuration (replace this with your actual Firebase config)
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

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  db.collection("UserAccount").where("Email", "==", email).where("Password", "==", password).get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userName = userData.Name;
          const userStatus = userData.Status;
          
          localStorage.setItem('userName', userName);
          localStorage.setItem('userStatus', userStatus);

          window.location.href = "user-dashboard.html";
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
