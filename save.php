<?php
// Remplace par tes vrais identifiants si tu as créé un utilisateur
$conn = new mysqli("localhost", "root", "", "demande_noelie");

if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('$choix')");
}
?>
