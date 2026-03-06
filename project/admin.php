<?php
// 1. Connect to the database
$connection = new mysqli("localhost", "root", "", "lab_issues");

if ($connection->connect_error) {
    die("<h3>Database Connection Failed</h3>" . $connection->connect_error);
}

// 2. Get all issues
$sql = "SELECT * FROM issues ORDER BY id DESC";
$result = $connection->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin - All Issues</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f4f4f4;
        }
        h1 {
            background: #0056b3;
            padding: 15px;
            color: white;
            text-align: center;
            border-radius: 5px;
        }
        table {
            width: 100%;
            background: white;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0px 0px 10px #aaa;
        }
        table, th, td {
            border: 1px solid #444;
        }
        th {
            background: #003d80;
            color: white;
            padding: 10px;
        }
        td {
            padding: 10px;
        }
        .status-pending {
            color: red;
            font-weight: bold;
        }
        .status-progress {
            color: orange;
            font-weight: bold;
        }
        .status-completed {
            color: green;
            font-weight: bold;
        }
    </style>
</head>

<body>

<h1>Admin Panel - Submitted Issues</h1>

<table>
    <tr>
        <th>ID</th>
        <th>User Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Issue Type</th>
        <th>Description</th>
        <th>Status</th>
    </tr>

    <?php
    // 3. Display each row from the database
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {

            // Status color styling
            $statusClass = "";
            if ($row['status'] == "Pending") $statusClass = "status-pending";
            elseif ($row['status'] == "In Progress") $statusClass = "status-progress";
            elseif ($row['status'] == "Completed") $statusClass = "status-completed";

            echo "<tr>
                    <td>{$row['id']}</td>
                    <td>{$row['user_name']}</td>
                    <td>{$row['user_email']}</td>
                    <td>{$row['role']}</td>
                    <td>{$row['issue_type']}</td>
                    <td>{$row['issue_description']}</td>
                    <td class='$statusClass'>{$row['status']}</td>
                  </tr>";
        }
    } else {
        echo "<tr><td colspan='7' style='text-align:center;'>No Issues Found</td></tr>";
    }

    $connection->close();
    ?>

</table>

</body>
</html>