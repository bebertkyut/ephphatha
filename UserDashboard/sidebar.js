import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) {
        console.error('Sidebar container not found.');
        return;
    }

    // Fetch the Role from Firestore
    async function getUserRole() {
        const userName = localStorage.getItem('userName');
        if (!userName) {
            console.error('User name not found in localStorage.');
            return null;
        }

        try {
            const userQuery = query(
                collection(db, 'UserAccount'),
                where('Name', '==', userName)
            );
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                return userData.Role || null;
            } else {
                console.error('No user found with this name in Firestore.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user role from Firestore:', error);
            return null;
        }
    }

    try {
        // Load the sidebar content dynamically
        const sidebarHTML = await fetch('sidebar.html').then((res) => {
            if (!res.ok) throw new Error(`Failed to load sidebar: ${res.status}`);
            return res.text();
        });

        sidebarContainer.innerHTML = sidebarHTML;

        // Fetch user role after loading the sidebar
        const userRole = await getUserRole();

        // Add click event for all links in the sidebar
        const sidebarLinks = document.querySelectorAll('.icon_items a');
        sidebarLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetHref = link.getAttribute('href');
                
                // Special logic for "content-item" link
                if (link.parentElement.id === 'content-item') {
                    if (userRole === 'Student') {
                        event.preventDefault(); // Prevent navigation
                        alert('This section is locked. Only teachers can access it.');
                    } else {
                        // Allow navigation for teachers
                        window.location.href = targetHref;
                    }
                } else {
                    // Allow navigation for other links
                    window.location.href = targetHref;
                }
            });
        });

        // Add click event for icons
        const iconItems = document.querySelectorAll('.icon_items i');
        iconItems.forEach((icon) => {
            icon.addEventListener('click', (event) => {
                // Get the link associated with the icon
                const link = icon.closest('li').querySelector('a');
                const targetHref = link ? link.getAttribute('href') : '#';
                
                // Same logic for preventing navigation for students on the content link
                if (link && link.parentElement.id === 'content-item' && userRole === 'Student') {
                    event.preventDefault(); // Prevent navigation
                    alert('This section is locked. Only teachers can access it.');
                } else {
                    // Allow navigation for all other cases
                    window.location.href = targetHref;
                }
            });
        });
    } catch (error) {
        console.error('Error initializing sidebar:', error);
    }
});
