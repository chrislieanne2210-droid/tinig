import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    onValue,
    update
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

const auth = getAuth(app);

const database = getDatabase(app);


const reportsContainer =
    document.getElementById("reportsContainer");

const logoutButton =
    document.getElementById("logoutButton");


onAuthStateChanged(auth, function(user) {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    loadReports();

});


logoutButton.addEventListener(
    "click",
    async function() {

        await signOut(auth);

        window.location.href =
            "login.html";

    }
);


function loadReports() {

    const reportsRef =
        ref(database, "reports");


    onValue(reportsRef, function(snapshot) {

        reportsContainer.innerHTML = "";


        if (!snapshot.exists()) {

            reportsContainer.innerHTML =
                "<p>No reports submitted yet.</p>";

            return;

        }


        const reports = snapshot.val();


        Object.entries(reports).forEach(
            ([id, report]) => {


            const reportCard =
                document.createElement("div");


            reportCard.className =
                "report-card";


            const status =
                report.status || "Pending";


            reportCard.innerHTML = `

                <h2>
                    ${report.title}
                </h2>

                <p>
                    <strong>Category:</strong>
                    ${report.category}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${report.location}
                </p>

                <p>
                    <strong>Story:</strong>
                    ${report.story}
                </p>

                <p>
                    <strong>Anonymous:</strong>
                    ${report.anonymous ? "Yes" : "No"}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${status}
                </p>

                <p>
                    <strong>Date Submitted:</strong>
                    ${report.dateSubmitted}
                </p>

                <button class="reviewButton">
                    Mark as Reviewed
                </button>

            `;


            const reviewButton =
                reportCard.querySelector(
                    ".reviewButton"
                );


            if (status === "Reviewed") {

                reviewButton.textContent =
                    "Already Reviewed";

                reviewButton.disabled = true;

            }


            reviewButton.addEventListener(
                "click",
                async function() {


                const reportReference =
                    ref(
                        database,
                        "reports/" + id
                    );


                await update(
                    reportReference,
                    {
                        status: "Reviewed"
                    }
                );


                alert(
                    "Report marked as reviewed."
                );


            });


            reportsContainer.appendChild(
                reportCard
            );

        });

    });

}
