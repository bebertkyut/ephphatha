// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore, doc, setDoc, collection, getDocs, updateDoc, arrayUnion, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
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
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = "Uploaded Image";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover"; 
            container.innerHTML = '';
            container.appendChild(img);
        };

        reader.readAsDataURL(inputFile.files[0]);
    }
}

// Function to save contact info and upload image to Firebase
async function saveContactInfo() {
    const fileInput = document.getElementById('aboutFileInput');
    const file = fileInput.files[0];

    if (file) {
        try {
            const aboutImageRef = ref(storage, `DynamicPagesPictures/${file.name}`);
            
            await uploadBytes(aboutImageRef, file);

            const downloadURL = await getDownloadURL(aboutImageRef);
            const firestoreRef = doc(db, 'DynamicPages', 'LoginPage');
            
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
        const animationsRef = ref(storage, 'Animations'); 
        const list = await listAll(animationsRef);
        const totalAnimations = list.items.length;

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
        const userAccountCollection = collection(db, 'UserAccount');
        const userSnapshot = await getDocs(userAccountCollection);
        const totalUsers = userSnapshot.size;

        document.querySelector('.stat-card:nth-child(3) h3').textContent = totalUsers;
    } catch (error) {
        console.error("Error counting users:", error);
    }
}

// Call the countUsers function when the page loads
countUsers()

// Function to fetch the Animations and populate the table
async function fetchSignAssets() {
  const categoryTableBody = document.getElementById('categoryTableBody');
  
  try {
    const signAssetCollection = collection(db, 'SignAsset');
    const snapshot = await getDocs(signAssetCollection);
    
    snapshot.forEach(doc => {
      const category = doc.id;
      const data = doc.data();  

      if (data) {
        for (const [field, videoUrl] of Object.entries(data)) {
          const row = document.createElement('tr');
          
          const categoryCell = document.createElement('td');
          categoryCell.textContent = category; 
          row.appendChild(categoryCell);

          const nameCell = document.createElement('td');
          nameCell.textContent = field;  
          row.appendChild(nameCell);

          const videoCell = document.createElement('td');
          const videoLink = document.createElement('a');
          videoLink.href = '#';
          videoLink.textContent = 'Watch Video';
          videoLink.addEventListener('click', (event) => {
            event.preventDefault();
            showVideoModal(videoUrl); 
          });
          videoCell.appendChild(videoLink);
          row.appendChild(videoCell);

          const actionsCell = document.createElement('td');
          const actionButton = document.createElement('button');
          actionButton.textContent = 'Delete';
          actionButton.classList.add('delete-button');
          actionButton.addEventListener('click', () => {
            showDeleteConfirmation(doc.id, field);
          });
          actionsCell.appendChild(actionButton);
          row.appendChild(actionsCell);

          categoryTableBody.appendChild(row);
        }
      } else {
        console.warn(`Missing data in document: ${doc.id}`);
      }
    });
  } catch (error) {
    console.error('Error getting documents:', error);
  }
}

// Function to show the delete confirmation overlay
function showDeleteConfirmation(category, field) {
  const overlay = document.getElementById('deleteConfirmationOverlay');
  const confirmBtn = document.getElementById('confirmDeleteBtn');
  const cancelBtn = document.getElementById('cancelDeleteBtn');
  
  overlay.style.display = 'flex';
  
  // Confirm button event
  confirmBtn.onclick = async () => {
    try {
      await deleteSignAsset(category, field);
      overlay.style.display = 'none';
      alert('Sign asset deleted successfully!');
      fetchSignAssets();
    } catch (error) {
      console.error('Error deleting sign asset:', error);
      alert('An error occurred while deleting the sign asset.');
    }
  };

  cancelBtn.onclick = () => {
    overlay.style.display = 'none';
  };
}

// Function to delete a sign asset from Firestore
async function deleteSignAsset(category, field) {
  const signAssetDocRef = doc(db, 'SignAsset', category);
  const signAssetDoc = await getDoc(signAssetDocRef);

  if (signAssetDoc.exists()) {
    const data = signAssetDoc.data();
    delete data[field]; 

    await updateDoc(signAssetDocRef, data);
  }
}

// Show video in an overlay modal
function showVideoModal(videoUrl) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  modal.appendChild(overlay);

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('modal-video-container');
  
  const video = document.createElement('video');
  video.src = videoUrl;
  video.controls = true;
  video.autoplay = true;
  video.classList.add('modal-video');
  videoContainer.appendChild(video);
  
  // Close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.classList.add('modal-close-button');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  videoContainer.appendChild(closeButton);

  modal.appendChild(videoContainer);
  document.body.appendChild(modal);
}

// Call the function to fetch data when the page loads
document.addEventListener('DOMContentLoaded', fetchSignAssets);

// Fetch and populate the category filter dropdown with document IDs from the SignAsset collection
async function populateCategoryDropdown() {
  const categoryFilter = document.getElementById('categoryFilter');
  
  try {
    const signAssetCollection = collection(db, 'SignAsset');
    const snapshot = await getDocs(signAssetCollection);
    
    snapshot.forEach(doc => {
      const option = document.createElement('option');
      option.value = doc.id; 
      option.textContent = doc.id; 
      categoryFilter.appendChild(option);
    });
  } catch (error) {
    console.error('Error getting documents:', error);
  }
}

// Function to fetch the data for a specific category and display it in the table
async function fetchCategoryData(categoryId) {
  const categoryTableBody = document.getElementById('categoryTableBody');
  categoryTableBody.innerHTML = ''; 

  try {
    const signAssetDocRef = doc(db, 'SignAsset', categoryId);
    const signAssetDoc = await getDoc(signAssetDocRef);

    if (signAssetDoc.exists()) {
      const data = signAssetDoc.data();

      // Populate the table with the data from the selected category
      for (const [field, videoUrl] of Object.entries(data)) {
        const row = document.createElement('tr');

        const categoryCell = document.createElement('td');
        categoryCell.textContent = categoryId;
        row.appendChild(categoryCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = field;
        row.appendChild(nameCell);

        const videoCell = document.createElement('td');
        const videoLink = document.createElement('a');
        videoLink.href = '#';
        videoLink.textContent = 'Watch Video';
        videoLink.addEventListener('click', (event) => {
          event.preventDefault();
          showVideoModal(videoUrl);
        });
        videoCell.appendChild(videoLink);
        row.appendChild(videoCell);

        const actionsCell = document.createElement('td');
        const actionButton = document.createElement('button');
        actionButton.textContent = 'Delete';
        actionButton.classList.add('delete-button');
        actionsCell.appendChild(actionButton);
        row.appendChild(actionsCell);

        categoryTableBody.appendChild(row);
      }
    } else {
      console.warn(`No data found for category: ${categoryId}`);
    }
  } catch (error) {
    console.error('Error getting category data:', error);
  }
}

// Event listener for category selection
document.getElementById('categoryFilter').addEventListener('change', (event) => {
  const selectedCategory = event.target.value;
  if (selectedCategory) {
    fetchCategoryData(selectedCategory); 
  } else {
    fetchSignAssets();
  }
});

// Call the function to populate the category filter on page load
document.addEventListener('DOMContentLoaded', () => {
  populateCategoryDropdown();
  fetchSignAssets();
});

// Function to fetch HeaderImages from Firestore and display them with Remove buttons
async function populateHeaderImages() {
  const headerImagesContainer = document.getElementById('headerImagesContainer');
  headerImagesContainer.innerHTML = '';

  try {
    const loginPageDocRef = doc(db, 'DynamicPages', 'LoginPage');
    const loginPageDoc = await getDoc(loginPageDocRef);

    if (loginPageDoc.exists()) {
      const headerImages = loginPageDoc.data().HeaderImages;

      if (Array.isArray(headerImages)) {
        headerImages.forEach((imageUrl, index) => {
          const imageWrapper = document.createElement('div');
          imageWrapper.classList.add('image-wrapper');

          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          imgElement.alt = 'Header Image';
          imgElement.classList.add('header-image'); 

          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.classList.add('remove-button');
          removeButton.addEventListener('click', () => {
            showConfirmationOverlay(() => removeImage(index, imageUrl)); 
          });

          imageWrapper.appendChild(imgElement);
          imageWrapper.appendChild(removeButton);
          headerImagesContainer.appendChild(imageWrapper);
        });
      } else {
        console.warn('No HeaderImages array found in LoginPage document.');
      }
    } else {
      console.warn('LoginPage document does not exist in DynamicPages collection.');
    }
  } catch (error) {
    console.error('Error fetching HeaderImages:', error);
  }
}

// Show confirmation overlay function
function showConfirmationOverlay(onConfirm) {
  const overlay = document.createElement('div');
  overlay.classList.add('confirmation-overlay');
  overlay.innerHTML = `
    <div class="confirmation-box">
      <p>Are you sure you want to remove this photo?</p>
      <button id="confirmRemove" class="confirm-btn">Yes, Remove</button>
      <button id="cancelRemove" class="cancel-btn">Cancel</button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('confirmRemove').onclick = () => {
    onConfirm();
    document.body.removeChild(overlay); 
  };
  
  document.getElementById('cancelRemove').onclick = () => {
    document.body.removeChild(overlay); 
  };
}

// Function to remove the image from Firestore
async function removeImage(index, imageUrl) {
  try {
    const loginPageDocRef = doc(db, 'DynamicPages', 'LoginPage');
    const loginPageDoc = await getDoc(loginPageDocRef);

    if (loginPageDoc.exists()) {
      let headerImages = loginPageDoc.data().HeaderImages;

      if (Array.isArray(headerImages)) {
        headerImages = headerImages.filter((_, i) => i !== index);

        await updateDoc(loginPageDocRef, { HeaderImages: headerImages });
        
        populateHeaderImages();
      }
    }
  } catch (error) {
    console.error('Error removing image:', error);
  }
}

// Call the function to populate images when the page loads
document.addEventListener('DOMContentLoaded', populateHeaderImages);


window.showControlManagemen = showDashboard;
window.loadNextModule = loadNextModule;
window.showDashboard = showDashboard;
window.showControlManagement = showControlManagement;
window.showLatestInterface = showLatestInterface;
window.toggleMainModule =toggleMainModule;
window.addAnimation = addAnimation;
window.triggerUpload = triggerUpload;
window.replaceWithImage = replaceWithImage;
window.saveContactInfo = saveContactInfo;
