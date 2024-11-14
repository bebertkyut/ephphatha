// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore, doc, setDoc, collection, getDocs, updateDoc, getDoc, query, where } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, uploadBytesResumable } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js';


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
  document.getElementById("keyfeatures-content").style.display = "block";
}

// Show the Control Management Interface section and hide others
function showControlManagement() {
  console.log("Show Control Management");
  document.querySelector('.dashboard-content').style.display = 'none';
  document.querySelector('.userdashboard-content').style.display = 'block';
  document.querySelector('.latest-content').style.display = 'none';
  document.getElementById('dashboardHeader').innerText = 'Control Management';
  document.getElementById("keyfeatures-content").style.display = "none";
}

// Show the Latest Interface section and hide others
function showLatestInterface() {
  console.log("Show Latest Interface");
  document.querySelector('.dashboard-content').style.display = 'none';
  document.querySelector('.userdashboard-content').style.display = 'none';
  document.querySelector('.latest-content').style.display = 'block';
  document.getElementById('dashboardHeader').innerText = 'Latest Interface';
  document.getElementById("keyfeatures-content").style.display = "none";
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

    // Remove 'active' class from all cards
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("active"));

    // Add 'active' class to the clicked card to show underline
    const clickedCard = document.querySelector(`[onclick="toggleMainModule('${moduleId}')"]`);
    clickedCard.classList.add("active");
}


// Function to upload video and save data to Firestore
async function addAnimation() {
  const categorySelect = document.getElementById("categoryCountInput");
  const animationNameInput = document.getElementById("animationNameInput");
  const videoInput = document.getElementById("animationVideoInput");

  const selectedCategory = categorySelect.value;
  const animationName = animationNameInput.value;
  const videoFile = videoInput.files[0];

  if (!selectedCategory || !animationName || !videoFile) {
    alert("Please select a category, enter an animation name, and upload a video.");
    return;
  }

  // Create a storage reference for the video in Firebase Storage
  const videoRef = ref(storage, `Animations/${videoFile.name}`);

  // Upload the video to Firebase Storage
  const uploadTask = uploadBytesResumable(videoRef, videoFile);

  uploadTask.on('state_changed', 
    (snapshot) => {
      // Handle progress if needed
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    }, 
    (error) => {
      // Handle upload errors
      console.error("Error uploading video:", error);
    }, 
    async () => {
      // Get the video download URL after successful upload
      const videoURL = await getDownloadURL(uploadTask.snapshot.ref);

      // Save the URL to Firestore under the corresponding category document
      const categoryDocRef = doc(db, "SignAsset", selectedCategory);
      await setDoc(categoryDocRef, {
        [animationName]: videoURL
      }, { merge: true });

      alert("Animation video uploaded and saved successfully!");
    }
  );
}

function loadNextModule() {
    const page1 = document.getElementById("page1Content");
    const page2 = document.getElementById("page2Content");
  
    // If page1 is visible, switch to page6
    if (page1.style.display !== "none") {
      page1.style.display = "none";
      page2.style.display = "block";
    } 
    // If page2 is visible, switch back to page1
    else if (page2.style.display !== "none") {
      page2.style.display = "none";
      page1.style.display = "block";
    }
}
  

function loadNextModule2() {
    const page4 = document.getElementById("page4Content");
    const page5 = document.getElementById("page5Content");
  
    // If page4 is visible, switch to page5
    if (page4.style.display !== "none") {
      page4.style.display = "none";
      page5.style.display = "block";
    } 
    // If page5 is visible, switch back to page4
    else if (page5.style.display !== "none") {
      page5.style.display = "none";
      page4.style.display = "block";
    }
}

function loadNextModule3() {
  const page7 = document.getElementById("page7Content");
    const page8 = document.getElementById("page8Content");
  
    // If page7 is visible, switch to page8
    if (page7.style.display !== "none") {
      page7.style.display = "none";
      page8.style.display = "block";
    } 
    // If page8 is visible, switch back to page7
    else if (page8.style.display !== "none") {
      page8.style.display = "none";
      page7.style.display = "block";
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

  // Collect contact information
  const phone = document.getElementById('contactPhone').value;
  const email = document.getElementById('contactEmail').value;
  const address = document.getElementById('contactAddress').value;

  // Prepare an object with only non-empty values
  const contactData = {};
  if (phone) contactData.ContactPhone = phone;
  if (email) contactData.ContactEmail = email;
  if (address) contactData.ContactAddress = address;

  // Update Firestore only if there are fields to update
  if (Object.keys(contactData).length > 0) {
      const contactRef = doc(db, 'DynamicPages', 'LoginPage');
      await setDoc(contactRef, contactData, { merge: true });

      console.log("Contact information saved to Firestore successfully.");
  } else {
      console.log("No contact information to update.");
  }
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

let currentIndex = 0; // Track the current image index
// Function to populate header images
async function populateHeaderImages() {
  const headerImagesContainer = document.getElementById('headerImagesContainer');
  headerImagesContainer.innerHTML = ''; // Clear previous content

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

          // Create remove icon button with custom delete image
          const removeButton = document.createElement('button');
          removeButton.classList.add('remove-button');

          // Create an image element for the delete button
          const deleteImage = document.createElement('img');
          deleteImage.src = "../img/delete.png";  // Ensure this is the correct path to your delete.png
          deleteImage.alt = 'Delete';
          deleteImage.classList.add('delete-icon'); // Add a class for styling if needed
          
          removeButton.appendChild(deleteImage);

          removeButton.addEventListener('click', () => {
            showConfirmationOverlay(() => removeImage(index, imageUrl)); 
          });

          imageWrapper.appendChild(imgElement);
          imageWrapper.appendChild(removeButton);
          headerImagesContainer.appendChild(imageWrapper);

          // Initially, only the first image is shown
          if (index === 0) {
            imageWrapper.classList.add('active');
          }
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



// Function to update the slider position
function updateSliderPosition() {
  const allImages = document.querySelectorAll('#headerImagesContainer .image-wrapper');
  const totalImages = allImages.length;

  // Hide all images
  allImages.forEach((imgWrapper) => {
    imgWrapper.classList.remove('active');
  });

  // Show the current image
  allImages[currentIndex].classList.add('active');
}

// Slider navigation functionality
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

// Move to the next image
nextButton.addEventListener('click', () => {
  const totalImages = document.querySelectorAll('#headerImagesContainer .image-wrapper').length;
  if (currentIndex < totalImages - 1) {
    currentIndex++;
    updateSliderPosition();
  }
});

// Move to the previous image
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSliderPosition();
  }
});

// Initialize the image slider
document.addEventListener('DOMContentLoaded', () => {
  populateHeaderImages();
});


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
async function removeImage(index) {
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

// Firebase Firestore reference (assumes `db` is your Firestore instance)
const activeAccountsTableBody = document.getElementById('activeAccountsTableBody');  // Fixed the repeated declaration

// Function to populate the Active Accounts Table
async function populateActiveAccountsTable() {
  try {
    // Reference to the Firestore collection
    const querySnapshot = await getDocs(collection(db, "UserAccount"));

    // Clear the table body before populating
    activeAccountsTableBody.innerHTML = '';

    // Check if we have data
    console.log("Fetched data:", querySnapshot.docs);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Account Status:", data.Status); // Debugging: Check Status field

      // Check if the Status is "Active"
      if (data.Status === "Active") {
        // Format DateCreated to mm/dd/yyyy
        const dateCreated = data.DateCreated ? data.DateCreated.toDate().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        }) : '';

        // Check if Birthday is a Firestore Timestamp and format it to mm/dd/yyyy
        let birthday = '';
        if (data.Birthday) {
          if (data.Birthday.toDate) {
            // If it's a Timestamp, convert it to a Date
            birthday = data.Birthday.toDate().toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric'
            });
          } else {
            // If it's not a Timestamp, assume it's already a string in mm/dd/yyyy format
            birthday = data.Birthday;
          }
        }

        // Create a new table row
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${data.Name || ''}</td>
          <td>${data.Username || ''}</td>
          <td>${data.Role || ''}</td>
          <td>${data.Gender || ''}</td>
          <td>${birthday}</td>
          <td>${dateCreated}</td>
          <td>
            <div style="position: relative;">
              <button onclick="toggleDropdown(this)">...</button>
              <div class="dropdown-menu">
                <button onclick="editAccount('${doc.id}')">Edit</button>
                <button onclick="removeAccount('${doc.id}')">Remove</button>
                <button onclick="deactivateAccount('${doc.id}')">Deactivate</button>
              </div>
            </div>
          </td>
        `;

        // Append the row to the table body
        activeAccountsTableBody.appendChild(row);
      }
    });

    console.log("Table populated successfully with active accounts.");
  } catch (error) {
    console.error("Error fetching active accounts from Firestore:", error);
  }
}

// Function to toggle the dropdown menu visibility
function toggleDropdown(button) {
  const dropdownMenu = button.nextElementSibling;

  // Hide other open dropdowns
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
      if (menu !== dropdownMenu) {
          menu.style.display = 'none';
      }
  });

  // Toggle the clicked dropdown
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Functions to handle each dropdown action (to be implemented)
function editAccount(id) {
  console.log(`Edit account with ID: ${id}`);
  // Implement edit functionality here
}

function removeAccount(id) {
  console.log(`Remove account with ID: ${id}`);
  // Implement remove functionality here
}

function deactivateAccount(id) {
  console.log(`Deactivate account with ID: ${id}`);
  // Implement deactivate functionality here
}

// Event listener to close the dropdown if clicked outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('.dropdown-menu') && !event.target.closest('button')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => menu.style.display = 'none');
  }
});

// Call the function to populate the table on page load or as needed
populateActiveAccountsTable();

async function populateInactiveAccountsTable() {
  const inactiveAccountsTableBody = document.getElementById('inactiveAccountsTableBody');

  try {
    const querySnapshot = await getDocs(collection(db, "UserAccount"));
    
    // Clear the table body before populating
    inactiveAccountsTableBody.innerHTML = '';
    console.log("Query snapshot size:", querySnapshot.size); // Check if data is retrieved

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Data received:", data); // Log all data fields to confirm retrieval

      if (data.Status === "Inactive") {
        // Additional logging for dates and values
        console.log("Inactive account found:", data);

        const dateCreated = data.DateCreated ? data.DateCreated.toDate().toLocaleDateString('en-US') : '';
        let birthday = data.Birthday ? (data.Birthday.toDate ? data.Birthday.toDate().toLocaleDateString('en-US') : data.Birthday) : '';

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${data.Name || ''}</td>
          <td>${data.Username || ''}</td>
          <td>${data.Role || ''}</td>
          <td>${data.Gender || ''}</td>
          <td>${birthday}</td>
          <td>${dateCreated}</td>
          <td>
            <div style="position: relative;">
              <button onclick="toggleDropdown(this)">...</button>
              <div class="dropdown-menu">
                <button onclick="editAccount('${doc.id}')">Edit</button>
                <button onclick="removeAccount('${doc.id}')">Remove</button>
                <button onclick="activateAccount('${doc.id}')">Activate</button>
              </div>
            </div>
          </td>
        `;
        inactiveAccountsTableBody.appendChild(row);
      }
    });

    console.log("Table populated successfully with inactive accounts.");
  } catch (error) {
    console.error("Error fetching inactive accounts from Firestore:", error);
  }
}

// Call the function to populate inactive accounts as needed
populateInactiveAccountsTable();


// Function to handle the video file upload and display
function displayUploadedVideo(event) {
  const file = event.target.files[0];

  if (file && file.type.startsWith("video/")) {
    const videoUrl = URL.createObjectURL(file); 

    const videoContainer = document.getElementById("animationVideoUploadBox");

    const videoElement = document.createElement("video");
    videoElement.setAttribute("controls", "true"); 
    videoElement.setAttribute("width", "100%"); 
    videoElement.setAttribute("height", "100%"); 
    videoElement.src = videoUrl;

    videoContainer.innerHTML = '';
    videoContainer.appendChild(videoElement);
  } else {
    alert("Please upload a valid video file.");
  }
}

// Function to fetch category names from Firestore and populate the dropdown
function loadCategoryOptions() {
  const categorySelect = document.getElementById("categoryCountInput");

  categorySelect.innerHTML = `<option value="" selected>Select Category</option>`;

  const signAssetCollection = collection(db, "SignAsset");
  getDocs(signAssetCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const categoryName = doc.id; 
        const option = document.createElement("option");
        option.value = categoryName; 
        option.textContent = categoryName;  
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching categories: ", error);
    });
}

// Reference to the div where images will be populated
const pageContentDiv = document.getElementById('page4Content');

// Function to load images from Firestore
async function loadImagesFromFirestore() {
  const docRef = doc(db, "DynamicPages", "DashboardPage");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const bulletinImages = docSnap.data().Bulletin;

    if (bulletinImages && Array.isArray(bulletinImages) && bulletinImages.length > 0) {
      bulletinImages.forEach((imageUrl) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = "Bulletin Image";
        img.style.width = "100%";
        img.style.marginBottom = "10px"; 

        pageContentDiv.appendChild(img);
      });
    } else {
      console.log('No images found in Bulletin array');
    }
  } else {
    console.log('Document not found!');
  }
}

// Reference to the stat card element where the active accounts count will be displayed
const activeAccountsElement = document.querySelector('.stat-card h3');

// Function to fetch the count of active accounts
async function fetchActiveAccountsCount() {
  const userRef = collection(db, "UserAccount");

  try {
    // Query to filter documents where the 'Status' field is 'Active'
    const querySnapshot = await getDocs(query(userRef, where("Status", "==", "Active")));
    
    // Set the count of active accounts to the stat card
    activeAccountsElement.textContent = querySnapshot.size;
  } catch (error) {
    console.error("Error fetching active accounts:", error);
    activeAccountsElement.textContent = "Error"; // Display an error message if the fetch fails
  }
}

// Call the function to update the count when the page loads
fetchActiveAccountsCount();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  loadCategoryOptions();
  loadImagesFromFirestore();
});

window.displayUploadedVideo = displayUploadedVideo;
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
window.loadNextModule2 = loadNextModule2;
window.loadNextModule3 = loadNextModule3;
window.toggleDropdown = toggleDropdown;
window.editAccount = editAccount;
window.removeAccount = removeAccount;
window.deactivateAccount = deactivateAccount;
window.populateInactiveAccountsTable = populateInactiveAccountsTable;
window.populateActiveAccountsTable = populateActiveAccountsTable;