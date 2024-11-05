// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, query, where, getDocs, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; // Import updateDoc from Firestore
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js"; // No updateDoc import here

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAW65C2w8uxxDw9Va_GFOoCYQUVgm21cM4",
    authDomain: "ephphathadb.firebaseapp.com",
    projectId: "ephphathadb",
    storageBucket: "ephphathadb.appspot.com",
    messagingSenderId: "408778244868",
    appId: "1:408778244868:web:43bb14d52f45c4c5424651",
    measurementId: "G-LQB54XEB51"
};

// Initialize Firebase app, Firestore, and Storage
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Elements
const img = document.querySelector('#photo');
const fileInput = document.querySelector('#file');

// Retrieve user information from localStorage
const userName = localStorage.getItem('userName');
const userRole = localStorage.getItem('userRole');

// Display the name and role on the page
document.getElementById('userName').innerText = userName;
document.getElementById('userRole').innerText = userRole;


// Function to load the profile picture from Firestore
async function loadProfilePicture() {
    const username = localStorage.getItem('userName'); // Get the Username

    if (username) {
        const userQuery = query(collection(db, 'UserAccount'), where('Username', '==', username));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; // Get the first matched document
            const pictureURL = userDoc.data().PictureURL;

            if (pictureURL) {
                img.setAttribute('src', pictureURL);
            } else {
                img.setAttribute('src', ''); // Leave blank if PictureURL is missing
            }
        } else {
            console.error('No such document!');
            img.setAttribute('src', ''); // Leave blank if no document found
        }
    }
}
// Load the profile picture on page load
loadProfilePicture();
const userAbout = localStorage.getItem('userAbout');
const userGender = localStorage.getItem('userGender');
const userBirthday = localStorage.getItem('userBirthday');

document.getElementById('userAbout').innerText = userAbout;
document.getElementById('userGender').innerText = userGender;
document.getElementById('userBirthday').innerText = userBirthday;

// Event listener for file input change
fileInput.addEventListener('change', async function () {
    const file = fileInput.files[0];
    if (file) {
        const storageRef = ref(storage, 'profile_pictures/' + file.name);

        try {
            await uploadBytes(storageRef, file);
            console.log('File uploaded successfully');

            // Get the download URL and update the Firestore document
            const downloadURL = await getDownloadURL(storageRef);
            img.setAttribute('src', downloadURL);  // Update profile picture on the page

            // Update Firestore with the new picture URL
            const userQuery = query(collection(db, 'UserAccount'), where('Username', '==', userName)); // Use Username
            const querySnapshot = await getDocs(userQuery);
            if (!querySnapshot.empty) {
                const userDocRef = doc(db, 'UserAccount', querySnapshot.docs[0].id); // Get the document reference
                await updateDoc(userDocRef, { PictureURL: downloadURL });
                console.log('Picture URL updated in Firestore');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
});




