// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, getDoc, collection } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

function redirectTo(category) {
    if (category === 'Single Character') {
        fetchSingleCharacter();
    } else {
        document.getElementById('selected-category').innerText = category;
        document.getElementById('overlay').style.display = 'block';
    }
}

async function fetchSingleCharacter() {
    const singleCharacterRef = doc(db, 'SignAsset', 'SingleCharacter');

    try {
        const docSnap = await getDoc(singleCharacterRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displaySingleCharacterList(data);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching document: ", error);
    }
}

function displaySingleCharacterList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';

    const listElement = document.createElement('ul');

    Object.keys(data).forEach(key => {
        const listItem = document.createElement('li');
        listItem.textContent = key;
        listItem.style.marginBottom = "10px";  // Add spacing between items

        // Store the video URL in a data attribute
        listItem.dataset.videoUrl = data[key];

        // Add click event to display the video
        listItem.onclick = () => displayVideo(data[key]);

        listElement.appendChild(listItem);
    });

    overlayContent.appendChild(listElement);
    document.getElementById('overlay').style.display = 'block';
}

function displayVideo(videoUrl) {
    // Create a video container or use an existing one
    let videoContainer = document.getElementById('video-container');
    if (!videoContainer) {
        videoContainer = document.createElement('div');
        videoContainer.id = 'video-container';
        videoContainer.style.position = 'fixed';
        videoContainer.style.top = '0';
        videoContainer.style.left = '0';
        videoContainer.style.width = '100%';
        videoContainer.style.height = '100%';
        videoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Semi-transparent black background
        videoContainer.style.zIndex = '9999'; // Ensure it's on top of everything
        videoContainer.style.display = 'flex';
        videoContainer.style.justifyContent = 'center';
        videoContainer.style.alignItems = 'center';
        videoContainer.style.flexDirection = 'column';
        videoContainer.style.padding = '20px';
        videoContainer.style.boxSizing = 'border-box';
        document.body.appendChild(videoContainer);
    }

    // Clear any existing video
    videoContainer.innerHTML = '';

    // Create video element
    const videoElement = document.createElement('video');
    videoElement.src = videoUrl;
    videoElement.controls = true;
    videoElement.style.maxWidth = '80%';
    videoElement.style.maxHeight = '80%';

    // Append video element and close button to container
    videoContainer.appendChild(videoElement);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.backgroundColor = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.color = '#000';

    closeButton.onclick = () => videoContainer.style.display = 'none';

    videoContainer.appendChild(closeButton);
    videoContainer.style.display = 'flex';
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

// Attach functions to the window object so they can be accessed globally
window.redirectTo = redirectTo;
window.closeOverlay = closeOverlay;
