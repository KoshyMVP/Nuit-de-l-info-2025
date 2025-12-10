<section class="hero" style="padding: 3rem 2rem; margin-bottom: 2rem;">
    <h1>Simulateur de Transition NIRD</h1>
    <p>Prenez les commandes du Collège Victor et menez la résistance numérique !</p>
</section>

<div class="container" id="simulator-container">
    
    <!-- Mission Context -->
    <div class="card mission-context" style="margin-bottom: 2rem; border-left: 5px solid var(--color-yellow);">
        <h2>📜 Votre Mission</h2>
        <p>Bienvenue au <strong>Collège Victor</strong>. En tant que nouveau responsable numérique, vous faites face à un constat alarmant : budget explosé, ordinateurs lents et obsolètes, et une dépendance totale aux GAFAM.</p>
        <p style="margin-top: 1rem;"><strong>Objectif :</strong> Initier la transition vers un <em>Village Numérique Résistant</em> (NIRD) en choisissant les bonnes actions.</p>
        <ul style="margin-top: 1rem; padding-left: 1.5rem;">
            <li>📉 <strong>Réduire les coûts</strong> sous les 10 000 €/an.</li>
            <li>🌿 <strong>Améliorer la sobriété</strong> énergétique.</li>
            <li>💻 <strong>Lutter contre l'obsolescence</strong> du matériel.</li>
            <li>🐧 <strong>Augmenter l'indice NIRD</strong> (Libre & Éthique).</li>
        </ul>
    </div>

    <!-- Dashboard -->
    <div class="dashboard card">
        <h2>Tableau de Bord - Collège Victor</h2>
        <div class="stats-grid">
            <div class="stat-item">
                <h3>Budget Licences</h3>
                <p id="stat-budget" class="stat-value critical">15 000 €</p>
            </div>
            <div class="stat-item">
                <h3>Sobriété Énergétique</h3>
                <p id="stat-energy" class="stat-value low">2/10</p>
            </div>
            <div class="stat-item">
                <h3>Obsolescence</h3>
                <p id="stat-obsolescence" class="stat-value critical">80%</p>
            </div>
            <div class="stat-item">
                <h3>Indice NIRD</h3>
                <p id="stat-nird" class="stat-value low">10%</p>
            </div>
        </div>
    </div>

    <!-- Game Section -->
    <div class="actions-section">
        <h2>🎮 Explorez le Système</h2>
        <p style="text-align: center; margin-bottom: 1rem;">Utilisez les flèches directionnelles pour déplacer le robot et récupérer les modules.</p>
        
        <div id="game-container-wrapper" style="position: relative; border: 4px solid var(--color-blue); border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(43, 83, 174, 0.5);">
            <canvas id="gameCanvas" style="display: block; width: 100%;"></canvas>
            <div id="game-overlay" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 10px; border-radius: 5px; color: white;">
                <p>Modules : <span id="collected-count">0</span>/3</p>
            </div>
            
            <!-- Card Popup (Hidden by default) -->
            <div id="card-popup" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; color: white; z-index: 10;">
                <h3 id="popup-title" style="font-size: 2rem; margin-bottom: 1rem; color: var(--color-magenta);">Titre Carte</h3>
                <p id="popup-desc" style="font-size: 1.2rem; margin-bottom: 1rem;">Description...</p>
                <p id="popup-effect" style="font-style: italic; color: var(--color-yellow); margin-bottom: 2rem;">Effet...</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <div style="border: 2px solid var(--color-good, #27ae60); padding: 0.5rem 1rem; border-radius: 5px;">
                        <strong>E</strong> : PRENDRE
                    </div>
                    <div style="border: 2px solid var(--color-critical, #e74c3c); padding: 0.5rem 1rem; border-radius: 5px;">
                        <strong>Q</strong> : LAISSER
                    </div>
                </div>
            </div>

            <!-- Start Game Overlay -->
            <div id="game-start-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 20;">
                <h3 style="color: var(--color-blue); font-size: 2rem; margin-bottom: 1rem;">Prêt à explorer ?</h3>
                <p style="color: white; margin-bottom: 2rem;">Récupérez 3 modules pour sécuriser le réseau.</p>
                <button id="start-game-btn" class="btn btn-primary" style="font-size: 1.2rem; padding: 1rem 2rem;">🚀 Lancer la Simulation</button>
            </div>
        </div>
        
        <!-- Hidden container for logic compatibility -->
        <div class="cards-grid" id="cards-grid" style="display: none;"></div>
    </div>

    <!-- Result Modal (Hidden by default) -->
    <div id="result-modal" class="modal hidden">
        <div class="modal-content card">
            <h2 id="result-title">Résultat</h2>
            <p id="result-message"></p>
            <div id="result-details"></div>
<script src="public/js/main.js"></script>
<script src="public/js/game_robot.js"></script>
            <button class="btn btn-primary" onclick="location.reload()">Quitter</button>
        </div>
    </div>
</div>
