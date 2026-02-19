<?php
$conn = new mysqli("localhost", "root", "", "demande_noelie");
$to = "naimalime.pro@gmail.com";
$headers = "From: site-noelie@debian.local\r\nContent-Type: text/plain; charset=UTF-8";

if (isset($_POST['choix'])) {
    $c = $conn->real_escape_string($_POST['choix']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('CHOIX : $c')");
    mail($to, "Reponse Noelie : $c", "Elle a clique sur : $c", $headers);
}

if (isset($_POST['message_texte'])) {
    $t = $conn->real_escape_string($_POST['message_texte']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('MESSAGE : $t')");
    mail($to, "Nouveau message de Noelie", "Message recu :\n\n$t", $headers);
}
?>
