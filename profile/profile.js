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

// Function to load user information from Firestore
async function loadUserInfo() {
    const username = localStorage.getItem('userName');

    if (username) {
        const userQuery = query(collection(db, 'UserAccount'), where('Username', '==', username));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            // Set profile picture
            const pictureURL = userData.PictureURL;
            img.setAttribute('src', pictureURL || '');

            // Display About, Gender, Birthday, and Role fields from Firestore
            document.getElementById('userAbout').innerText = userData.About || "N/A";
            document.getElementById('userGender').innerText = userData.Gender || "N/A";
            document.getElementById('userBirthday').innerText = userData.Birthday || "N/A";
            document.getElementById('userRole').innerText = userData.Role || "N/A";
        } else {
            console.error('No such document!');
        }
    }
}

// Load user information on page load
loadUserInfo();

// Close modal function
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Add event listener for close button
document.getElementById('closeModalBtn').addEventListener('click', closeModal);

// Event listener for clicking outside of the modal to close it
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};

// Event listener for Edit button
document.getElementById('editButton').addEventListener('click', () => {
    // Show modal and populate it with current values
    document.getElementById('modal').style.display = 'block';
    document.getElementById('editAbout').value = document.getElementById('userAbout').innerText;
    document.getElementById('editGender').value = document.getElementById('userGender').innerText;
    document.getElementById('editBirthday').value = document.getElementById('userBirthday').innerText;
});

// Event listener for Save button
document.getElementById('saveButton').addEventListener('click', async () => {
    const updatedAbout = document.getElementById('editAbout').value;
    const updatedGender = document.getElementById('editGender').value;
    
    // Get the date input value
    const birthdayInput = document.getElementById('editBirthday').value;
    const formattedBirthday = new Date(birthdayInput).toLocaleDateString('en-US');

    // Password handling
    const password = document.getElementById('editPassword').value;
    const confirmPassword = document.getElementById('editConfirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const username = localStorage.getItem('userName');
    const userQuery = query(collection(db, 'UserAccount'), where('Username', '==', username));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
        const userDocRef = doc(db, 'UserAccount', querySnapshot.docs[0].id);

        // Update Firestore with new data
        await updateDoc(userDocRef, {
            About: updatedAbout,
            Gender: updatedGender,
            Birthday: formattedBirthday,
            Password: password // Save the new password (ensure you hash it in a real app)
        });

        // Update displayed information without reloading the page
        document.getElementById('userAbout').innerText = updatedAbout;
        document.getElementById('userGender').innerText = updatedGender;
        document.getElementById('userBirthday').innerText = formattedBirthday;

        // Hide edit form
        document.getElementById('editForm').style.display = 'none';
    } else {
        console.error('No such document!');
    }
});


// Event listener for file input change to update profile picture
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