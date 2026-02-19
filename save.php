<?php
// Connexion BDD
$conn = new mysqli("localhost", "root", "", "demande_noelie");
$to = "naimalime.pro@gmail.com";

// 1. Si elle clique sur un bouton
if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('CHOIX : $choix')");
    
    // Commande magique (comme dans ton terminal)
    $sujet = "Choix de Noelie : " . $choix;
    shell_exec("echo 'Subject: $sujet\n\nNoelie a choisi : $choix' | ssmtp $to");
}

// 2. Si elle écrit un message (Page Jaune)
if (isset($_POST['message_texte'])) {
    $texte = $_POST['message_texte'];
    $texte_clean = $conn->real_escape_string($texte);
    $conn->query("INSERT INTO reponses (choix) VALUES ('MESSAGE : $texte_clean')");
    
    // On prépare le message pour le terminal
    $corps = "Subject: Nouveau message de Noelie\n\n" . $texte;
    // On utilise escapeshellarg pour éviter les bugs avec les guillemets
    $commande = "echo " . escapeshellarg($corps) . " | ssmtp " . $to;
    shell_exec($commande);
}
?>
