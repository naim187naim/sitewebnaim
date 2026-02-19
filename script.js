const pages = {
    accueil: {
        title: "Pour Noélie",
        text: "Je sais que ça fait bien longtemps que je te parle du site web, mais je l'ai enfin fini en espérant qu'il te plaît.",
        color: "#0f0f0f", heart: null,
        buttons: [{ text: "Suivant", action: "changePage('demande')" }]
    },
    demande: {
        title: "Noélie...",
        text: "Noélie, je voudrais que tu saches à quel point tu es gentille, belle, intelligente...<br><br>Chaque moment passé avec toi est incroyable. Je voudrais pouvoir te tenir la main et te dire je t'aime.<br><br>C'est pour ça qu'aujourd'hui, je te demande si tu voudrais sortir avec moi...",
        color: "#2b0a1a", heart: "❤️",
        buttons: [
            { text: "Oui", action: "saveAndNext('oui')" },
            { text: "Non", action: "changePage('choixNon')" }
        ]
    },
    choixNon: {
        title: "Pourquoi ?",
        text: "Bon, je vois que je n'ai peut-être pas assez regardé de films romantiques... Mais j'ai une question : pourquoi tu ne veux pas ?",
        color: "#1a0a0a", heart: "💔",
        buttons: [
            { text: "Pas de relation maintenant", action: "saveAndNext('pas_relation')" },
            { text: "Reste mon meilleur ami", action: "saveAndNext('ami')" }
        ]
    },
    oui: {
        title: "Je t'aime",
        text: "Noélie, je t'aime ! Ça fait bientôt 3 ans que j'attends ça. Je te promets d'être le meilleur à tes yeux et de t'aimer toujours plus chaque jour.",
        color: "#3d0a1a", heart: "💖",
        buttons: [{ text: "Me laisser un petit message ?", action: "changePage('message')" }]
    },
    pas_relation: {
        title: "Je comprends",
        text: "Si tu ne veux pas de couple maintenant, c'est normal. J'attendrai le temps qu'il faudra.",
        color: "#1d0a2b", heart: "💜🩹",
        buttons: [{ text: "Me laisser un petit message ?", action: "changePage('message')" }]
    },
    ami: {
        title: "Ma meilleure pote",
        text: "Je respecte ton choix. Je serai toujours là pour toi, peu importe ce qu'il se passe. Ma meilleure pote.",
        color: "#0a1a2b", heart: "💙",
        buttons: [{ text: "Me laisser un petit message ?", action: "changePage('message')" }]
    },
    message: {
        title: "Un dernier mot ?",
        text: "Si tu as envie de me dire quelque chose de particulier, écris-le ici :",
        color: "#f1c40f", heart: null,
        isInput: true
    }
};

// --- LOGIQUE DU SITE ---

function initHearts() {
    if (!document.getElementById('bg-hearts')) {
        const container = document.createElement('div');
        container.className = 'bg-hearts';
        container.id = 'bg-hearts';
        document.body.prepend(container);
    }
}

function updateHearts(symbol) {
    const container = document.getElementById('bg-hearts');
    if (!container) return;
    container.innerHTML = ''; 
    if (!symbol) return; 
    for(let i=0; i<15; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.className = 'floating-heart';
            h.innerHTML = symbol;
            h.style.left = Math.random() * 100 + 'vw';
            h.style.animationDuration = (Math.random() * 3 + 4) + 's';
            container.appendChild(h);
            setTimeout(() => h.remove(), 6000);
        }, i * 300);
    }
}

function changePage(pageKey) {
    const page = pages[pageKey];
    if (!page) return;

    document.body.style.background = page.color;
    updateHearts(page.heart);
    
    const app = document.getElementById('app');
    
    if (page.isInput) {
        // Design pour la page JAUNE
        app.innerHTML = `
            <div class="glass-card" style="background:rgba(255,255,255,0.95); color:black; border:none;">
                <h1 style="color:black;">${page.title}</h1>
                <p style="color:#333;">${page.text}</p>
                <textarea id="noelieMsg" placeholder="Écris ton message ici..." style="background:#f9f9f9; border:1px solid #ccc; color:black;"></textarea>
                <div class="btn-container">
                    <button onclick="sendFinalMsg()" style="background:black; color:white; border:none;">Envoyer mon message</button>
                </div>
            </div>`;
    } else {
        // Design pour toutes les autres pages
        app.innerHTML = `
            <div class="glass-card">
                <h1>${page.title}</h1>
                <p>${page.text}</p>
                <div class="btn-container">
                    ${page.buttons.map(btn => `<button onclick="${btn.action}">${btn.text}</button>`).join('')}
                </div>
            </div>`;
    }
}

function saveAndNext(choice) {
    // Enregistre le clic dans save.php
    fetch('save.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'choix=' + encodeURIComponent(choice)
    });
    // Passe à la page de résultat (Oui, Ami, ou Pas relation)
    changePage(choice);
}

function sendFinalMsg() {
    const val = document.getElementById('noelieMsg').value;
    if (!val.trim()) return alert("Le message est vide !");

    fetch('save.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'message_texte=' + encodeURIComponent(val)
    }).then(() => {
        alert("Merci Noélie, j'ai bien reçu ton message !");
        location.reload(); // Recommence à l'accueil après l'envoi
    });
}

// Lancement au démarrage
initHearts();
changePage('accueil');
