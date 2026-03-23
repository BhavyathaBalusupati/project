import { db } from "./firebase.js";
import { collection, getDocs, doc, updateDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Load all problems from Firebase
window.loadProblems = async () => {

    let table = document.getElementById("problemTable");

    table.innerHTML = `
        <tr>
            <th>Role</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Lab</th>
            <th>System</th>
            <th>Problem</th>
            <th>Status</th>
        </tr>
    `;

    const snapshot = await getDocs(collection(db, "problems"));

    if(snapshot.empty){
        table.innerHTML += `<tr><td colspan="7">No problems found</td></tr>`;
        return;
    }

    snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const id = docSnap.id;

        const row = `
        <tr>
            <td>${data.role || "-"}</td>
            <td>${data.name || "-"}</td>
            <td>${data.rollno || "-"}</td>
            <td>${data.lab || "-"}</td>
            <td>${data.system || "-"}</td>
            <td>${data.problem}</td>

            <td>
                <select onchange="updateStatus('${id}', this.value)">
                    <option ${data.status==="Pending"?"selected":""}>Pending</option>
                    <option ${data.status==="In Progress"?"selected":""}>In Progress</option>
                    <option ${data.status==="Resolved"?"selected":""}>Resolved</option>
                </select>
            </td>
        </tr>
        `;

        table.innerHTML += row;
    });
};

// Update status in Firebase
window.updateStatus = async (id, newStatus) => {

    await updateDoc(doc(db, "problems", id), {
        status: newStatus
    });

    alert("✅ Status updated!");
};
