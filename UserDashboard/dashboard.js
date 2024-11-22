// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

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

const slider = document.querySelector('.slider .list');
const dotsContainer = document.querySelector('.slider .dots');
const playPauseBtn = document.querySelector('.play-pause-btn');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

let refreshInterval;
let active = 0;
let items = [];
let dots = [];
let lengthItems = 0;

// Function to load images from Firestore and populate the slider
async function loadImagesFromFirestore() {
    try {
        const docRef = doc(db, 'DynamicPages', 'DashboardPage');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const bulletinArray = data.Bulletin || [];

            // Clear current items and dots
            slider.innerHTML = '';
            dotsContainer.innerHTML = '';

            // Populate slider with images from Firestore
            bulletinArray.forEach((imageUrl, index) => {
                // Create slider item
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Image ${index + 1}`;

                itemDiv.appendChild(img);
                slider.appendChild(itemDiv);

                // Create a dot for each image
                const dot = document.createElement('li');
                if (index === 0) dot.classList.add('active'); // Make first dot active by default
                dotsContainer.appendChild(dot);
            });

            // Update items, dots, and lengthItems after populating
            items = document.querySelectorAll('.slider .list .item');
            dots = document.querySelectorAll('.slider .dots li');
            lengthItems = items.length - 1;

            reloadSlider(); // Refresh the slider position
            startAutoplay(); // Start autoplay
        } else {
            console.log("No 'DashboardPage' document found in Firestore.");
        }
    } catch (error) {
        console.error("Error fetching images from Firestore:", error);
    }
}

// Function to start the autoplay slider
function startAutoplay() {
    clearInterval(refreshInterval); // Clear any existing interval
    refreshInterval = setInterval(() => {
        active = (active + 1) <= lengthItems ? active + 1 : 0;
        reloadSlider();
    }, 3000);
}

// Function to update slider position and active dot
function reloadSlider() {
    if (items.length > 0) {
        slider.style.transform = `translateX(-${active * 100}%)`;

        let lastActiveDot = document.querySelector('.slider .dots li.active');
        if (lastActiveDot) lastActiveDot.classList.remove('active');
        dots[active].classList.add('active');
    }
}

// Play/Pause button functionality
playPauseBtn.addEventListener('click', () => {
    if (playIcon.style.display === 'none') {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        startAutoplay();
    } else {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        clearInterval(refreshInterval);
    }
});

// Load images and start autoplay when the page loads
window.onload = loadImagesFromFirestore;

// Add responsive event listeners to adjust slider on resize
window.addEventListener('resize', reloadSlider);
