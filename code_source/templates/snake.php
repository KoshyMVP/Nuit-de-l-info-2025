<div class="container" style="text-align: center; padding-top: 2rem;">
    <h1 style="font-family: 'Courier New', monospace; color: var(--color-magenta); text-shadow: 0 0 5px var(--color-magenta);">🐍 MISSION : SAUVER LE RÉSEAU 🐍</h1>
    <p style="margin-bottom: 1rem; font-family: 'Courier New', monospace;">Utilisez les flèches pour diriger le serpent. Mangez les pommes pour réparer les PC. Évitez les virus !</p>
    
    <div style="margin-top: 1rem; font-family: 'Courier New', monospace;">
        <span style="color: var(--color-blue);">PC Réparés : <span id="score">0</span>/20</span> | 
        <span style="color: var(--color-magenta);">Virus : <span id="virus-count">0</span>/3</span>
    </div>
    
    


    <div id="game-container" style="position: relative; display: inline-block; box-shadow: 0 0 20px var(--color-purple);">
        <canvas id="snakeCanvas" width="900" height="900" style="background-color: #000; display: block;"></canvas>
        <div id="game-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background: rgba(0,0,0,0.8); color: white; font-family: 'Courier New', monospace;">
            <h2 id="overlay-title" style="font-size: 3rem; margin-bottom: 1rem; color: var(--color-magenta);">PRÊT ?</h2>
            <p id="overlay-subtitle" style="font-size: 1.5rem; margin-bottom: 2rem;">Appuyez sur ENTRÉE pour commencer</p>
            <p style="font-size: 1rem; color: #aaa;">Flèches : Bouger | P : Pause</p>
        </div>
    </div>
<button id="fullscreen-btn" class="btn btn-secondary" style="margin-top: 1rem; font-family: 'Courier New', monospace;">⛶ Plein Écran</button>
</div>

<script src="public/js/snake.js"></script>
