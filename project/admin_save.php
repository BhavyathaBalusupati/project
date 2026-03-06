<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

foreach ($data as $p) {
    $user_type = $p["user_type"];
    $name = $p["name"];
    $dept = $p["department"] ?? null;
    $roll = $p["roll_no"] ?? null;
    $lab = $p["lab_name"];
    $system = $p["system_number"];
    $problem = $p["problem"];
    $status = $p["status"];

    $sql = "INSERT INTO all_reports (user_type, name, department, roll_no, lab_name, system_number, problem, status)
            VALUES ('$user_type', '$name', '$dept', '$roll', '$lab', '$system', '$problem', '$status')";

    mysqli_query($conn, $sql);
}

echo "All records saved to database!";
?>