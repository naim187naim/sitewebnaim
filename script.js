// --- GARDE TES VARIABLES DE PAGES ICI ---
// Remets ici EXACTEMENT ton tableau "const pages" tel qu'il était au tout début
// Assure-toi juste que les boutons appellent les nouvelles fonctions ci-dessous

const pages = {
    accueil: {
        title: "Pour Noélie",
        text: "Je sais que ça fait bien longtemps que je te parle du site web...",
        color: "#0f0f0f",
        buttons: [{ text: "Suivant", action: "changePage('demande')" }]
    },
    demande: {
        title: "La question...",
        text: "Est-ce que tu m'en veux toujours ?",
        color: "#1a1a1a",
        buttons: [
            { text: "Oui", action: "enregistrerChoix('OUI')" }, // On change l'action ici
            { text: "Non", action: "enregistrerChoix('NON')" }  // Et ici
        ]
    },
    page_jaune: {
        title: "Un dernier mot ?",
        text: "Dis-moi ce que tu as sur le cœur :<br><textarea id='msg_noelie' style='width:80%;height:80px;'></textarea>",
        color: "#fbc02d",
        buttons: [{ text: "Envoyer", action: "envoyerMessageFinal()" }]
    },
    fin: {
        title: "Merci",
        text: "C'est envoyé !",
        color: "#0f0f0f",
        buttons: []
    }
};

// --- TES FONCTIONS DE DESIGN (NE CHANGE RIEN À TES COEURS) ---
function changePage(p) {
    const pg = pages[p];
    document.body.style.backgroundColor = pg.color;
    
    // ICI : Remets ton code qui affiche les coeurs et tes animations
    const app = document.getElementById('app');
    app.innerHTML = `<h1>${pg.title}</h1><p>${pg.text}</p>`; 
    // ... (ajoute ici ton code d'affichage original)
}

// --- LES FONCTIONS POUR LES EMAILS (À AJOUTER À LA FIN) ---

function enregistrerChoix(valeur) {
    let fd = new FormData();
    fd.append('choix', valeur);
    
    // Envoi au PHP
    fetch('save.php', { method: 'POST', body: fd });
    
    // On continue vers ta page suivante
    changePage('page_jaune');
}

function envoyerMessageFinal() {
    let message = document.getElementById('msg_noelie').value;
    let fd = new FormData();
    fd.append('message_texte', message);

    fetch('save.php', { method: 'POST', body: fd })
    .then(() => {
        changePage('fin');
    });
}

// Initialisation
window.onload = () => changePage('accueil');
