import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyAW65C2w8uxxDw9Va_GFOoCYQUVgm21cM4",
    authDomain: "ephphathadb.firebaseapp.com",
    projectId: "ephphathadb",
    storageBucket: "ephphathadb.appspot.com",
    messagingSenderId: "408778244868",
    appId: "1:408778244868:web:43bb14d52f45c4c5424651",
    measurementId: "G-LQB54XEB51"
};
//initializing firebase and storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
      
const img = document.querySelector('#photo');
const fileInput = document.querySelector('#file');

// Event listener for file input change
fileInput.addEventListener('change', async function () {
    const file = fileInput.files[0];
    if (file) {
        // Create a reference in Firebase Storage
        const storageRef = ref(storage, 'profile_pictures/' + file.name);

        try {
            // Upload the file to Firebase Storage
            await uploadBytes(storageRef, file);
            console.log('File uploaded successfully');

            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);
            console.log('File available at', downloadURL);

            // Set the profile image src to the download URL
            img.setAttribute('src', downloadURL);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
});