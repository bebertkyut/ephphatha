import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyAW65C2w8uxxDw9Va_GFOoCYQUVgm21cM4",
    authDomain: "ephphathadb.firebaseapp.com",
    projectId: "ephphathadb",
    storageBucket: "ephphathadb.appspot.com",
    messagingSenderId: "408778244868",
    appId: "1:408778244868:web:43bb14d52f45c4c5424651",
    measurementId: "G-LQB54XEB51"
};
const app = initializeApp(firebaseConfig);


const img = document.querySelector('#photo');  
const file = document.querySelector('#file');       
const upload_btn = document.querySelector('#upload_btn'); 

file.addEventListener('change', function() {
    const chosenFile = this.files[0];
    if (chosenFile) {
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            img.setAttribute('src', reader.result); 
        });

        reader.readAsDataURL(chosenFile);  
    }
});

