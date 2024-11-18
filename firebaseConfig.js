// Injected Firebase Config
const firebaseConfig = {
    apiKey: '${{ secrets.FIREBASE_API_KEY }}',
    authDomain: '${{ secrets.FIREBASE_AUTH_DOMAIN }}',
    projectId: '${{ secrets.FIREBASE_PROJECT_ID }}',
    storageBucket: '${{ secrets.FIREBASE_STORAGE_BUCKET }}',
    messagingSenderId: '${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}',
    appId: '${{ secrets.FIREBASE_APP_ID }}'
};

// Import the necessary Firebase SDKs for modular use
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);