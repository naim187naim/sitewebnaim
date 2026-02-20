<?php
$conn = new mysqli("localhost", "root", "", "demande_noelie");
$to = "naimalime.pro@gmail.com";

if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    
    // 1. Sauvegarde BDD
    $conn->query("INSERT INTO reponses (choix) VALUES ('$choix')");
    
    // 2. Envoi Mail (Méthode terminal)
    $sujet = "Choix de Noelie : " . $choix;
    shell_exec("echo 'Subject: $sujet\n\nNoelie a choisi : $choix' | ssmtp $to");
}
?>
