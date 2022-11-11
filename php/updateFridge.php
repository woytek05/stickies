<?php
if (!isset($_POST['fridgeName'])) {
    header("Location: index.html");
}

require_once "connect.php";
mysqli_report(MYSQLI_REPORT_STRICT);

try {
    $connection = new mysqli($host, $db_user, $db_password, $db_name);
    if ($connection->connect_errno != 0) {
        throw new Exception(mysqli_connect_errno());
    } else {
        $fridgeName = $_POST['fridgeName'];
        $numOfActiveNotes = $_POST['numOfActiveNotes'];
        $numOfAllNotes = $_POST['numOfAllNotes'];

        if ($result = $connection->query("SELECT * FROM fridges WHERE fridgeName='$fridgeName'")) {
            if ($result->num_rows > 0) {
                $resultOfUpdateQuery = $connection->query("UPDATE fridges SET numOfActiveNotes=$numOfActiveNotes, numOfAllNotes=$numOfAllNotes WHERE fridgeName='$fridgeName'");
                if (!$resultOfUpdateQuery) {
                    throw new Exception($connection->error);
                }
            }
            $result->free_result();
        } else {
            throw new Exception($connection->error);
        }
    }
    $connection->close();
} catch (Exception $e) {
    echo "<p>Server error! We apologize for the inconvenience.</p>";
    echo "<p>Developer information: " . $e . "</p>";
}
