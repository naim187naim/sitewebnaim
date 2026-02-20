// --- CONFIGURATION DES PAGES ---
const pages = {
    accueil: {
        title: "Pour Noélie",
        text: `Je sais que ça fait bien longtemps que je te parle du site web que je te prépare... Le voici enfin. Clique sur suivant pour découvrir la suite.`,
        color: "#0f0f0f",
        heart: "✨",
        buttons: [{ text: "Suivant", action: "changePage('demande')" }]
    },
    demande: {
        title: "La question...",
        text: `Est-ce que tu m'en veux toujours pour ce qu'il s'est passé ?`,
        color: "#1a1a1a",
        heart: "❤️",
        buttons: [
            { text: "Oui, un peu...", action: "enregistrerChoix('OUI')" },
            { text: "Non, ça va mieux", action: "enregistrerChoix('NON')" }
        ]
    },
    page_jaune: {
        title: "Un dernier mot ?",
        text: `Dis-moi ce que tu as sur le cœur...<br><br><textarea id="message_noelie" placeholder="Écris ici..." style="width:80%; height:100px; border-radius:10px; padding:10px; border:none; color:black;"></textarea>`,
        color: "#fbc02d",
        heart: "✍️",
        buttons: [{ text: "Envoyer à Naïm", action: "envoyerMessageFinal()" }]
    },
    fin: {
        title: "Merci",
        text: `Ton message a bien été envoyé. À très bientôt !`,
        color: "#0f0f0f",
        heart: "💎",
        buttons: [{ text: "Recommencer", action: "changePage('accueil')" }]
    }
};

// --- LOGIQUE D'AFFICHAGE ---

const app = document.getElementById('app');

function changePage(pageKey) {
    const page = pages[pageKey];
    if (!page) return;

    // Changement de la couleur de fond du site
    document.body.style.backgroundColor = page.color;
    document.body.style.transition = "background-color 0.5s ease";

    // Injection du contenu dans la div "app"
    app.innerHTML = `
        <div class="container" style="text-align:center; padding:50px; color:white; font-family:'Poppins', sans-serif;">
            <h1 style="font-size: 2.5rem;">${page.title}</h1>
            <p style="font-size:1.2rem; margin:20px 0;">${page.text}</p>
            ${page.heart ? `<div style="font-size:3rem; margin-bottom:20px;">${page.heart}</div>` : ''}
            <div class="buttons">
                ${page.buttons.map(btn => `
                    <button onclick="${btn.action}" style="padding:12px 25px; margin:10px; cursor:pointer; border-radius:30px; border:none; font-weight:bold; background-color:white; color:black; font-size:1rem;">
                        ${btn.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// --- LOGIQUE D'ENVOI (LIEN AVEC SAVE.PHP) ---

function enregistrerChoix(valeur) {
    const formData = new FormData();
    formData.append('choix', valeur);

    // Envoi silencieux à PHP
    fetch('save.php', {
        method: 'POST',
        body: formData
    });

    // On passe à la page suivante (le message)
    changePage('page_jaune');
}

function envoyerMessageFinal() {
    const textarea = document.getElementById('message_noelie');
    const texte = textarea ? textarea.value : "";
    
    if (!texte) {
        alert("N'oublie pas d'écrire un petit message !");
        return;
    }

    const formData = new FormData();
    formData.append('message_texte', texte);

    fetch('save.php', {
        method: 'POST',
        body: formData
    }).then(() => {
        changePage('fin');
    }).catch(err => {
        console.error("Erreur envoi:", err);
        changePage('fin'); // On change quand même pour ne pas bloquer Noélie
    });
}

// Lancement au chargement
window.onload = () => changePage('accueil');
