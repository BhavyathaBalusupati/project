import { db } from "./firebase.js";
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
console.log("DB:", db);
// Get elements
const problemType = document.getElementById("problemType");
const problemManual = document.getElementById("problemManual");
const manualLabel = document.getElementById("manualLabel");
const issueForm = document.getElementById("issueForm");

// Show/hide manual input
problemType.addEventListener("change", () => {
    const show = problemType.value === "Other";
    problemManual.style.display = show ? "block" : "none";
    manualLabel.style.display = show ? "block" : "none";
});

// Form submit
issueForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("form  submitted");
    const studentName = document.getElementById("studentName").value.trim();
    const rollNumber = document.getElementById("rollNumber").value.trim();
    const labName = document.getElementById("labName").value.trim();
    const systemNumber = document.getElementById("systemNumber").value.trim();

    const pattern = /^[0-9]{2}[A-Za-z]{2}[0-9][A-Za-z][0-9]{4}$/;

    if (!pattern.test(rollNumber)) {
        alert("Invalid Roll Number (Example: 25SS5A0502)");
        return;
    }

    const problemText = problemType.value === "Other"
        ? problemManual.value.trim()
        : problemType.value;

    try {
        await addDoc(collection(db, "problems"), {
            name: studentName,
            rollno: rollNumber,
            lab: labName,
            system: systemNumber,
            problem: problemText,
            role: "student",
            status: "Pending",
            time: new Date().toLocaleString()
        });

        alert("✅ Issue submitted successfully!");
        window.location.href = "success.html"; // redirect

    } catch (err) {
        console.error(err);
        alert("❌ Error: " + err.message);
    }
});
