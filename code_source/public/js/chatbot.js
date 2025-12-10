document.addEventListener('DOMContentLoaded', () => {
    // Gestion de l'ouverture/fermeture du chatbot flottant
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');
    const chatNotification = document.getElementById('chatNotification');
    const sendBtn = document.getElementById("sendMessage");
    const input = document.getElementById("chatInput");

    if (!chatToggle || !chatWidget) return;

    // Ouvrir le chat
    chatToggle.addEventListener('click', function() {
        chatWidget.classList.add('open');
        chatToggle.style.display = 'none';
        input.focus();
    });

    // Fermer le chat
    closeChat.addEventListener('click', function() {
        chatWidget.classList.remove('open');
        chatToggle.style.display = 'flex';
    });

    // Fonction d'envoi de message
    async function sendMessage() {
        const message = input.value.trim();
        if (!message) return;

        const messagesDiv = document.getElementById("chatMessages");
        
        // Ajouter le message utilisateur
        messagesDiv.innerHTML += `
            <div class="user-message">
                <div class="message-avatar">👤</div>
                <div class="message-text">${escapeHtml(message)}</div>
            </div>
        `;
        
        // Ajouter un message de chargement
        const loadingId = 'loading-' + Date.now();
        messagesDiv.innerHTML += `
            <div class="bot-message" id="${loadingId}">
                <div class="message-avatar">🤔</div>
                <div class="message-text">🎭 Méditation philosophique en cours...</div>
            </div>
        `;
        
        // Désactiver l'input et le bouton
        input.disabled = true;
        sendBtn.disabled = true;
        input.value = "";
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        try {
            // Envoi au backend PHP
            const response = await fetch("public/chat.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: message })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            
            // Supprimer le message de chargement
            const loadingElement = document.getElementById(loadingId);
            if (loadingElement) {
                loadingElement.remove();
            }
            
            // Ajouter la réponse du bot
            if (data.reply) {
                messagesDiv.innerHTML += `
                    <div class="bot-message">
                        <div class="message-avatar">🎭</div>
                        <div class="message-text">${data.reply}</div>
                    </div>
                `;
            } else {
                messagesDiv.innerHTML += `
                    <div class="bot-message">
                        <div class="message-avatar">🎭</div>
                        <div class="message-text">🎪 L'oracle reste mystérieux ! Essayons à nouveau... ✨</div>
                    </div>
                `;
            }

        } catch (error) {
            console.error('Erreur:', error);
            
            // Supprimer le message de chargement
            const loadingElement = document.getElementById(loadingId);
            if (loadingElement) {
                loadingElement.remove();
            }
            
            // Afficher une erreur
            messagesDiv.innerHTML += `
                <div class="bot-message">
                    <div class="message-avatar">🎭</div>
                    <div class="message-text">🎪 Turbulences cosmiques détectées ! Mon esprit philosophique redémarre... 🔄✨</div>
                </div>
            `;
        } finally {
            // Réactiver l'input et le bouton
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }
    
    // Fonction pour échapper le HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Listeners
    sendBtn.addEventListener('click', sendMessage);
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
