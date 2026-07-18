import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


const firebaseConfig = {

    apiKey: "AIzaSyDJHjz4nSJrU9YN980UfAGJL9-vmX3YhZg",

    authDomain: "tinig-ed3a7.firebaseapp.com",

    databaseURL: "https://tinig-ed3a7-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "tinig-ed3a7",

    storageBucket: "tinig-ed3a7.firebasestorage.app",

    messagingSenderId: "778408157153",

    appId: "1:778408157153:web:bdef21ec5b88dbda11bca0",

    measurementId: "G-2G92XSTDGQ"

};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value;


        const password =
            document.getElementById("password").value;


        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            alert(
                "Login successful!"
            );


            window.location.href =
                "admin.html";


        } catch (error) {

            console.error(error);


            alert(
                "Invalid email or password."
            );

        }

    }
);
