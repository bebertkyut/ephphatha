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

// Function that navigates to different content categories
function redirectTo(category) {
    if (category === 'Single Character') {
        fetchSingleCharacter();
    } else if (category === 'Emotion') {
        fetchEmotion();
    } else {
        // Otherwise, display the category name in the overlay
        document.getElementById('selected-category').innerText = category;
        document.getElementById('overlay').style.display = 'block';
    }
}

// Fetch the 'SingleCharacter' document from Firestore
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

// Displays the list of field names from the fetched data in an overlay
function displaySingleCharacterList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Iterate over each field name in the Firestore data and display it in a list
    Object.keys(data).forEach(key => {
        const listItem = document.createElement('li');
        listItem.textContent = key; 
        listItem.style.marginBottom = "10px"; 

        listItem.dataset.videoUrl = data[key];

        listItem.onclick = () => displayVideo(data[key]);

        listElement.appendChild(listItem);
    });

    overlayContent.appendChild(listElement);
    document.getElementById('overlay').style.display = 'block'; 
}

// Fetch the 'Emotion' document from Firestore
async function fetchEmotion() {
    const emotionRef = doc(db, 'SignAsset', 'Emotion');

    try {
        const docSnap = await getDoc(emotionRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayEmotionList(data);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching document: ", error);
    }
}

// Displays the list of emotions from the fetched data in an overlay
function displayEmotionList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Iterate over each field name in the Firestore data and display it in a list
    Object.keys(data).forEach(key => {
        const listItem = document.createElement('li');
        listItem.textContent = key; 
        listItem.style.marginBottom = "10px"; 

        listItem.dataset.videoUrl = data[key];

        listItem.onclick = () => displayVideo(data[key]);

        listElement.appendChild(listItem);
    });

    overlayContent.appendChild(listElement);
    document.getElementById('overlay').style.display = 'block'; 
}

// Displays the video in a full-screen overlay
function displayVideo(videoUrl) {
    // Create the video container if it doesn't already exist
    let videoContainer = document.getElementById('video-container');
    if (!videoContainer) {
        videoContainer = document.createElement('div');
        videoContainer.id = 'video-container';
        videoContainer.style.position = 'fixed';
        videoContainer.style.top = '0';
        videoContainer.style.left = '0';
        videoContainer.style.width = '100%';
        videoContainer.style.height = '100%';
        videoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; 
        videoContainer.style.zIndex = '9999'; 
        videoContainer.style.display = 'flex';
        videoContainer.style.justifyContent = 'center';
        videoContainer.style.alignItems = 'center';
        videoContainer.style.flexDirection = 'column';
        videoContainer.style.padding = '20px';
        videoContainer.style.boxSizing = 'border-box';
        document.body.appendChild(videoContainer); 
    }

    videoContainer.innerHTML = ''; 

    // Create video element and set its properties
    const videoElement = document.createElement('video');
    videoElement.src = videoUrl;  
    videoElement.controls = true;  
    videoElement.style.maxWidth = '80%';  
    videoElement.style.maxHeight = '80%';  

    videoContainer.appendChild(videoElement);

    // Create a close button for the video overlay
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

// Close the overlay
function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

// Attach functions to the window object so they can be accessed globally
window.redirectTo = redirectTo;
window.closeOverlay = closeOverlay;
