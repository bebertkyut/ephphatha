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
        <td>${user.Status || ''}</td>
        <td class="action-cell">
          <button class="action-button" onclick="toggleActions(this)">...</button>
          <div class="action-buttons">
            <div class="dropdown-item" onclick="editUser('${user.id}')">Edit</div>
            <div class="dropdown-item" onclick="removeUser('${user.id}')">Remove</div>
            <div class="dropdown-item" onclick="deactivateUser('${user.id}', '${user.Status}')">${user.Status === 'Inactive' ? 'Activate' : 'Deactivate'}</div>
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
      
      // Pre-select the user's current role in the dropdown
      const editRoleDropdown = document.getElementById('editRole');
      editRoleDropdown.value = userData.Role; 

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

  try {
    const userDocRef = doc(db, "UserAccount", userId);
    await updateDoc(userDocRef, {
      Name: updatedName,
      Username: updatedUsername,
      Password: updatedPassword,
      Role: updatedRole,
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
  document.getElementById('name').value = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('confirmPassword').value = '';
  document.getElementById('role').value = '';

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
  const confirmPassword = document.getElementById('confirmPassword').value;
  const role = document.getElementById('role').value;

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return;
  }

  // Define the new fields
  const gender = "Select Gender"; 
  const about = "Add Description"; 
  const status = "Active";
  const dateCreated = new Date(); 
  const birthday = "Select Birthday";

  // Default profile picture URL from Firebase Storage. Do not touch.
  const pictureURL = "https://firebasestorage.googleapis.com/v0/b/ephphathadb.appspot.com/o/profile_pictures%2Fdefault-user.png?alt=media";

  try {
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
      PictureURL: pictureURL 
    });

    closeModal();
    fetchUsers(); 
    
  } catch (error) {
    console.error("Error adding account:", error);
  }
};

// Function to deactivate a user
window.deactivateUser = function(userId, currentStatus) {
  const dropdown = event.target.closest('.action-buttons');
  if (dropdown) dropdown.style.display = 'none';

  userToRemoveId = userId;

  // Display the confirmation modal for deactivation or activation
  const deactivateModal = document.getElementById('confirmDeactivateModal');
  deactivateModal.style.display = 'block';

  const confirmButton = document.getElementById('confirmDeactivateButton');

  if (currentStatus === 'Inactive') {
    document.querySelector('#confirmDeactivateModal h2').textContent = 'Confirm Activation';
    document.querySelector('#confirmDeactivateModal p').textContent = 'Are you sure you want to activate this account?';
    confirmButton.textContent = 'Yes, Activate';
  } else {
    document.querySelector('#confirmDeactivateModal h2').textContent = 'Confirm Deactivation';
    document.querySelector('#confirmDeactivateModal p').textContent = 'Are you sure you want to deactivate this account?';
    confirmButton.textContent = 'Yes, Deactivate';
  }

  // Add event listener for confirmation button
  confirmButton.onclick = async function() {
    try {
      const userDocRef = doc(db, "UserAccount", userToRemoveId);
      if (currentStatus === 'Inactive') {
        // Change status to 'Active'
        await updateDoc(userDocRef, {
          Status: 'Active'
        });
      } else {
        // Change status to 'Inactive'
        await updateDoc(userDocRef, {
          Status: 'Inactive'
        });
      }

      fetchUsers(); 
      deactivateModal.style.display = 'none'; 
    } catch (error) {
      console.error(`Error ${currentStatus === 'Inactive' ? 'activating' : 'deactivating'} user:`, error);
    }
  };
};

// Function to close the deactivation/activation confirmation modal
window.closeDeactivateModal = function() {
  document.getElementById('confirmDeactivateModal').style.display = 'none';
};

// Function to activate a user
window.activateUser = function(userId) {
  const dropdown = event.target.closest('.action-buttons');
  if (dropdown) dropdown.style.display = 'none';

  userToRemoveId = userId;

  // Display the confirmation modal for activation
  const activateModal = document.getElementById('confirmDeactivateModal'); 
  activateModal.querySelector('h2').textContent = 'Confirm Activation'; 
  activateModal.querySelector('p').textContent = 'Are you sure you want to activate this account?'; 
  activateModal.style.display = 'block';

  // Add event listener for confirmation button
  const confirmButton = document.getElementById('confirmDeactivateButton');
  confirmButton.onclick = async function() {
    try {
      const userDocRef = doc(db, "UserAccount", userToRemoveId);
      await updateDoc(userDocRef, {
        Status: 'Active' 
      });

      fetchUsers(); 
      activateModal.style.display = 'none'; 
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };
};

// Initialize the user fetching on page load
fetchUsers();