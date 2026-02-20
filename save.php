<?php
$conn = new mysqli("localhost", "root", "", "demande_noelie");
$to = "naimalime.pro@gmail.com";

// Enregistrement Choix
if (isset($_POST['choix'])) {
    $c = $conn->real_escape_string($_POST['choix']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('CHOIX : $c')");
    shell_exec("echo 'Subject: Choix Noelie\n\nElle a choisi : $c' | ssmtp $to");
}

// Enregistrement Message
if (isset($_POST['message_texte'])) {
    $m = $conn->real_escape_string($_POST['message_texte']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('MESSAGE : $m')");
    shell_exec("echo 'Subject: Message Noelie\n\nMessage : $m' | ssmtp $to");
}
?>
