// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js';


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
    console.log("Show Edit Interface");
    document.querySelector('.dashboard-content').style.display = 'none';
    document.querySelector('.userdashboard-content').style.display = 'block';
    document.querySelector('.latest-content').style.display = 'none';
    document.getElementById('dashboardHeader').innerText = 'Edit Interface';
}

// Show the Latest Interface section and hide others
function showLatestInterface() {
    document.getElementById('dashboard-content').style.display = 'none';
    document.getElementById('userdashboard-content').style.display = 'none';
    document.getElementById('latest-content').style.display = 'block';
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

    if (animationName && categoryCount !== '' && animationVideoInput.files.length > 0) {
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
        document.getElementById("animationNameInput").value = '';
        document.getElementById("categoryCountInput").value = '';
        
        // Reset the file label and clear file input
        document.getElementById("fileLabel").textContent = "No file chosen";
        animationVideoInput.value = '';
    } else {
        alert("Please fill in all fields before adding the animation.");
    }
}

function filterCategory() {
    const selectedCategory = document.getElementById("categoryFilter").value.trim();
    const rows = document.querySelectorAll(".table-container tbody tr");

    rows.forEach(row => {
        const categoryCell = row.cells[0]; // Adjust index if category is in a different cell
        const rowCategory = categoryCell.textContent.trim();

        if (selectedCategory === '' || rowCategory === selectedCategory) {
            row.style.display = ''; // Show row
        } else {
            row.style.display = 'none'; // Hide row
        }
    });
}
/* hindi pa ginagamit
// d2 add function sa next button 
function loadNextModule() {
    const currentPage = document.getElementById("pageIndicator").innerText;

    if (currentPage === "Page 1 of 2") {
        // Show Page 2 content and hide Page 1 content
        document.getElementById("page2Content").style.display = 'block';
        document.getElementById("page1Content").style.display = 'none';
        document.getElementById("pageIndicator").innerText = "Page 2 of 2";
    } else if (currentPage === "Page 2 of 2") {
        // Show Page 1 content and hide Page 2 content
        document.getElementById("page1Content").style.display = 'block';
        document.getElementById("page2Content").style.display = 'none';
        document.getElementById("pageIndicator").innerText = "Page 1 of 2";
    }
} */

// Function to trigger the file input when the container is clicked
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

window.showDashboard = showDashboard;
window.showControlManagement = showControlManagement;
window.showLatestInterface = showLatestInterface;
window.toggleMainModule =toggleMainModule
window.addAnimation = addAnimation
window.filterCategory = filterCategory
window.triggerUpload = triggerUpload
window.replaceWithImage = replaceWithImage
window.saveContactInfo = saveContactInfo