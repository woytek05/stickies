<?php
if (!isset($_POST['noteID'])) {
    header("Location: index.html");
}

require_once "connect.php";
mysqli_report(MYSQLI_REPORT_STRICT);

try {
    $connection = new mysqli($host, $db_user, $db_password, $db_name);
    if ($connection->connect_errno != 0) {
        throw new Exception(mysqli_connect_errno());
    } else {
        $noteID = $_POST['noteID'];
        $fridgeName = $_POST['fridgeName'];
        $noteText = $_POST['noteText'];
        $currentX = $_POST['currentX'];
        $currentY = $_POST['currentY'];
        $width = $_POST['width'];
        $height = $_POST['height'];
        $zIndex = $_POST['zIndex'];
        if ($_POST['deleteNote']) {
            $resultOfDeleteQuery = $connection->query("DELETE FROM notes WHERE noteID='$noteID'");
            if (!$resultOfDeleteQuery) {
                throw new Exception($connection->error);
            }
        }
        if ($result = $connection->query("SELECT * FROM notes WHERE noteID='$noteID'")) {
            if ($result->num_rows > 0) {
                $resultOfUpdateQuery = $connection->query("UPDATE notes SET noteText='$noteText', currentX=$currentX, currentY=$currentY, width=$width, height=$height, zIndex=$zIndex WHERE noteID='$noteID'");
                if (!$resultOfUpdateQuery) {
                    throw new Exception($connection->error);
                }
            } else {
                $resultOfInsertQuery = $connection->query("INSERT INTO notes VALUES ('$noteID', '$fridgeName', '$noteText', $currentX, $currentY, $width, $height, $zIndex)");
                if (!$resultOfInsertQuery) {
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
