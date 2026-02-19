<?php
ini_set('sendmail_path', '/usr/sbin/ssmtp -t');

$conn = new mysqli("localhost", "root", "", "demande_noelie");
$to = "naimalime.pro@gmail.com";

if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('CHOIX : $choix')");
    mail($to, "Choix de Noelie", "Elle a choisi : " . $choix);
}

if (isset($_POST['message_texte'])) {
    $texte = $conn->real_escape_string($_POST['message_texte']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('MESSAGE : $texte')");
    mail($to, "Message de Noelie", "Elle t'a ecrit : \n\n" . $_POST['message_texte']);
}
?>
