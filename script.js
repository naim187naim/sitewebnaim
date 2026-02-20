// --- CONFIGURATION DES PAGES ---
const pages = {
    accueil: {
        title: "Pour Noélie",
        text: "Je sais que ça fait bien longtemps que je te parle du site web que je te prépare... Le voici enfin. Clique sur suivant pour découvrir la suite.",
        color: "#0f0f0f",
        heart: null,
        buttons: [{ text: "Suivant", action: "changePage('demande')" }]
    },
    demande: {
        title: "La question...",
        text: "Est-ce que tu m'en veux toujours pour ce qu'il s'est passé ?",
        color: "#1a1a1a",
        heart: "❤️",
        buttons: [
            { text: "Oui, un peu...", action: "enregistrerChoix('OUI')" },
            { text: "Non, ça va mieux", action: "enregistrerChoix('NON')" }
        ]
    },
    page_jaune: {
        title: "Un dernier mot ?",
        text: `Dis-moi ce que tu as sur le cœur...<br><br>
               <textarea id="message_noelie" placeholder="Écris ici..." style="width:80%; height:100px; border-radius:10px; padding:10px; border:none;"></textarea>`,
        color: "#fbc02d", // Jaune
        heart: "✍️",
        buttons: [{ text: "Envoyer à Naïm", action: "envoyerMessageFinal()" }]
    },
    fin: {
        title: "Merci",
        text: "Ton message a bien été envoyé. À très bientôt !",
        color: "#0f0f0f",
        heart: "✨",
        buttons: [{ text: "Recommencer", action: "changePage('accueil')" }]
    }
};

// --- LOGIQUE DU SITE ---

const app = document.getElementById('app');

// Fonction pour changer de page
function changePage(pageKey) {
    const page = pages[pageKey];
    if (!page) return;

    // Mise à jour du style et du contenu
    document.body.style.backgroundColor = page.color;
    
    app.innerHTML = `
        <div class="container" style="text-align:center; padding:50px; color:white; font-family:'Poppins', sans-serif;">
            <h1>${page.title}</h1>
            <p style="font-size:1.2rem; margin:20px 0;">${page.text}</p>
            ${page.heart ? `<div style="font-size:3rem; margin-bottom:20px;">${page.heart}</div>` : ''}
            <div class="buttons">
                ${page.buttons.map(btn => `
                    <button onclick="${btn.action}" style="padding:10px 20px; margin:10px; cursor:pointer; border-radius:5px; border:none; font-weight:bold;">
                        ${btn.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// --- FONCTIONS D'ENVOI (Lien avec PHP) ---

// 1. Envoie le choix OUI ou NON
function enregistrerChoix(valeur) {
    console.log("Envoi du choix : " + valeur);
    const formData = new FormData();
    formData.append('choix', valeur);

    fetch('save.php', {
        method: 'POST',
        body: formData
    });

    // On passe à la page du message
    changePage('page_jaune');
}

// 2. Envoie le texte écrit dans le textarea
function envoyerMessageFinal() {
    const texte = document.getElementById('message_no
