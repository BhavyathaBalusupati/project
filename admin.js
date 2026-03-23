import { db } from "./firebase.js";
import { collection, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("issueTable");

// Load issues
window.loadIssues = async () => {

    table.innerHTML = `
    <tr>
        <th>Reported By</th>
        <th>Lab</th>
        <th>System</th>
        <th>Problem</th>
        <th>Status</th>
        <th>Action</th>
    </tr>
    `;

    const snapshot = await getDocs(collection(db, "problems"));

    if(snapshot.empty){
        table.innerHTML += `<tr><td colspan="6" class="no-data">No issues found</td></tr>`;
        return;
    }

    snapshot.forEach((docSnap) => {

        const data = docSnap.data();
        const id = docSnap.id;

        let statusClass = "";
        if(data.status === "Pending") statusClass = "pending";
        else if(data.status === "In Progress") statusClass = "in-progress";
        else statusClass = "resolved";

        const row = `
        <tr>
            <td>${data.rollno || data.name}</td>
            <td>${data.lab}</td>
            <td>${data.system}</td>
            <td>${data.problem}</td>
            <td class="${statusClass}">${data.status}</td>
            <td>
                <button onclick="deleteIssue('${id}')">Delete</button>
            </td>
        </tr>
        `;

        table.innerHTML += row;
    });
};

// Delete issue
window.deleteIssue = async (id) => {
    if(confirm("Delete this issue?")){
        await deleteDoc(doc(db, "problems", id));
        loadIssues();
    }
};

// Load on page start
loadIssues();
