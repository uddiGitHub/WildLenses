<?php
header('Allow: GET, HEAD, POST, DELETE, HIDEFROMUSER', true, 405);
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Content-Type');
// header('Access-Control-Allow-Credentials: true');

if (!empty($_POST['file'])) {
    $targetDir = '../uploadImage/';
    $filename = 'testImage';
    $extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
    $targetFilePath = $targetDir . $filename . '.' . $extension;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
        echo 'File Uploaded';
    } else {
        echo 'Sorry, there was an error uploading your file.';
    }
}
?>
