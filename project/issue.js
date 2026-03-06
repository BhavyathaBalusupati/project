// STUDENT ISSUE SUBMISSION SCRIPT

document.getElementById('problemForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById("studentName").value.trim();
    let roll = document.getElementById("rollNumber").value.trim();
    let system = document.getElementById("systemName").value.trim();

    let selected = document.getElementById("problemType").value;
    let manual = document.getElementById("problemManual").value.trim();

    let finalProblem = (selected === "Other") ? manual : selected;

    let issue = {
        userType: "Student",
        name: name,
        roll: roll,
        system: system,
        problem: finalProblem,
        time: new Date().toLocaleString(),
        status: "Pending"
    };

    let list = JSON.parse(localStorage.getItem("problems")) || [];
    list.push(issue);
    localStorage.setItem("problems", JSON.stringify(list));

    window.location.href = "success.html";
});
