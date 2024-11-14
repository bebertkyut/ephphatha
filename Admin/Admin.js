// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore, doc, setDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js';


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
  const db = getFirestore(app);
  const storage = getStorage(app);

  
// Toggle visibility of widgets on click
document.querySelectorAll('.widget').forEach(widget => {
    widget.addEventListener('click', () => {
        widget.style.display = widget.style.display === 'none' ? 'block' : 'none';
        console.log("Widget toggled:", widget);
    });
});

// Show the Dashboard section and hide others
function showDashboard() {
    console.log("Show Dashboard");
    document.querySelector('.dashboard-content').style.display = 'block';
    document.querySelector('.userdashboard-content').style.display = 'none';
    document.querySelector('.latest-content').style.display = 'none';
    document.getElementById('dashboardHeader').innerText = 'Dashboard';
}

// Show the Control Management Interface section and hide others
function showControlManagement() {
    console.log("Show Control Management");
    document.querySelector('.dashboard-content').style.display = 'none';
    document.querySelector('.userdashboard-content').style.display = 'block';
    document.querySelector('.latest-content').style.display = 'none';
    document.getElementById('dashboardHeader').innerText = 'Control Management';
}

// Show the Latest Interface section and hide others
function showLatestInterface() {
    console.log("Show Latest Interface");
    document.getElementById('dashboard-content').style.display = 'none';
    document.getElementById('userdashboard-content').style.display = 'none';
    document.getElementById('latest-content').style.display = 'block';
    document.getElementById('dashboardHeader').innerText = 'Latest Interface';
}

function toggleMainModule(moduleId) {
    console.log("Toggling module:", moduleId);
    // Hide all sections
    const modules = document.querySelectorAll('.main-admin-module');
    modules.forEach(module => {
        module.style.display = 'none';
    });

    // Show the selected section
    const selectedModule = document.getElementById(moduleId);
    if (selectedModule) {
        console.log("Showing module:", moduleId);
        selectedModule.style.display = 'block';
    }
}

  // Add new category to the table
  function addAnimation() {
    const animationName = document.getElementById("animationNameInput").value;
    const categoryCount = document.getElementById("categoryCountInput").value;
    const animationVideoInput = document.getElementById("animationVideoInput");

    if (
      animationName &&
      categoryCount !== "" &&
      animationVideoInput.files.length > 0
    ) {
      const tableBody = document.querySelector(".table-container tbody");

      const newRow = document.createElement("tr");

      // Category name cell
      const nameCell = document.createElement("td");
      nameCell.textContent = categoryCount;

      // Animation name cell
      const countCell = document.createElement("td");
      countCell.textContent = animationName;

      // Video file name cell
      const videoCell = document.createElement("td");
      const fileName = animationVideoInput.files[0].name;
      const fileNameText = document.createTextNode(fileName);
      videoCell.appendChild(fileNameText);

      // Actions cell
      const actionsCell = document.createElement("td");
      actionsCell.classList.add("actions");

      // Edit button
      const editButton = document.createElement("button");
      editButton.title = "Edit";
      editButton.innerHTML = "&#9998; Edit";
      actionsCell.appendChild(editButton);

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.title = "Delete";
      deleteButton.innerHTML = "&#128465; Delete";
      actionsCell.appendChild(deleteButton);

      // Add cells to new row
      newRow.appendChild(nameCell);
      newRow.appendChild(countCell);
      newRow.appendChild(videoCell);
      newRow.appendChild(actionsCell);

      // Append new row to the table body
      tableBody.appendChild(newRow);

      // Clear the input fields after adding the row
      document.getElementById("animationNameInput").value = "";
      document.getElementById("categoryCountInput").value = "";

      // Reset the file label and clear file input
      document.getElementById("fileLabel").textContent = "No file chosen";
      animationVideoInput.value = "";
    } else {
      alert("Please fill in all fields before adding the animation.");
    }
  }
  

function filterCategory() {
  const selectedCategory = document
    .getElementById("categoryFilter")
    .value.trim();
  const rows = document.querySelectorAll(".table-container tbody tr");

  rows.forEach((row) => {
    const categoryCell = row.cells[0]; // Adjust index if category is in a different cell
    const rowCategory = categoryCell.textContent.trim();

    if (selectedCategory === "" || rowCategory === selectedCategory) {
      row.style.display = ""; // Show row
    } else {
      row.style.display = "none"; // Hide row
    }
  });
}


function loadNextModule() {
    const page1 = document.getElementById("page1Content");
    const page2 = document.getElementById("page2Content");
  
    // If page1 is visible, switch to page2
    if (page1.style.display !== "none") {
      page1.style.display = "none";
      page2.style.display = "block";
    } 
    // If page2 is visible, switch to page1
    else if (page2.style.display !== "none") {
      page1.style.display = "block";
      page2.style.display = "none";
    }
  }


// Function to trigger the file input
function triggerUpload(inputId) {
    document.getElementById(inputId).click();
}

// Function to replace the container content with the selected image
function replaceWithImage(inputId, containerId) {
    const inputFile = document.getElementById(inputId);
    const container = document.getElementById(containerId);

    if (inputFile.files && inputFile.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            container.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="width: 100%; height: 100%; object-fit: cover;">`;
        };
        reader.readAsDataURL(inputFile.files[0]);
    }
}

// Function to save contact info and upload image to Firebase
async function saveContactInfo() {
    // Get the selected file from the file input
    const fileInput = document.getElementById('aboutFileInput');
    const file = fileInput.files[0];

    if (file) {
        try {
            // Create a reference to the file in Firebase Storage under 'DynamicPagesPictures'
            const aboutImageRef = ref(storage, `DynamicPagesPictures/${file.name}`);
            
            // Upload the file to Firebase Storage
            await uploadBytes(aboutImageRef, file);
            
            // Get the download URL of the uploaded image
            const downloadURL = await getDownloadURL(aboutImageRef);

            // Reference to the Firestore document
            const firestoreRef = doc(db, 'DynamicPages', 'LoginPage');
            
            // Save the URL to Firestore in the specified location
            await setDoc(firestoreRef, {
                AboutImage: downloadURL
            }, { merge: true });

            console.log("Image URL saved to Firestore successfully:", downloadURL);
        } catch (error) {
            console.error("Error uploading image or saving URL to Firestore:", error);
        }
    } else {
        console.warn("No file selected to upload.");
    }

    // Here you could also save other contact information if needed
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;
    const address = document.getElementById('contactAddress').value;

    // Update Firestore with contact information
    const contactRef = doc(db, 'DynamicPages', 'LoginPage');
    await setDoc(contactRef, {
        ContactPhone: phone,
        ContactEmail: email,
        ContactAddress: address
    }, { merge: true });

    console.log("Contact information saved to Firestore successfully.");
}

// Function to count animations in Firebase Storage
async function countAnimations() {
    try {
        // Reference to the folder where animations are stored in Firebase Storage
        const animationsRef = ref(storage, 'Animations'); // Replace 'Animations' with your specific folder name
        
        // List all files in the specified folder
        const list = await listAll(animationsRef);

        // Get the total count of items in the folder
        const totalAnimations = list.items.length;

        // Display the total count in the "Total Animation" stat card
        document.querySelector('.stat-card:nth-child(2) h3').textContent = totalAnimations;
    } catch (error) {
        console.error("Error counting animations:", error);
    }
}

// Call the countAnimations function when the page loads
countAnimations();

// Function to count users in Firestore
async function countUsers() {
    try {
        // Reference to the UserAccount collection
        const userAccountCollection = collection(db, 'UserAccount');
        
        // Get all documents in the UserAccount collection
        const userSnapshot = await getDocs(userAccountCollection);
        
        // Count the number of documents
        const totalUsers = userSnapshot.size;

        // Display the total count in the "Total Users" stat card
        document.querySelector('.stat-card:nth-child(3) h3').textContent = totalUsers;
    } catch (error) {
        console.error("Error counting users:", error);
    }
}

// Call the countUsers function when the page loads
countUsers()

window.showControlManagemen = showDashboard;
window.loadNextModule = loadNextModule;
window.showDashboard = showDashboard;
window.showControlManagement = showControlManagement;
window.showLatestInterface = showLatestInterface;
window.toggleMainModule =toggleMainModule;
window.addAnimation = addAnimation;
window.filterCategory = filterCategory;
window.triggerUpload = triggerUpload;
window.replaceWithImage = replaceWithImage;
window.saveContactInfo = saveContactInfo;