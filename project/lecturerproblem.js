// TECHNICIAN PANEL SCRIPT

// Load all problems into table
function loadProblems() {
    let table = document.getElementById("problemTable");

    table.innerHTML = `
        <tr>
            <th>User</th>
            <th>Name</th>
            <th>Department / Roll</th>
            <th>Problem</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    `;

    let list = JSON.parse(localStorage.getItem("problems")) || [];

    list.forEach((p, index) => {
        let row = table.insertRow();

        row.innerHTML = `
            <td>${p.userType}</td>
            <td>${p.name}</td>
            <td>${p.department || p.roll}</td>
            <td>${p.problem}</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="Pending" ${p.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="Resolved" ${p.status === "Resolved" ? "selected" : ""}>Resolved</option>
                </select>
            </td>
            <td>
                <button class="deleteBtn" onclick="deleteProblem(${index})">Remove</button>
            </td>
        `;
    });
}

// Update status (Pending / Resolved)
function updateStatus(index, newStatus) {
    let list = JSON.parse(localStorage.getItem("problems"));
    list[index].status = newStatus;
    localStorage.setItem("problems", JSON.stringify(list));
    alert("Status updated!");
}

// Delete a problem from list
function deleteProblem(index) {
    let list = JSON.parse(localStorage.getItem("problems"));
    list.splice(index, 1);
    localStorage.setItem("problems", JSON.stringify(list));
    loadProblems();
    alert("Problem removed!");
}
