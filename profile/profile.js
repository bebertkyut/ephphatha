import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, query, where, getDocs, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

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
    const username = localStorage.getItem('userName');

    if (username) {
        const userQuery = query(collection(db, 'UserAccount'), where('Username', '==', username));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const pictureURL = userDoc.data().PictureURL;

            if (pictureURL) {
                img.setAttribute('src', pictureURL);
            } else {
                img.setAttribute('src', '');
            }
        } else {
            console.error('No such document!');
            img.setAttribute('src', '');
        }
    }
}

loadProfilePicture();

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
            img.setAttribute('src', downloadURL);  

            // Update Firestore with the new picture URL
            const userQuery = query(collection(db, 'UserAccount'), where('Username', '==', userName));
            const querySnapshot = await getDocs(userQuery);
            if (!querySnapshot.empty) {
                const userDocRef = doc(db, 'UserAccount', querySnapshot.docs[0].id);
                await updateDoc(userDocRef, { PictureURL: downloadURL });
                console.log('Picture URL updated in Firestore');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
});
