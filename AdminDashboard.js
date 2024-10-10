import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAW65C2w8uxxDw9Va_GFOoCYQUVgm21cM4",
  authDomain: "ephphathadb.firebaseapp.com",
  projectId: "ephphathadb",
  storageBucket: "ephphathadb.appspot.com",
  messagingSenderId: "408778244868",
  appId: "1:408778244868:web:43bb14d52f45c4c5424651",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let userToRemoveId = null;

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
        <td>${user.Role}</td>
        <td>${user.Username}</td>
        <td>${user.Status || ''}</td> <!-- New Status column -->
        <td class="action-cell">
          <button class="action-button" onclick="toggleActions(this)">...</button>
          <div class="action-buttons">
            <div class="dropdown-item" onclick="editUser('${user.id}')">Edit</div>
            <div class="dropdown-item" onclick="removeUser('${user.id}')">Remove</div>
            <div class="dropdown-item" onclick="deactivateUser('${user.id}')">Deactivate</div>
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

// Function to edit user data
window.editUser = async function(userId) {
  const dropdown = event.target.closest('.action-buttons');
  if (dropdown) dropdown.style.display = 'none';

  try {
    const userDocRef = doc(db, "UserAccount", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      // Pre-fill the form with the user data
      document.getElementById('editName').value = userData.Name;
      document.getElementById('editUsername').value = userData.Username;
      document.getElementById('editPassword').value = userData.Password;
      document.getElementById('editRole').value = userData.Role;
      document.getElementById('editStatus').value = userData.Status || ''; // Pre-fill Status

      // Store the userId in a hidden input for updating
      document.getElementById('editUserId').value = userId;

      // Open the modal
      document.getElementById('editAccountModal').style.display = 'block';
    } else {
      console.error("No such user!");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

// Function to update user data
window.updateUser = async function() {
  const userId = document.getElementById('editUserId').value;
  const updatedName = document.getElementById('editName').value;
  const updatedUsername = document.getElementById('editUsername').value;
  const updatedPassword = document.getElementById('editPassword').value;
  const updatedRole = document.getElementById('editRole').value;
  const updatedStatus = document.getElementById('editStatus').value; // Get Status

  try {
    const userDocRef = doc(db, "UserAccount", userId);
    await updateDoc(userDocRef, {
      Name: updatedName,
      Username: updatedUsername,
      Password: updatedPassword,
      Role: updatedRole,
      Status: updatedStatus, // Update Status
    });

    closeEditModal();
    fetchUsers();
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

// Function to remove a user
window.removeUser = function(userId) {
  const dropdown = event.target.closest('.action-buttons');
  if (dropdown) dropdown.style.display = 'none';

  userToRemoveId = userId;

  document.getElementById('confirmRemoveModal').style.display = 'flex';
};

// Function to confirm removal of the user
document.getElementById('confirmRemoveButton').onclick = async function() {
  if (userToRemoveId) {
    try {
      const userDocRef = doc(db, "UserAccount", userToRemoveId);
      await deleteDoc(userDocRef);
      
      fetchUsers();
      
      closeConfirmModal();
    } catch (error) {
      console.error("Error removing user:", error);
    }
  }
};

// Function to close the confirmation modal
window.closeConfirmModal = function() {
  document.getElementById('confirmRemoveModal').style.display = 'none';
  userToRemoveId = null;
};

// Function to open the "Add Account" modal
window.openModal = function() {
  document.getElementById('accountModal').style.display = 'block';
};

// Function to close the "Add Account" modal
window.closeModal = function() {
  document.getElementById('accountModal').style.display = 'none';
};

// Function to close the "Edit Account" modal
window.closeEditModal = function() {
  document.getElementById('editAccountModal').style.display = 'none';
};

// Function to add a new account
window.addAccount = async function() {
  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  // Define the new fields
  const gender = "Select Gender"; // Default value
  const about = "Add Description"; // Default value
  const status = "Active"; // Default status
  const dateCreated = new Date(); // Current date
  const birthday = new Date();

  try {
    // Add the new user account
    await addDoc(collection(db, "UserAccount"), {
      Name: name,
      Username: username,
      Password: password,
      Role: role,
      Gender: gender,
      About: about,
      Status: status,
      DateCreated: dateCreated,
      Birthday: birthday,
    });

    closeModal(); // Close the modal after adding the user
    fetchUsers(); // Refresh the users list

    // Reset form fields
    document.getElementById('name').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('role').value = '';

  } catch (error) {
    console.error("Error adding account:", error);
  } // Missing closing bracket was added here
};

// Function to deactivate a user
window.deactivateUser = function(userId) {
  const dropdown = event.target.closest('.action-buttons');
  if (dropdown) dropdown.style.display = 'none';

  userToRemoveId = userId;

  // Open confirmation modal
  const confirmDeactivateModal = document.createElement('div');
  confirmDeactivateModal.innerHTML = `
    <div class="modal-content" style="display: flex; flex-direction: column;">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>Confirm Deactivation</h2>
      <p>Are you sure you want to deactivate this user?</p>
      <button id="confirmDeactivateButton">Yes, Deactivate</button>
      <button onclick="this.parentElement.parentElement.remove()">Cancel</button>
    </div>
  `;
  document.body.appendChild(confirmDeactivateModal);

  // Add event listener for confirmation button
  document.getElementById('confirmDeactivateButton').onclick = async function() {
    try {
      const userDocRef = doc(db, "UserAccount", userToRemoveId);
      await updateDoc(userDocRef, {
        Status: 'Inactive' // Update status to 'Inactive'
      });

      fetchUsers(); // Refresh the users list
      confirmDeactivateModal.remove(); // Close the modal
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
  };
};

// Initialize the user fetching on page load
fetchUsers();