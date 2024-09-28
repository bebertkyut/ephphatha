// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch users from Firestore
async function fetchUsers() {
    try {
      const usersCollection = collection(db, "UserAccount");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const tableBody = document.querySelector("tbody");
      tableBody.innerHTML = '';
      usersList.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.Name}</td>
          <td>${user.Status}</td>
          <td>${user.Email}</td>
          <td class="action-cell">
            <button class="action-button" onclick="toggleActions(this)">...</button>
            <div class="action-buttons">
              <div class="dropdown-item" onclick="editUser('${user.id}')">Edit</div>
              <div class="dropdown-item" onclick="removeUser('${user.id}')">Remove</div>
            </div>
          </td>
        `;
        tableBody.appendChild(row);
      });
  
      if (usersList.length === 0) {
        console.log("No users found in the collection.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  
// Function to toggle dropdown visibility
window.toggleActions = function(button) {
    const dropdown = button.nextElementSibling;
    const isVisible = dropdown.style.display === "block";
  
    // Hide all dropdowns first
    document.querySelectorAll('.action-buttons').forEach(d => {
      d.style.display = 'none';
    });
  
    // Toggle the current dropdown
    dropdown.style.display = isVisible ? 'none' : 'block';
  
    // Add event listener to document
    if (!isVisible) {
      document.addEventListener('click', function handleClickOutside(event) {
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
          dropdown.style.display = 'none';
          document.removeEventListener('click', handleClickOutside);
        }
      });
    }
  };
  
  window.editUser = function(userId) {
    console.log(`Edit user with ID: ${userId}`);
    // Implement edit functionality here
  };
  
  window.removeUser = function(userId) {
    console.log(`Remove user with ID: ${userId}`);
    // Implement remove functionality here
  };
  
// Function to open the modal
window.openModal = function() {
  document.getElementById('accountModal').style.display = 'block';
};

// Function to close the modal
window.closeModal = function() {
  document.getElementById('accountModal').style.display = 'none';
};

// Function to handle the submission of the form
window.addAccount = async function() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const status = document.getElementById('status').value;

  try {
    await addDoc(collection(db, "UserAccount"), {
      Name: name,
      Email: email,
      Password: password,
      Status: status
    });

    closeModal();

    fetchUsers();
  } catch (error) {
    console.error("Error adding account:", error);
  }
}

fetchUsers();
