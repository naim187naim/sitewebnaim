<?php
// Connexion à la base
$conn = new mysqli("localhost", "root", "", "demande_noelie");

// Ton email
$to = "naimalime.pro@gmail.com";

if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    
    // 1. Sauvegarde dans MariaDB
    $conn->query("INSERT INTO reponses (choix) VALUES ('$choix')");
    
    // 2. Envoi du mail via SSMTP (méthode directe terminal)
    $sujet = "Reponse de Noelie";
    $message = "Noelie a repondu : " . $choix;
    
    shell_exec("echo 'Subject: $sujet\n\n$message' | ssmtp $to");
}
?>
