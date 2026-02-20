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
            { text: "Oui, un peu...", action: "envoyerEtSuivant('OUI')" },
            { text: "Non, ça va mieux", action: "envoyerEtSuivant('NON')" }
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

    document.body.style.backgroundColor = page.color;
    
    // On remet ton affichage d'origine
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

// Fonction qui envoie le mail ET change la page
function envoyerEtSuivant(choix) {
    const formData = new FormData();
    formData.append('choix', choix);

    // Envoi silencieux au PHP
    fetch('save.php', {
        method: 'POST',
        body: formData
    });

    // On passe à la page de fin immédiatement
    changePage('fin');
}

// Lancement
window.onload = () => changePage('accueil');
