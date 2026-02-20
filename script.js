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
            { text: "Oui, un peu...", action: "envoyerChoix('OUI')" },
            { text: "Non, ça va mieux", action: "envoyerChoix('NON')" }
        ]
    },
    fin: {
        title: "Merci",
        text: "Ton choix a bien été enregistré. À très bientôt !",
        color: "#0f0f0f",
        heart: "✨",
        buttons: [{ text: "Recommencer", action: "changePage('accueil')" }]
    }
};

const app = document.getElementById('app');

function changePage(pageKey) {
    const page = pages[pageKey];
    if (!page) return;

    // Changement de couleur de fond
    document.body.style.backgroundColor = page.color;
    
    // Rendu de la page
    app.innerHTML = `
        <div class="container">
            <h1>${page.title}</h1>
            <p>${page.text}</p>
            ${page.heart ? `<div class="heart-animation">${page.heart}</div>` : ''}
            <div class="buttons">
                ${page.buttons.map(btn => `
                    <button onclick="${btn.action}">${btn.text}</button>
                `).join('')}
            </div>
        </div>
    `;
}

// Fonction pour envoyer le mail et passer à la fin
function envoyerChoix(valeur) {
    const formData = new FormData();
    formData.append('choix', valeur);

    // Envoi au serveur (save.php)
    fetch('save.php', {
        method: 'POST',
        body: formData
    });

    // On affiche la page de fin
    changePage('fin');
}

// Lancement automatique au chargement
window.onload = () => changePage('accueil');
