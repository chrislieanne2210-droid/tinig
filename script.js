import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// Firebase Configuration
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


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


// Get Form
const form = document.getElementById("storyForm");


// Submit Form
form.addEventListener("submit", async function(event) {

    event.preventDefault();


    // Get values from form
    const name = document.getElementById("name").value.trim();

    const anonymous = document.getElementById("anonymous").checked;

    const title = document.getElementById("title").value.trim();

    const category = document.getElementById("category").value;

    const location = document.getElementById("location").value.trim();

    const story = document.getElementById("story").value.trim();


    // Choose what name will be saved
    const submittedBy = anonymous ? "Anonymous" : name;


    // Check if name is empty when Anonymous is not selected
    if (!anonymous && name === "") {

        alert("Please enter your name or choose Anonymous.");

        return;

    }


    // Create new report reference
    const reportReference = push(
        ref(database, "reports")
    );


    try {

        // Save report to Firebase
        await set(reportReference, {

            name: submittedBy,

            title: title,

            category: category,

            location: location,

            story: story,

            dateSubmitted: new Date().toISOString()

        });


        // Success message
        alert(
            "Your story has been submitted successfully."
        );


        // Reset form
        form.reset();


    } catch (error) {

        console.error(
            "Error submitting report:",
            error
        );


        alert(
            "Something went wrong. Please try again."
        );

    }

});
