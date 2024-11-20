// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

window.redirectTo = function(category) {
    if (category === 'Single Character') {
        fetchSingleCharacter();
    } else if (category === 'Emotion') {
        fetchEmotion();
    } else if (category === 'Date') {
        fetchDate();
    } else if (category === 'Home') {
        fetchHome();
    } else if (category === 'Animal') {
        fetchAnimal();
    } else if (category === 'Family') {
        fetchFamily();
    } else if (category === 'Body Part') {
        fetchBodyPart();
    } else if (category === 'Food and Drink') {
        fetchFoodAndDrink();
    } else if (category === 'Color') {
        fetchColor();
    } else if (category === 'Fruit and Vegetable') {
        fetchFruitAndVegetable();
    } else if (category === 'Medical') {
        fetchMedical();
    } else if (category === 'Religion') {
        fetchReligion();
    } else {
        // Otherwise, display the category name in the overlay
        document.getElementById('selected-category').innerText = category;
        document.getElementById('overlay').style.display = 'block';
    }
};

// Fetch the 'SingleCharacter' document from Firestore
async function fetchSingleCharacter() {
    try {
        const singleCharacterRef = doc(db, 'SignAsset', 'Single Character');
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

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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

// Fetch the 'Date' document from Firestore
async function fetchDate() {
    const dateRef = doc(db, 'SignAsset', 'Date');

    try {
        const docSnap = await getDoc(dateRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayDateList(data);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching document: ", error);
    }
}

// Displays the list of field names from the fetched 'Date' data in an overlay
function displayDateList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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

async function fetchHome() {
    const homeRef = doc(db, 'SignAsset', 'Home');

    try {
        const docSnap = await getDoc(homeRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayHomeList(data);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching document: ", error);
    }
}

// Displays the list of field names from the fetched data in an overlay
function displayHomeList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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


// Fetch the 'Animal' document from Firestore
async function fetchAnimal() {
    const animalRef = doc(db, 'SignAsset', 'Animal');

    try {
        const docSnap = await getDoc(animalRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayAnimal(data);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching document: ", error);
    }
}

// Displays the list of field names from the fetched data in an overlay
function displayAnimal(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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

// Fetch the 'Family 'document from Firestore
async function fetchFamily() {
    const familyRef = doc(db, 'SignAsset', 'Family');
    
    try {
        const docSnap = await getDoc(familyRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayFamilyList(data);
        } else {
            console.log("No such document, check the document path in Firestore.");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        alert("Error fetching data. Check console for details.");
    }
}


// Displays the list of field names from the fetched data in an overlay
function displayFamilyList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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

// Fetch the 'Food and Drink' document from Firestore
async function fetchFoodAndDrink() {
    const foodAndDrinkRef = doc(db, 'SignAsset', 'Food and Drink');
    
    try {
        const docSnap = await getDoc(foodAndDrinkRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayFoodAndDrinkList(data);
        } else {
            console.log("No such document, check the document path in Firestore.");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        alert("Error fetching data. Check console for details.");
    }
}

// Displays the list of field names from the fetched data in an overlay
function displayFoodAndDrinkList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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

// Fetch the 'Body Part' document from Firestore
async function fetchBodyPart() {
    const bodyPartRef = doc(db, 'SignAsset', 'Body Part');
    
    try {
        const docSnap = await getDoc(bodyPartRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayBodyPartList(data);
        } else {
            console.log("No such document, check the document path in Firestore.");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        alert("Error fetching data. Check console for details.");
    }
}

// Displays the list of field names from the fetched data in an overlay
function displayBodyPartList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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

// Fetch the 'Color' document from Firestore
async function fetchColor() {
    const colorRef = doc(db, 'SignAsset', 'Color');
    
    try {
        const docSnap = await getDoc(colorRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayColorList(data);
        } else {
            console.log("No such document, check the document path in Firestore.");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        alert("Error fetching data. Check console for details.");
    }
}

// Displays the list of field names from the fetched data in an overlay
function displayColorList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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

// Fetch the 'Fruit and Vegetable' document from Firestore
async function fetchFruitAndVegetable() {
    const fruitAndVegetableRef = doc(db, 'SignAsset', 'Fruit and Vegetable');
    
    try {
        const docSnap = await getDoc(fruitAndVegetableRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayFruitAndVegetableList(data);
        } else {
            console.log("No such document, check the document path in Firestore.");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        alert("Error fetching data. Check console for details.");
    }
}

// Displays the list of field names from the fetched data in an overlay
function displayFruitAndVegetableList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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

// Fetch the 'Medical' document from Firestore
async function fetchMedical() {
    const medicalRef = doc(db, 'SignAsset', 'Medical');
    
    try {
        const docSnap = await getDoc(medicalRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayMedicalList(data);
        } else {
            console.log("No such document, check the document path in Firestore.");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        alert("Error fetching data. Check console for details.");
    }
}

// Displays the list of field names from the fetched data in an overlay
function displayMedicalList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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

// Fetch the 'Religion' document from Firestore
async function fetchReligion() {
    const religionRef = doc(db, 'SignAsset', 'Religion');
    
    try {
        const docSnap = await getDoc(religionRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            displayReligionList(data);
        } else {
            console.log("No such document, check the document path in Firestore.");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        alert("Error fetching data. Check console for details.");
    }
}

// Displays the list of field names from the fetched data in an overlay
function displayReligionList(data) {
    const overlayContent = document.getElementById('selected-category');
    overlayContent.innerHTML = '';  

    const listElement = document.createElement('ul');

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(data).sort();

    // Iterate over the sorted keys and display them in a list
    sortedKeys.forEach(key => {
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
window.closeOverlay = function() {
    document.getElementById('overlay').style.display = 'none';
}