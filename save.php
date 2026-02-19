<?php
// On force le chemin de SSMTP
ini_set('sendmail_path', '/usr/sbin/ssmtp -t');

$conn = new mysqli("localhost", "root", "", "demande_noelie");
$to = "naimalime.pro@gmail.com";

// En-tête pour éviter d'être considéré comme Spam
$headers = "From: naimalime.pro@gmail.com\r\n";
$headers .= "Reply-To: naimalime.pro@gmail.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

// CAS 1 : Clic sur un bouton
if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('CHOIX : $choix')");

    $subject = "Choix de Noelie : $choix";
    $message = "Salut Naim,\n\nNoelie a clique sur : $choix";
    
    mail($to, $subject, $message, $headers);
}

// CAS 2 : Message écrit sur la page jaune
if (isset($_POST['message_texte'])) {
    $texte = $conn->real_escape_string($_POST['message_texte']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('MESSAGE : $texte')");

    $subject = "Nouveau message de Noelie !";
    $message = "Naim, tu as recu un message :\n\n---\n" . $_POST['message_texte'] . "\n---";
    
    mail($to, $subject, $message, $headers);
}
?>
