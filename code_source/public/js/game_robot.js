/**
 * Logic for the NIRD Robot Game
 * Players control a robot to collect "Action Cards" scattered in the PC.
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('stat-nird'); // Using NIRD score as main score for now

// Game State
let gameRunning = false;
let robot = { x: 50, y: 50, size: 30, speed: 5, color: '#00d2ff' };
let items = [];
let keys = {};
let collectedItems = new Set();

// Cards Data (From main.js, adapted for game)
const gameCards = [
    { id: 1, title: "Formation Libre", color: '#27ae60', x: 200, y: 150, desc: "Former l'équipe aux outils libres.", effectDesc: "📉 Coûts -15%, 📈 NIRD +10%" },
    { id: 2, title: "LibreOffice", color: '#e67e22', x: 500, y: 100, desc: "Remplacer la suite bureautique propriétaire.", effectDesc: "📉 Coûts -25%, 📈 NIRD +15%" },
    { id: 3, title: "Linux", color: '#f1c40f', x: 700, y: 400, desc: "Donner une seconde vie aux vieux PC.", effectDesc: "📉 Obs -35%, 📈 Sobriété +3, 📈 NIRD +10%" },
    { id: 4, title: "Licences Pro", color: '#e74c3c', x: 100, y: 500, desc: "Renouveler les abonnements propriétaires.", effectDesc: "📉 Obs -40%, 📈 Coûts +40% (Attention !)" },
    { id: 5, title: "Serveurs Eco", color: '#2ecc71', x: 400, y: 300, desc: "Éteindre les serveurs inutiles la nuit.", effectDesc: "📈 Sobriété +3" },
    { id: 6, title: "Données", color: '#9b59b6', x: 600, y: 200, desc: "Ateliers sur les données personnelles.", effectDesc: "📈 NIRD +15%" },
    { id: 7, title: "Reconditionné", color: '#34495e', x: 300, y: 450, desc: "Acheter des PC reconditionnés.", effectDesc: "📉 Obs -25%, 📈 Sobriété +2, 📈 NIRD +5%" },
    { id: 8, title: "Hébergement", color: '#1abc9c', x: 50, y: 300, desc: "Héberger le site chez un chaton.", effectDesc: "📈 NIRD +20%, 📈 Sobriété +1" }
];

// Initialize Game
function initGame() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Spawn items based on canvas size (random positions for variety)
    items = gameCards.map(card => ({
        ...card,
        x: Math.random() * (canvas.width - 50),
        y: Math.random() * (canvas.height - 50),
        size: 20,
        collected: false
    }));

    // Input Handling
    window.addEventListener('keydown', e => {
        // Prevent scrolling with arrow keys when game is running
        if (gameRunning && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }

        keys[e.key] = true;
        
        if (isCardDisplayActive && currentPopupItem) {
            const key = e.key.toLowerCase();
            // Handle 'e' to Take
            if (key === 'e') {
                confirmCollection();
            }
            // Handle 'q' to Leave
            else if (key === 'q') {
                cancelCollection();
            }
        }
    });
    window.addEventListener('keyup', e => keys[e.key] = false);

    // Listen for Game End
    document.addEventListener('gameEnded', () => {
        gameRunning = false;
        // Optional: Show a "Mission Complete" overlay on canvas if modal doesn't cover it fully
    });

    // Start Button Listener
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            document.getElementById('game-start-overlay').style.display = 'none';
            gameRunning = true;
            gameLoop();
        });
    } else {
        // Fallback if button not found (should not happen)
        gameRunning = true;
        gameLoop();
    }
}

function resizeCanvas() {
    const container = document.getElementById('game-container-wrapper');
    if (container) {
        canvas.width = container.clientWidth;
        canvas.height = 500; // Fixed height
    }
}

// Main Game Loop
function gameLoop() {
    if (!gameRunning) return;

    if (!isCardDisplayActive) {
        update();
    }
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Robot Movement
    if (keys['ArrowUp'] && robot.y > 0) robot.y -= robot.speed;
    if (keys['ArrowDown'] && robot.y < canvas.height - robot.size) robot.y += robot.speed;
    if (keys['ArrowLeft'] && robot.x > 0) robot.x -= robot.speed;
    if (keys['ArrowRight'] && robot.x < canvas.width - robot.size) robot.x += robot.speed;

    // Collision Detection
    items.forEach(item => {
        const colliding = isColliding(robot, item);
        
        // Reset ignore flag if we moved away
        if (!colliding) {
            item.tempIgnore = false;
        }

        if (!item.collected && !item.tempIgnore && colliding) {
            // Instead of collecting immediately, show popup choice
            showCardPopup(item);
        }
    });
}

function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.size &&
        rect1.x + rect1.size > rect2.x &&
        rect1.y < rect2.y + rect2.size &&
        rect1.y + rect1.size > rect2.y
    );
}

// Card Display State
let isCardDisplayActive = false;
let currentPopupItem = null;

function showCardPopup(item) {
    isCardDisplayActive = true;
    currentPopupItem = item;
    
    const popup = document.getElementById('card-popup');
    document.getElementById('popup-title').textContent = item.title;
    document.getElementById('popup-title').style.color = item.color;
    document.getElementById('popup-desc').textContent = item.desc || "Description indisponible";
    document.getElementById('popup-effect').textContent = item.effectDesc || "Effet inconnu";
    
    popup.style.display = 'flex';
}

function confirmCollection() {
    if (!currentPopupItem) return;
    
    const item = currentPopupItem;
    item.collected = true;
    collectedItems.add(item.id);
    
    // Trigger existing logic from main.js
    const event = new CustomEvent('cardCollected', { detail: { cardId: item.id } });
    document.dispatchEvent(event);
    
    closeCardPopup();
}

function cancelCollection() {
    if (!currentPopupItem) return;
    
    // Mark as temporarily ignored so we don't trigger popup again immediately
    // It will reset once we move away (handled in update loop)
    currentPopupItem.tempIgnore = true;
    
    closeCardPopup();
}

function closeCardPopup() {
    isCardDisplayActive = false;
    currentPopupItem = null;
    document.getElementById('card-popup').style.display = 'none';
    
    // Reset keys
    keys['ArrowUp'] = false;
    keys['ArrowDown'] = false;
    keys['ArrowLeft'] = false;
    keys['ArrowRight'] = false;
    keys['e'] = false;
    keys['q'] = false;
}

// Drawing
function draw() {
    // Clear
    ctx.fillStyle = '#1a1a2e'; // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines (Circuit board effect)
    drawGrid();

    // Draw Items
    items.forEach(item => {
        if (!item.collected) {
            ctx.fillStyle = item.color;
            ctx.fillRect(item.x, item.y, item.size, item.size);
            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = item.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    });

    // Draw Robot
    ctx.fillStyle = robot.color;
    ctx.fillRect(robot.x, robot.y, robot.size, robot.size);
    
    // Robot Eyes
    ctx.fillStyle = 'white';
    ctx.fillRect(robot.x + 5, robot.y + 5, 8, 8);
    ctx.fillRect(robot.x + 17, robot.y + 5, 8, 8);
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(43, 83, 174, 0.2)';
    ctx.lineWidth = 1;
    const gridSize = 50;

    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Floating Text System
let floatingTexts = [];
function showFloatingText(x, y, text) {
    // Simple implementation, would need a separate loop in a real engine
    // For now, just log or simple overlay? 
    // Let's keep it simple: The dashboard update is the feedback.
}

// Start Game on Load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gameCanvas')) {
        initGame();
    }
});
