import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


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

const database = getDatabase(app);


const form = document.getElementById("storyForm");


form.addEventListener("submit", async function(event) {

    event.preventDefault();


    const title = document.getElementById("title").value;

    const category = document.getElementById("category").value;

    const location = document.getElementById("location").value;

    const story = document.getElementById("story").value;

    const anonymous = document.getElementById("anonymous").checked;


    const reportReference = push(
        ref(database, "reports")
    );


    try {

        await set(reportReference, {

            title: title,

            category: category,

            location: location,

            story: story,

            anonymous: anonymous,

            dateSubmitted: new Date().toISOString()

        });


        alert(
            "Your story has been submitted successfully."
        );


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
