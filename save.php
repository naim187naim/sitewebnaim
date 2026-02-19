<?php
// Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "demande_noelie");

// Ton adresse mail pro
$to = "naimalime.pro@gmail.com";
$headers = "From: site-noelie@debian.local\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

// CAS 1 : C'est une réponse aux boutons (Oui, Non, Ami, etc.)
if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    
    // On enregistre dans la base
    $conn->query("INSERT INTO reponses (choix) VALUES ('CHOIX : $choix')");

    // On t'envoie le mail
    $subject = "Alerte : Noelie a fait un choix !";
    $body = "Salut Naim,\n\nNoelie vient de cliquer sur : " . $choix . "\n\nVa voir la suite !";
    
    mail($to, $subject, $body, $headers);
}

// CAS 2 : C'est le message final écrit sur la page jaune
if (isset($_POST['message_texte'])) {
    $texte = $conn->real_escape_string($_POST['message_texte']);
    
    // On enregistre le long texte dans la base
    $conn->query("INSERT INTO reponses (choix) VALUES ('MESSAGE : $texte')");

    // On t'envoie le contenu du message par mail
    $subject = "Nouveau message de Noelie !";
    $body = "Naim, tu as reçu un message écrit :\n\n---\n" . $_POST['message_texte'] . "\n---";
    
    mail($to, $subject, $body, $headers);
}
?>
