<?php
if (!isset($_POST["fridgeName"])) {
    header("Location: index.html");
    exit();
}

require_once "connect.php";
mysqli_report(MYSQLI_REPORT_STRICT);

$fridgeName = $_POST['fridgeName'];

try {
    $connection = new mysqli($host, $db_user, $db_password, $db_name);
    if ($connection->connect_errno != 0) {
        throw new Exception(mysqli_connect_errno());
    } else {
        if ($result = $connection->query("SELECT * FROM fridges WHERE fridgeName='$fridgeName'")) {
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $json['fridgeName'] = $row['fridgeName'];
                $json['numOfActiveNotes'] = $row['numOfActiveNotes'];
                $json['numOfAllNotes'] = $row['numOfAllNotes'];
                if ($resultOfSelectNotesQuery = $connection->query("SELECT * FROM notes WHERE fridgeName='$fridgeName'")) {
                    if ($resultOfSelectNotesQuery->num_rows > 0) {
                        $row = $resultOfSelectNotesQuery->fetch_assoc();
                        do {
                            $json['notes'][] = array(
                                'noteID' => $row['noteID'],
                                'noteText' => $row['noteText'],
                                'currentX' => $row['currentX'],
                                'currentY' => $row['currentY'],
                                'width' => $row['width'],
                                'height' => $row['height'],
                                'zIndex' => $row['zIndex']
                            );
                        } while ($row = $resultOfSelectNotesQuery->fetch_assoc());
                        $resultOfSelectNotesQuery->free_result();
                    } else {
                        $json["notes"] = array();
                    }
                    echo json_encode($json, JSON_NUMERIC_CHECK);
                } else {
                    throw new Exception($connection->error);
                }
            } else {
                if ($connection->query("INSERT INTO fridges(fridgeName, numOfActiveNotes, numOfAllNotes) VALUES ('$fridgeName', 0, 0)")) {
                    $json['fridgeName'] = $fridgeName;
                    $json['numOfActiveNotes'] = 0;
                    $json['numOfAllNotes'] = 0;
                    $json['notes'] = array();
                    echo json_encode($json, JSON_NUMERIC_CHECK);
                } else {
                    throw new Exception($connection->error);
                }
            }
            $result->free_result();
        } else {
            throw new Exception($connection->error);
        }
        $connection->close();
    }
} catch (Exception $e) {
    echo "<p>Server error! We apologize for the inconvenience.</p>";
    echo "<p>Developer information: " . $e . "</p>";
}
