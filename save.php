<?php
// Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "demande_noelie");

// Ton adresse mail
$to = "naimalime.pro@gmail.com";

// 1. Gestion du message écrit (Page Jaune)
if (isset($_POST['message_texte'])) {
    $texte = $_POST['message_texte'];
    $clean = $conn->real_escape_string($texte);
    
    // Sauvegarde en base
    $conn->query("INSERT INTO reponses (choix) VALUES ('MESSAGE : $clean')");
    
    // Envoi du mail via SSMTP (La méthode qui marche en terminal)
    $sujet = "Nouveau message de Noelie";
    $corps = "Subject: $sujet\n\nNoelie t'a ecrit :\n\n$texte";
    shell_exec("echo " . escapeshellarg($corps) . " | ssmtp " . $to);
}

// 2. Gestion du choix (Boutons Oui/Non)
if (isset($_POST['choix'])) {
    $choix = $_POST['choix'];
    $clean = $conn->real_escape_string($choix);
    
    $conn->query("INSERT INTO reponses (choix) VALUES ('CHOIX : $clean')");
    
    $sujet = "Choix de Noelie : $choix";
    $corps = "Subject: $sujet\n\nElle a repondu : $choix";
    shell_exec("echo " . escapeshellarg($corps) . " | ssmtp " . $to);
}

// Redirection vers une page de confirmation ou retour à l'accueil
header("Location: index.html?success=1");
exit();
?>
