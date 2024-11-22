// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore, doc, setDoc, collection, getDocs, updateDoc, getDoc, query, where, deleteDoc,addDoc, deleteField, arrayUnion  } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js';


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
  const firestore = getFirestore(app);

// Toggle visibility of widgets on click
document.querySelectorAll('.widget').forEach(widget => {
  widget.addEventListener('click', () => {
      widget.style.display = widget.style.display === 'none' ? 'block' : 'none';
  });
});

// Show the Dashboard section and hide others
function showDashboard() {  
  document.querySelector('.dashboard-content').style.display = 'block';
  document.querySelector('.userdashboard-content').style.display = 'none';
  document.querySelector('.latest-content').style.display = 'none';
  document.getElementById('dashboardHeader').innerText = 'Dashboard';
  document.getElementById("keyfeatures-content").style.display = "block";
  countSignAssetFields();
  countUsers()
  fetchActiveAccountsCount();
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
  // Hide all sections
  const modules = document.querySelectorAll('.main-admin-module');
  modules.forEach(module => {
      module.style.display = 'none';
  });

  // Show the selected section
  const selectedModule = document.getElementById(moduleId);
  if (selectedModule) {
      selectedModule.style.display = 'block';
  }

  // Remove 'active' class from all cards
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => card.classList.remove("active"));

  // Add 'active' class to the clicked card to show underline
  const clickedCard = document.querySelector(`[onclick="toggleMainModule('${moduleId}')"]`);
  clickedCard.classList.add("active");
  populateHeaderImages();
  fetchActiveAccountsCount();
  fetchSignAssets();
  fetchPage11Content();
  loadImagesFromFirestore();
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

  try {
    // Create a storage reference for the video in Firebase Storage
    const videoRef = ref(storage, `Animations/${videoFile.name}`);

    // Upload the video to Firebase Storage
    const uploadTask = uploadBytesResumable(videoRef, videoFile);

    // Wait for the upload to complete
    await uploadTask;

    // After upload completes, get the download URL of the uploaded video
    const videoURL = await getDownloadURL(uploadTask.snapshot.ref);

    // Save the URL to Firestore under the corresponding category document
    const categoryDocRef = doc(db, "SignAsset", selectedCategory);
    await setDoc(categoryDocRef, {
      [animationName]: videoURL
    }, { merge: true });

    alert("Animation video uploaded and saved successfully!");

    // Reset form fields and upload container
    categorySelect.value = "";
    animationNameInput.value = "";
    videoInput.value = "";

    // Reset the upload container to its default state
    const uploadContainer = document.getElementById("animationVideoUploadBox");
    uploadContainer.innerHTML = `
      <div>
        <img src="../img/upload-icon.png" alt="Upload Icon">
        <p>Upload Animation Video</p>
      </div>
    `;
  } catch (error) {
    console.error("Error during the animation upload process:", error);
    alert("There was an error uploading the animation. Please try again.");
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



function loadNextModule4() {
  const page10 = document.getElementById("page10Content");
    const page11 = document.getElementById("page11Content");
  
    // If page10 is visible, switch to page11
    if (page10.style.display !== "none") {
      page10.style.display = "none";
      page11.style.display = "block";
    } 
    // If page11 is visible, switch back to page10
    else if (page11.style.display !== "none") {
      page11.style.display = "none";
      page10.style.display = "block";
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
  // Handle Header Image Upload (Optional)
  const headerFileInput = document.getElementById('fileInput');
  const headerFile = headerFileInput.files[0];

  if (headerFile) {
      try {
          const headerImageRef = ref(storage, `DynamicPagesPictures/${headerFile.name}`);
          await uploadBytes(headerImageRef, headerFile);
          const headerDownloadURL = await getDownloadURL(headerImageRef);
          const headerFirestoreRef = doc(db, 'DynamicPages', 'LoginPage');
          await setDoc(headerFirestoreRef, {
              HeaderImages: arrayUnion(headerDownloadURL) 
          }, { merge: true });

          console.log("Header image URL saved to Firestore successfully:", headerDownloadURL);

      } catch (error) {
          console.error("Error uploading header image or saving URL to Firestore:", error);
      }
  } else {
      console.warn("No header image file selected to upload.");
  }

  const phone = document.getElementById('contactPhone').value;
  const email = document.getElementById('contactEmail').value;
  const address = document.getElementById('contactAddress').value;

  const contactData = {};
  if (phone) contactData.ContactPhone = phone;
  if (email) contactData.ContactEmail = email;
  if (address) contactData.ContactAddress = address;

  if (Object.keys(contactData).length > 0) {
      try {
          const contactRef = doc(db, 'DynamicPages', 'LoginPage');
          await setDoc(contactRef, contactData, { merge: true });

          console.log("Contact information saved to Firestore successfully.");
      } catch (error) {
          console.error("Error saving contact information:", error);
      }
  } else {
      console.log("No contact information to update.");
  }

  // Handle About Image Upload (This is independent of the header image upload)
  const aboutFileInput = document.getElementById('aboutFileInput');
  const aboutFile = aboutFileInput.files[0];

  if (aboutFile) {
      try {
          const aboutImageRef = ref(storage, `DynamicPagesPictures/${aboutFile.name}`);

          // Upload the file to Firebase Storage
          await uploadBytes(aboutImageRef, aboutFile);

          // Get the download URL of the uploaded file
          const aboutDownloadURL = await getDownloadURL(aboutImageRef);

          // Save the URL in the Firestore `AboutImage` field
          const aboutFirestoreRef = doc(db, 'DynamicPages', 'LoginPage');
          await setDoc(aboutFirestoreRef, {
              AboutImage: aboutDownloadURL // Save the About image URL
          }, { merge: true });

          console.log("About image URL saved to Firestore successfully:", aboutDownloadURL);

      } catch (error) {
          console.error("Error uploading about image or saving URL to Firestore:", error);
      }
  } else {
      console.warn("No about image file selected to upload.");
  }

  resetUploadContainer('uploadBox', 'Upload Header Image');
  resetAboutImageUpload();

  document.getElementById('fileInput').value = "";
  document.getElementById('aboutFileInput').value = "";
  document.getElementById('contactPhone').value = "";
  document.getElementById('contactEmail').value = "";
  document.getElementById('contactAddress').value = "";

  alert("Information saved successfully!");
}

// Function to Reset Header Upload Container to Default State
function resetUploadContainer(containerId, placeholderText) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <div>
      <img src="../img/upload-icon.png" alt="Upload Icon">
      <p>${placeholderText}</p>
    </div>
  `;
}

// Function to Reset About Image Upload Field to Default
function resetAboutImageUpload() {
  const aboutBox = document.getElementById('aboutBox');
  aboutBox.innerHTML = `
    <div>
      <img src="../img/upload-icon.png" alt="Upload Icon">
      <p>Upload About Images</p>
    </div>
  `;
}

window.saveBulletinImage = function() {
  const bulletinFileInput = document.getElementById('bulletinBoardFileInput');
  const bulletinFile = bulletinFileInput.files[0];

  if (bulletinFile) {
    try {
      const bulletinImageRef = ref(storage, `DynamicPagesPictures/${bulletinFile.name}`);

      uploadBytes(bulletinImageRef, bulletinFile).then(async () => {
        const bulletinDownloadURL = await getDownloadURL(bulletinImageRef);
        const bulletinFirestoreRef = doc(db, 'DynamicPages', 'DashboardPage');
        await setDoc(bulletinFirestoreRef, {
          Bulletin: arrayUnion(bulletinDownloadURL) 
        }, { merge: true });

        console.log("Bulletin image URL saved to Firestore successfully:", bulletinDownloadURL);
        bulletinFileInput.value = "";
        resetUploadDashboardContainer('bulletinBoardUploadBox', 'Upload Bulletin Board Header Image');
        alert("Bulletin image saved successfully!");
      });
      
    } catch (error) {
      console.error("Error uploading bulletin image or saving URL to Firestore:", error);
      alert("Failed to save bulletin image. Please try again.");
    }
  } else {
    alert("No file selected. Please upload an image before saving.");
  }
}

// Function to Reset Upload Container to Default State
function resetUploadDashboardContainer(containerId, placeholderText) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <div>
      <img src="../img/upload-icon.png" alt="Upload Icon">
      <p>${placeholderText}</p>
    </div>
  `;
}

// Function to count animations in Firebase Storage
async function countSignAssetFields() {
  try {
      const signAssetRef = collection(firestore, 'SignAsset');
      const querySnapshot = await getDocs(signAssetRef);
      let totalFields = 0;

      querySnapshot.forEach(doc => {
          totalFields += Object.keys(doc.data()).length; // Count the fields in each document
      });

      document.querySelector('.stat-card:nth-child(2) h3').textContent = totalFields;
  } catch (error) {
      console.error("Error counting fields in SignAsset:", error);
  }
}

// Call the function
countSignAssetFields();


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

  categoryTableBody.innerHTML = '';
  
  try {
    const signAssetCollection = collection(db, 'SignAsset');
    const snapshot = await getDocs(signAssetCollection);

    const allFields = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data) {
        // Add each field to the allFields array with its corresponding document ID
        for (const [field, videoUrl] of Object.entries(data)) {
          allFields.push({ field, videoUrl, category: doc.id });
        }
      } else {
        console.warn(`Missing data in document: ${doc.id}`);
      }
    });

    // Sort the fields alphabetically by field name
    const sortedFields = allFields.sort((a, b) => a.field.localeCompare(b.field));

    // Now, create table rows for sorted fields
    sortedFields.forEach(({ category, field, videoUrl }) => {
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
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
      icon.setAttribute('title', 'Remove');
      icon.addEventListener('click', () => {
        showDeleteConfirmation(category, field);
      });
      actionsCell.appendChild(icon);
      row.appendChild(actionsCell);

      categoryTableBody.appendChild(row);
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
  
  // Show overlay
  overlay.style.display = 'flex';
  
  // Confirm button event
  confirmBtn.onclick = async () => {
    try {
      await deleteSignAsset(category, field);
      overlay.style.display = 'none';
      alert('Sign asset deleted successfully!');
      await fetchSignAssets();
    } catch (error) {
      console.error('Error deleting sign asset:', error);
      alert('An error occurred while deleting the sign asset.');
    }
  };

  // Cancel button event
  cancelBtn.onclick = () => {
    overlay.style.display = 'none';
  };
}

// Function to delete a sign asset from Firestore
async function deleteSignAsset(category, field) {
  const signAssetDocRef = doc(db, 'SignAsset', category);

  try {
    const signAssetDoc = await getDoc(signAssetDocRef);
    if (signAssetDoc.exists()) {
      const updateObject = { [field]: deleteField() };
      await updateDoc(signAssetDocRef, updateObject);
    } else {
      throw new Error('Document does not exist');
    }
  } catch (error) {
    console.error('Error while deleting field:', error);
    throw error;
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
  categoryTableBody.innerHTML = ''; // Clear the table before populating it

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

        // Action icon with delete functionality
        const actionsCell = document.createElement('td');
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-trash-alt', 'delete-icon');  // Add delete-icon class for styling
        icon.setAttribute('title', 'Remove');
        
        // Add delete confirmation action
        icon.addEventListener('click', () => {
          showDeleteConfirmation(categoryId, field);  // Show confirmation for delete
        });

        actionsCell.appendChild(icon);
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
    fetchSignAssets(); // Fetch all data when no category is selected
  }
});

// Call the function to populate the category filter on page load
document.addEventListener('DOMContentLoaded', () => {
  populateCategoryDropdown();
  fetchSignAssets();
});

let currentIndexHeader = 0;
let currentIndexDashboard = 0;

// Function to populate header images with the 'header-image' class
async function populateHeaderImages() {
  const headerImagesContainer = document.querySelector('#headerSliderContainer');
  headerImagesContainer.innerHTML = ''; // Clear previous content

  try {
    const loginPageDocRef = doc(db, 'DynamicPages', 'LoginPage');
    const loginPageDoc = await getDoc(loginPageDocRef);

    if (loginPageDoc.exists()) {
      const headerImages = loginPageDoc.data().HeaderImages;

      if (Array.isArray(headerImages)) {
        headerImages.forEach((imageUrl) => {
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          imgElement.alt = 'Header Image';
          imgElement.classList.add('header-image'); // Add header-image class
          headerImagesContainer.appendChild(imgElement);

        });

        // Initialize carousel functionality for header images
        initializeCarousel(headerImagesContainer, 'header');
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


// Function to load dashboard images with the 'dashboard-image' class
async function loadImagesFromFirestore() {
  const docRef = doc(db, "DynamicPages", "DashboardPage");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const bulletinImages = docSnap.data().Bulletin;

    if (bulletinImages && Array.isArray(bulletinImages)) {
      const sliderContainer = document.querySelector('#userDashboardSliderContainer');
      sliderContainer.innerHTML = ''; // Clear previous content

      bulletinImages.forEach((imageUrl) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = "Bulletin Image";
        img.classList.add('dashboard-image'); // Add dashboard-image class
        sliderContainer.appendChild(img);

       
      });

      // Initialize carousel functionality for dashboard images
      initializeCarousel(sliderContainer, 'bulletin');
    } else {
      console.log('No images found in Bulletin array');
    }
  } else {
    console.log('Document not found!');
  }
}

// Initialize both sliders on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  populateHeaderImages();
  loadImagesFromFirestore();
});


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

    // Collect all active accounts into an array
    const activeAccounts = [];

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

        // Push the active account data into the array
        activeAccounts.push({
          docId: doc.id,
          name: data.Name,
          username: data.Username,
          role: data.Role,
          gender: data.Gender,
          birthday: birthday,
          dateCreated: dateCreated,
          status: data.Status
        });
      }
    });

    // Sort the active accounts array by Name field alphabetically
    activeAccounts.sort((a, b) => a.name.localeCompare(b.name));

    // Create table rows for each sorted active account
    activeAccounts.forEach((account) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${account.name || ''}</td>
        <td>${account.username || ''}</td>
        <td>${account.role || ''}</td>
        <td>${account.gender || ''}</td>
        <td>${account.birthday}</td>
        <td>${account.dateCreated}</td>
        <td>
          <div class="a-buttons">
            <button class="a-button" onclick="editAccount('${account.docId}')" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="b-button" onclick="removeAccount('${account.docId}')" title="Remove">
              <i class="fas fa-trash-alt"></i>
            </button>
            <!-- Conditional Rendering of Deactivate or Activate Button -->
            ${account.status === 'Active' 
              ? `<button class="a-button" onclick="deactivateAccount('${account.docId}')" title="Deactivate">
                   <i class="fas fa-ban"></i>
                 </button>` 
              : `<button class="b-button" onclick="activateAccount('${account.docId}')" title="Activate">
                   <i class="fas fa-ban"></i>
                 </button>`
            }
          </div>
        </td>
      `;
      // Append the row to the table body
      activeAccountsTableBody.appendChild(row);
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

let currentEditAccountId = null;

// Functions to handle each dropdown action
async function editAccount(id) {
  currentEditAccountId = id; // Store the ID of the account being edited
  const docRef = doc(db, "UserAccount", id);

  try {
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      document.getElementById('editOverlayName').value = data.Name || '';
      document.getElementById('editOverlayUsername').value = data.Username || '';
      document.getElementById('editOverlayPassword').value = data.Password || '';
      document.getElementById('editOverlayConfirmPassword').value = data.Password || '';
      document.getElementById('editOverlayRole').value = data.Role || 'Teacher';

      // Display the overlay
      document.getElementById('editAccountOverlay').style.display = 'flex';
    } else {
      console.error("Account not found!");
    }
  } catch (error) {
    console.error("Error fetching account for editing:", error);
  }
}

async function saveEditedAccount() {
  const name = document.getElementById('editOverlayName').value;
  const username = document.getElementById('editOverlayUsername').value;
  const password = document.getElementById('editOverlayPassword').value;
  const confirmPassword = document.getElementById('editOverlayConfirmPassword').value;
  const role = document.getElementById('editOverlayRole').value;

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return;
  }

  if (!currentEditAccountId) {
    console.error("No account ID available for saving changes.");
    return;
  }

  try {
    const docRef = doc(db, "UserAccount", currentEditAccountId);

    await updateDoc(docRef, {
      Name: name,
      Username: username,
      Password: password,
      Role: role
    });

    alert("Account updated successfully!");
    closeEditOverlay();
    populateActiveAccountsTable(); // Refresh active accounts
    populateInactiveAccountsTable(); // Refresh inactive accounts
  } catch (error) {
    console.error("Error updating account:", error);
  }
}

function closeEditOverlay() {
  document.getElementById('editAccountOverlay').style.display = 'none';
  currentEditAccountId = null; // Clear the current account ID
}

// Function to save a new account
document.getElementById('submitModuleButton').addEventListener('click', async function(event) {
  event.preventDefault(); // Prevent form submission refresh

  const name = document.getElementById('moduleName').value;
  const username = document.getElementById('moduleUsername').value;
  const password = document.getElementById('modulePassword').value;
  const confirmPassword = document.getElementById('moduleConfirmPassword').value;
  const role = document.getElementById('moduleRole').value;

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
  const pictureURL = "https://firebasestorage.googleapis.com/v0/b/ephphathadb.appspot.com/o/profile_pictures%2Fdefault-user.png?alt=media&token=0855f608-d85e-4969-8911-b6f9c41e8723";

  try {
    // Add the document to Firestore
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

    await populateActiveAccountsTable();
    await populateInactiveAccountsTable();

    alert("Account saved successfully!");
    // Optionally reset the form fields
    document.getElementById('editAccountModuleForm').reset();

  } catch (error) {
    console.error("Error saving account:", error);
    alert("There was an error saving the account. Please try again.");
  }
});


function removeAccount(id) {
  console.log(`Attempting to remove account with ID: ${id}`);

  // Create the modal HTML structure
const modal = document.createElement('div');
modal.className = 'overlay';  // Use the class for styling
modal.innerHTML = `
    <div class="overlay-content">
        <div class="warning-icon">⚠️</div>
        <p>This action will permanently remove the account.</p>
        <p>Are you sure you want to continue?</p>
        <button id="confirmDeleteBtn" class="confirm-btn">Remove</button>
        <button id="cancelDeleteBtn" class="cancel-btn">Cancel</button>
    </div>
`;

// Append modal to the body
document.body.appendChild(modal);

// Get the buttons from the modal
const confirmDeleteBtn = modal.querySelector('#confirmDeleteBtn');  // Correct selector for confirm button
const cancelDeleteBtn = modal.querySelector('#cancelDeleteBtn');  // Correct selector for cancel button

// Function to handle modal closing
function closeModal() {
    document.body.removeChild(modal);
}

// When user clicks "Remove", delete the account
confirmDeleteBtn.addEventListener('click', async function() {
    try {
        await removeAccountFromFirestore(id);  // Call the function to remove the account
        console.log(`Account with ID ${id} removed successfully.`);
        closeModal();  // Close the modal after removal

        // Fetch updated data for both active and inactive accounts
        await populateActiveAccountsTable();
        await populateInactiveAccountsTable();
    } catch (error) {
        console.error('Error removing account:', error);
    }
});

// When user clicks "Cancel", close the modal without doing anything
cancelDeleteBtn.addEventListener('click', function() {
    closeModal();  // Close the modal on cancel
});

// Close modal if clicked outside the content area
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Show the modal
modal.classList.add('show');  
}// Add a class to show the modal (you can define the "show" class in CSS)



// Function to delete account from Firestore
async function removeAccountFromFirestore(id) {
  const userRef = doc(db, "UserAccount", id); // Reference to the account document

  // Delete the document from Firestore
  await deleteDoc(userRef);
}



// Function to deactivate account and fetch updated data
function deactivateAccount(id) {
  // Create the confirmation modal dynamically
  const confirmationModal = document.createElement('div');
  confirmationModal.classList.add('overlay'); // Use the existing overlay class

  // Create the modal content
  const modalContent = document.createElement('div');
  modalContent.classList.add('overlay-content'); // Use the existing overlay-content class
  
  // Add the warning icon (optional)
  const warningIcon = document.createElement('i');
  warningIcon.classList.add('fas', 'fa-exclamation-triangle', 'warning-icon'); // Icon for warning
  modalContent.appendChild(warningIcon);

  // Add the heading text
  const heading = document.createElement('p');
  heading.textContent = "Are you sure you want to deactivate this account?";
  modalContent.appendChild(heading);

  // Add the subheading text
  const subHeading = document.createElement('p');
  subHeading.textContent = "This action cannot be undone.";
  modalContent.appendChild(subHeading);
  
  // Create the confirmation buttons with matching classes
  const confirmBtn = document.createElement('button');
  confirmBtn.textContent = 'Deactivate';
  confirmBtn.id = 'confirmDeleteBtn';  // Apply the same ID as your static button
  confirmBtn.classList.add('confirmDeleteBtn'); // Ensure same class for styling
  
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.id = 'cancelDeleteBtn';  // Apply the same ID as your static button
  cancelBtn.classList.add('cancelDeleteBtn'); // Ensure same class for styling
  
  modalContent.appendChild(confirmBtn);
  modalContent.appendChild(cancelBtn);
  confirmationModal.appendChild(modalContent);

  // Append the modal to the body
  document.body.appendChild(confirmationModal);

  // Show the modal
  confirmationModal.classList.add('show'); // Use show class to display the modal

  // Confirm deactivation
  confirmBtn.onclick = async function() {
    try {
      // Reference to the UserAccount document
      const userRef = doc(db, "UserAccount", id);
      
      // Update the "Status" field to "Inactive"
      await updateDoc(userRef, {
        Status: "Inactive"
      });

      console.log(`Account with ID ${id} deactivated successfully.`);
      
      // Close the modal after successful deactivation
      confirmationModal.classList.remove('show'); // Hide modal
      document.body.removeChild(confirmationModal);

      // Fetch updated data for both active and inactive accounts
      await populateActiveAccountsTable();
      await populateInactiveAccountsTable();
    } catch (error) {
      console.error('Error deactivating account:', error);
    }
  };

  // Cancel deactivation
  cancelBtn.onclick = function() {
    confirmationModal.classList.remove('show'); // Hide modal
    document.body.removeChild(confirmationModal);
  };

  // Close the modal if the user clicks outside the modal content
  window.onclick = function(event) {
    if (event.target === confirmationModal) {
      confirmationModal.classList.remove('show'); // Hide modal
      document.body.removeChild(confirmationModal);
    }
  };
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

    // Collect all inactive accounts into an array
    const inactiveAccounts = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Data received:", data); // Log all data fields to confirm retrieval

      if (data.Status === "Inactive") {
        // Additional logging for dates and values
        console.log("Inactive account found:", data);

        const dateCreated = data.DateCreated ? data.DateCreated.toDate().toLocaleDateString('en-US') : '';
        let birthday = data.Birthday ? (data.Birthday.toDate ? data.Birthday.toDate().toLocaleDateString('en-US') : data.Birthday) : '';

        // Push inactive account data into the array
        inactiveAccounts.push({
          docId: doc.id,
          name: data.Name,
          username: data.Username,
          role: data.Role,
          gender: data.Gender,
          birthday: birthday,
          dateCreated: dateCreated,
          status: data.Status
        });
      }
    });

    // Sort the inactive accounts array by Name field alphabetically
    inactiveAccounts.sort((a, b) => a.name.localeCompare(b.name));

    // Create table rows for each sorted inactive account
    inactiveAccounts.forEach((account) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${account.name || ''}</td>
        <td>${account.username || ''}</td>
        <td>${account.role || ''}</td>
        <td>${account.gender || ''}</td>
        <td>${account.birthday}</td>
        <td>${account.dateCreated}</td>
        <td>
          <div class="a-buttons">
            <button class="a-button" onclick="editAccount('${account.docId}')" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="b-button" onclick="removeAccount('${account.docId}')" title="Remove">
              <i class="fas fa-trash-alt"></i>
            </button>
            <!-- Conditional Rendering of Deactivate or Activate Button -->
            ${account.status === 'Inactive' 
              ? `<button class="b-button" onclick="activateAccount('${account.docId}')" title="Activate">
                   <i class="fas fa-ban"></i>
                 </button>` 
              : `<button class="a-button" onclick="deactivateAccount('${account.docId}')" title="Deactivate">
                   <i class="fas fa-ban"></i>
                 </button>`
            }
          </div>
        </td>
      `;
      // Append the row to the table body
      inactiveAccountsTableBody.appendChild(row);
    });

    console.log("Table populated successfully with inactive accounts.");
  } catch (error) {
    console.error("Error fetching inactive accounts from Firestore:", error);
  }
}

// Call the function to populate inactive accounts as needed
populateInactiveAccountsTable();

function activateAccount(id) {
  // Create the confirmation modal dynamically
  const confirmationModal = document.createElement('div');
  confirmationModal.classList.add('overlay'); // Use the existing overlay class

  // Create the modal content
  const modalContent = document.createElement('div');
  modalContent.classList.add('overlay-content'); // Use the existing overlay-content class

  // Add the warning icon (optional)
  const warningIcon = document.createElement('i');
  warningIcon.classList.add('fas', 'fa-exclamation-triangle', 'warning-icon'); // Icon for warning
  modalContent.appendChild(warningIcon);

  // Add the heading text
  const heading = document.createElement('p');
  heading.textContent = "Are you sure you want to activate this account?";
  modalContent.appendChild(heading);

  // Add the subheading text
  const subHeading = document.createElement('p');
  subHeading.textContent = "This action will reactivate the account.";
  modalContent.appendChild(subHeading);

 // Create the confirmation buttons with matching classes
 const confirmBtn = document.createElement('button');
 confirmBtn.textContent = 'Activate';
 confirmBtn.id = 'confirmDeleteBtn';  // Apply the same ID as your static button
 confirmBtn.classList.add('confirmDeleteBtn'); // Ensure same class for styling
 
 const cancelBtn = document.createElement('button');
 cancelBtn.textContent = 'Cancel';
 cancelBtn.id = 'cancelDeleteBtn';  // Apply the same ID as your static button
 cancelBtn.classList.add('cancelDeleteBtn'); // Ensure same class for styling

  modalContent.appendChild(confirmBtn);
  modalContent.appendChild(cancelBtn);
  confirmationModal.appendChild(modalContent);

  // Append the modal to the body
  document.body.appendChild(confirmationModal);

  // Show the modal
  confirmationModal.classList.add('show'); // Use show class to display the modal

  // Confirm activation
  confirmBtn.onclick = async function() {
    try {
      // Reference to the UserAccount document
      const userRef = doc(db, "UserAccount", id);

      // Update the "Status" field to "Active"
      await updateDoc(userRef, {
        Status: "Active"
      });

      console.log(`Account with ID ${id} activated successfully.`);

      // Close the modal after successful activation
      confirmationModal.classList.remove('show'); // Hide modal
      document.body.removeChild(confirmationModal);

      // Fetch updated data for both active and inactive accounts
      await populateActiveAccountsTable();
      await populateInactiveAccountsTable();
    } catch (error) {
      console.error('Error activating account:', error);
      // Optionally, show an error message
    }
  };

  // Cancel activation and close the modal
  cancelBtn.onclick = function() {
    confirmationModal.classList.remove('show'); // Hide modal
    document.body.removeChild(confirmationModal);
  };

  // Close the modal if the user clicks outside the modal content
  window.onclick = function(event) {
    if (event.target === confirmationModal) {
      confirmationModal.classList.remove('show'); // Hide modal
      document.body.removeChild(confirmationModal);
    }
  };
}


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

async function showPage11Content() {
  const page10Div = document.getElementById('page10Content');
  const page11Div = document.getElementById('page11Content');

  // Hide the Page 10 Content
  page11Div.style.display = 'none';

  // Show the Page 11 Content
  page10Div.style.display = 'block';

  // Fetch the content for Page 11 and display it
  await fetchPage11Content();
}

// Function to fetch Page 11 content from Firestore
async function fetchPage11Content() {
  const page11Div = document.getElementById('page11Content');

  try {
    const docRef = doc(db, 'DynamicPages', 'LoginPage');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Create elements to display the data
      const aboutImage = document.createElement('img');
      aboutImage.src = data.AboutImage;
      aboutImage.alt = "About Section Image";
      aboutImage.style.width = "100%";         // Ensure the image covers the full width of the container
      aboutImage.style.maxHeight = "50vh";
      // Create the contact info container div
      const contactInfoContainer = document.createElement('div');
      contactInfoContainer.classList.add('contact-info-container'); // Add the class for styling

      // Create the contact details paragraphs with icons
      const contactAddress = document.createElement('p');
      contactAddress.innerHTML = `<i class="fas fa-map-marker-alt"></i><span>Address:</span> ${data.ContactAddress || 'N/A'}`;

      const contactEmail = document.createElement('p');
      contactEmail.innerHTML = `<i class="fas fa-envelope"></i><span>Email:</span> ${data.ContactEmail || 'N/A'}`;

      const contactPhone = document.createElement('p');
      contactPhone.innerHTML = `<i class="fas fa-phone-alt"></i><span>Phone:</span> ${data.ContactPhone || 'N/A'}`;


      // Clear existing content and append new content
      page11Div.innerHTML = '';
      page11Div.appendChild(aboutImage);
      page11Div.appendChild(contactInfoContainer);

      // Append the contact details to the contact info container
      contactInfoContainer.appendChild(contactAddress);
      contactInfoContainer.appendChild(contactEmail);
      contactInfoContainer.appendChild(contactPhone);

      // Add the Remove button below the content
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-button');
      removeButton.onclick = () => showRemoveConfirmation(docRef)
      page11Div.appendChild(removeButton);

    } else {
      console.error("No such document found!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

// Function to show the confirmation modal (dynamically created)
function showRemoveConfirmation(docRef) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.style.display = 'flex';

  const modalContent = document.createElement('div');
  modalContent.classList.add('overlay-content');

  const modalText = document.createElement('p');
  modalText.textContent = 'Are you sure you want to remove the about Image?';
  modalContent.appendChild(modalText);

  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Confirm';
  confirmButton.onclick = () => removeAboutImage(docRef, modal);
  confirmButton.id = 'confirmDeleteBtn'
  modalContent.appendChild(confirmButton);

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = () => closeConfirmationModal(modal);
  confirmButton.id = 'confirmDeleteBtn'
  modalContent.appendChild(cancelButton);

  modal.appendChild(modalContent);

  document.body.appendChild(modal);
}

function initializeCarousel(sliderContainer, type) {
  const images = sliderContainer.querySelectorAll('img');
  const totalImages = images.length;

  let currentIndex = type === 'header' ? currentIndexHeader : currentIndexDashboard;

  function updateSlide() {
    const offset = -100 * currentIndex;
    sliderContainer.style.transform = `translateX(${offset}%)`;

    // Log the current image's src and alt attributes
    const currentImage = images[currentIndex];
    if (currentImage) {
      console.log(`Currently displayed image: src=${currentImage.src}, alt=${currentImage.alt}`);
    } else {
      console.log('No image to display.');
    }
  }

  const nextButton = document.getElementById(type === 'header' ? 'nextButtonHeader' : 'nextBtn');
  const prevButton = document.getElementById(type === 'header' ? 'prevButtonHeader' : 'prevBtn');

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
    updateSlide();
    if (type === 'header') currentIndexHeader = currentIndex;
    else currentIndexDashboard = currentIndex;
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
    updateSlide();
    if (type === 'header') currentIndexHeader = currentIndex;
    else currentIndexDashboard = currentIndex;
  });

  updateSlide();
}

window.removeHeaderImages = async function(type = 'header') {
  // Get the correct slider container based on the type
  const sliderContainerId = type === 'header' ? 'headerSliderContainer' : 'dashboardSliderContainer';
  const sliderContainer = document.getElementById(sliderContainerId);

  if (!sliderContainer) {
    console.error(`Slider container with ID "${sliderContainerId}" not found.`);
    return;
  }

  // Identify the currently displayed image in the slider
  const images = sliderContainer.querySelectorAll('img');
  const currentIndex = type === 'header' ? currentIndexHeader : currentIndexDashboard;
  const currentImage = images[currentIndex];

  if (!currentImage) {
    console.error('No image is currently displayed.');
    return;
  }

  // Get the image URL to be removed
  const imageUrl = currentImage.src;

  // Create and display the confirmation modal
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.style.display = 'flex';

  const modalContent = document.createElement('div');
  modalContent.classList.add('overlay-content');

  const modalText = document.createElement('p');
  modalText.textContent = 'Are you sure you want to remove this header image?';
  modalContent.appendChild(modalText);

  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Confirm';
  confirmButton.id = 'confirmDeleteBtn'
  confirmButton.onclick = async () => {
    // Proceed with the image removal if confirmed
    try {
      const loginPageDocRef = doc(db, 'DynamicPages', 'LoginPage');
      const loginPageDoc = await getDoc(loginPageDocRef); // Await the getDoc result

      if (loginPageDoc.exists()) {
        const headerImages = loginPageDoc.data().HeaderImages;

        if (Array.isArray(headerImages)) {
          // Filter out the current image
          const updatedImages = headerImages.filter((url) => url !== imageUrl);

          // Update Firestore
          await updateDoc(loginPageDocRef, { HeaderImages: updatedImages });

          console.log(`Image removed: ${imageUrl}`);
          populateHeaderImages(); // Refresh slider after removal
        } else {
          console.warn('No HeaderImages array found in LoginPage document.');
        }
      } else {
        console.warn('LoginPage document does not exist in DynamicPages collection.');
      }
    } catch (error) {
      console.error('Error removing image:', error);
    }

    // Close the modal after the action
    closeModal(modal);
  };
  modalContent.appendChild(confirmButton);

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = () => closeModal(modal); // Close modal if canceled
  modalContent.appendChild(cancelButton);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Function to close the modal
  function closeModal(modal) {
    modal.style.display = 'none'; // Hide the modal
    setTimeout(() => modal.remove(), 300); // Remove the modal after it's hidden (for smooth transition)
  }
};


window.removeUserDashboardImage = async function() {
  try {
    // Create and display the confirmation modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'flex';

    const modalContent = document.createElement('div');
    modalContent.classList.add('overlay-content');

    const modalText = document.createElement('p');
    modalText.textContent = 'Are you sure you want to remove this image from the dashboard?';
    modalContent.appendChild(modalText);

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.id = 'confirmDeleteBtn'
    confirmButton.onclick = async () => {
      // Proceed with image removal if confirmed
      const sliderContainer = document.querySelector('#userDashboardSliderContainer');
      const images = sliderContainer.querySelectorAll('img');

      // Get the currently displayed image by checking the active index
      const currentIndex = currentIndexDashboard;
      const currentImage = images[currentIndex];

      if (!currentImage) {
        console.error('No image is currently displayed.');
        closeModal(modal);
        return;
      }

      const imageUrl = currentImage.src; // Get the URL of the current image

      const docRef = doc(db, "DynamicPages", "DashboardPage");
      const docSnap = await getDoc(docRef); // Use await to properly handle the async call

      if (docSnap.exists()) {
        let bulletinImages = docSnap.data().Bulletin;

        // Remove the image URL from the array
        bulletinImages = bulletinImages.filter(url => url !== imageUrl);

        // Update Firestore with the new array of images
        await updateDoc(docRef, { Bulletin: bulletinImages }); // Await the update operation

        console.log(`Image removed: ${imageUrl}`);

        // Refresh the images on the page after removal
        loadImagesFromFirestore();
      } else {
        console.log('Document not found!');
      }

      // Close the modal after the action
      closeModal(modal);
    };
    modalContent.appendChild(confirmButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = () => closeModal(modal); // Close modal if canceled
    modalContent.appendChild(cancelButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Function to close the modal
    function closeModal(modal) {
      modal.style.display = 'none'; // Hide the modal
      setTimeout(() => modal.remove(), 300); // Remove the modal after it's hidden (for smooth transition)
    }
  } catch (error) {
    console.error('Error removing image:', error);
  }
};



// Function to remove the About Image when confirmed
async function removeAboutImage(docRef, modal) {
  try {
    updateDoc(docRef, {
      AboutImage: ""
    });

    closeConfirmationModal(modal);

    fetchPage11Content();
  } catch (error) {
    console.error("Error removing AboutImage:", error);
  }
}

// Function to close the confirmation modal
function closeConfirmationModal(modal) {
  modal.style.display = 'none'; 
}


// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  loadCategoryOptions();
  loadImagesFromFirestore();
  fetchPage11Content();
  showPage11Content();
});

window.displayUploadedVideo = displayUploadedVideo;
window.showControlManagemen = showDashboard;
window.showDashboard = showDashboard;
window.showControlManagement = showControlManagement;
window.showLatestInterface = showLatestInterface;
window.toggleMainModule =toggleMainModule;
window.addAnimation = addAnimation;
window.triggerUpload = triggerUpload;
window.replaceWithImage = replaceWithImage;
window.saveContactInfo = saveContactInfo;
window.loadNextModule = loadNextModule;
window.loadNextModule2 = loadNextModule2;
window.loadNextModule3 = loadNextModule3;
window.loadNextModule4 = loadNextModule4;
window.toggleDropdown = toggleDropdown;
window.editAccount = editAccount;
window.removeAccount = removeAccount;
window.deactivateAccount = deactivateAccount;
window.populateInactiveAccountsTable = populateInactiveAccountsTable;
window.populateActiveAccountsTable = populateActiveAccountsTable;
window.activateAccount = activateAccount;
window.saveEditedAccount = saveEditedAccount;
window.closeEditOverlay = closeEditOverlay;