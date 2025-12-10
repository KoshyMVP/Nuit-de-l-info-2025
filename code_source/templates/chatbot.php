<!-- Bouton flottant pour ouvrir le chat -->
<div class="chat-toggle-btn" id="chatToggle">
    <div class="chat-icon">🎭</div>
    <div class="chat-notification" id="chatNotification">💬</div>
</div>

<!-- Widget de chat flottant -->
<div class="chat-widget" id="chatWidget">
    <div class="chat-header">
        <div class="chat-header-info">
            <div class="bot-avatar">🎭</div>
            <div class="bot-info">
                <span class="bot-name">Johnny Bigard</span>
                <span class="bot-status">🎪 Philosophe du Dimanche</span>
            </div>
        </div>
        <button class="close-btn" id="closeChat">✕</button>
    </div>
    
    <div class="chat-messages" id="chatMessages">
        <div class="bot-message">
            <div class="message-avatar">🎭</div>
            <div class="message-text">
                Salut ! Moi c'est Johnny Bigard, le philosophe absurde des NIRD ! Je transforme vos questions banales en délires cosmiques ! ✨🎭
            </div>
        </div>
    </div>
    
    <div class="chat-input-area">
        <input type="text" id="chatInput" placeholder="Parlez avec Johnny Bigard... 🎭✨" maxlength="500">
        <button id="sendMessage">📤</button>
    </div>
</div>
