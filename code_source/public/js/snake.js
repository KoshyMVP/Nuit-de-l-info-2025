document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('game-overlay');
    const title = document.getElementById('overlay-title');
    const subtitle = document.getElementById('overlay-subtitle');
    const scoreEl = document.getElementById('score');
    const virusCountEl = document.getElementById('virus-count');

    // Configuration (Matches Python)
    const TILE_SIZE = 60;
    const TILE_COUNT = 15;
    const WIDTH = TILE_COUNT * TILE_SIZE;
    const HEIGHT = TILE_COUNT * TILE_SIZE;
    const OBJECTIVE = 20;
    const MAX_VIRUS = 3;
    
    // Game State
    let snake = [];
    let direction = { x: 1, y: 0 }; // Moving right initially
    let nextDirection = { x: 1, y: 0 };
    let apple = { x: 0, y: 0 };
    let viruses = [];
    let walls = [];
    let score = 0;
    let gameLoop;
    let virusInterval;
    let isPlaying = false;
    let isGameOver = false;
    let speed = 150; // ms per frame (approx 6.6 FPS, close to base speed 5)
    let infected = false;
    let malusTimer = null;
    let malusDelay = 5000;

    // Images
    const images = {};
    const imageNames = ['tete', 'corps', 'pomme', 'mur', 'sol', 'virus', 'fond_menu'];
    let imagesLoaded = 0;

    function loadImages() {
        imageNames.forEach(name => {
            const img = new Image();
            img.src = `public/images/snake/${name}.png`;
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === imageNames.length) {
                    initGame();
                }
            };
            images[name] = img;
        });
    }

    function initGame() {
        // Create Walls (Border)
        walls = [];
        for (let i = 0; i < TILE_COUNT; i++) {
            walls.push({ x: i * TILE_SIZE, y: 0 }); // Top
            walls.push({ x: i * TILE_SIZE, y: (TILE_COUNT - 1) * TILE_SIZE }); // Bottom
            walls.push({ x: 0, y: i * TILE_SIZE }); // Left
            walls.push({ x: (TILE_COUNT - 1) * TILE_SIZE, y: i * TILE_SIZE }); // Right
        }
        
        // Remove duplicates
        walls = walls.filter((v, i, a) => a.findIndex(t => (t.x === v.x && t.y === v.y)) === i);

        resetGame();
        draw(); // Initial draw
    }

    function resetGame() {
        const startX = Math.floor(TILE_COUNT / 2) * TILE_SIZE;
        const startY = Math.floor(TILE_COUNT / 2) * TILE_SIZE;
        
        snake = [
            { x: startX, y: startY },
            { x: startX - TILE_SIZE, y: startY },
            { x: startX - 2 * TILE_SIZE, y: startY }
        ];
        
        direction = { x: TILE_SIZE, y: 0 };
        nextDirection = { x: TILE_SIZE, y: 0 };
        score = 0;
        viruses = [];
        infected = false;
        malusDelay = 5000;
        speed = 150;
        
        updateScore();
        placeApple();
        
        isPlaying = false;
        isGameOver = false;
        
        clearInterval(gameLoop);
        clearInterval(virusInterval);
        clearTimeout(malusTimer);
        
        overlay.style.display = 'flex';
        title.textContent = "PRÊT ?";
        subtitle.textContent = "Appuyez sur ENTRÉE";
    }

    function startGame() {
        if (isPlaying) return;
        isPlaying = true;
        isGameOver = false;
        overlay.style.display = 'none';
        
        gameLoop = setInterval(update, speed);
        
        // Virus Spawning Logic
        virusInterval = setInterval(() => {
            if (!isPlaying) return;
            
            if (viruses.length >= MAX_VIRUS) {
                viruses.shift(); // Remove oldest
            }
            
            const pos = getRandomPosition();
            if (pos) viruses.push(pos);
            updateScore();
            
        }, 5000);
    }

    function getRandomPosition() {
        let pos;
        let attempts = 0;
        const occupied = new Set([
            ...snake.map(p => `${p.x},${p.y}`),
            ...walls.map(p => `${p.x},${p.y}`),
            ...viruses.map(p => `${p.x},${p.y}`),
            `${apple.x},${apple.y}`
        ]);

        while (attempts < 100) {
            const x = Math.floor(Math.random() * (TILE_COUNT - 2) + 1) * TILE_SIZE;
            const y = Math.floor(Math.random() * (TILE_COUNT - 2) + 1) * TILE_SIZE;
            
            if (!occupied.has(`${x},${y}`)) {
                return { x, y };
            }
            attempts++;
        }
        return null;
    }

    function placeApple() {
        const pos = getRandomPosition();
        if (pos) apple = pos;
    }

    function update() {
        // Move Snake
        direction = nextDirection;
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // Check Collisions
        if (checkCollision(head)) {
            gameOver("GAME OVER");
            return;
        }

        snake.unshift(head);

        // Check Apple
        if (head.x === apple.x && head.y === apple.y) {
            score++;
            updateScore();
            speed = Math.max(50, speed - 2); // Increase speed
            clearInterval(gameLoop);
            gameLoop = setInterval(update, speed);
            
            if (infected) {
                infected = false;
                clearTimeout(malusTimer);
                malusDelay = 5000;
            }

            if (score >= OBJECTIVE) {
                gameOver("VICTOIRE !", true);
                return;
            }
            
            placeApple();
        } else {
            snake.pop();
        }

        // Check Virus
        const virusIndex = viruses.findIndex(v => v.x === head.x && v.y === head.y);
        if (virusIndex !== -1) {
            viruses.splice(virusIndex, 1);
            if (infected) {
                malusDelay = Math.max(1000, malusDelay - 1000);
            } else {
                infected = true;
            }
            triggerMalus();
            updateScore();
        }

        draw();
    }

    function triggerMalus() {
        if (!infected || !isPlaying) return;
        
        clearTimeout(malusTimer);
        malusTimer = setTimeout(() => {
            if (infected && isPlaying) {
                score = Math.max(0, score - 1);
                updateScore();
                triggerMalus(); // Loop
            }
        }, malusDelay);
    }

    function checkCollision(pos) {
        // Walls
        if (walls.some(w => w.x === pos.x && w.y === pos.y)) return true;
        // Self (skip head which is already added in logic sometimes, but here we check before add)
        if (snake.some(s => s.x === pos.x && s.y === pos.y)) return true;
        return false;
    }

    function gameOver(msg, win = false) {
        isPlaying = false;
        isGameOver = true;
        clearInterval(gameLoop);
        clearInterval(virusInterval);
        clearTimeout(malusTimer);
        
        overlay.style.display = 'flex';
        title.textContent = msg;
        title.style.color = win ? 'var(--color-green)' : 'var(--color-red)';
        subtitle.textContent = `Score Final : ${score} | [ENTRÉE] pour Rejouer`;
    }

    function updateScore() {
        scoreEl.textContent = score;
        virusCountEl.textContent = viruses.length;
    }

    function draw() {
        // Clear
        ctx.drawImage(images.sol, 0, 0, WIDTH, HEIGHT);

        // Walls
        walls.forEach(w => ctx.drawImage(images.mur, w.x, w.y, TILE_SIZE, TILE_SIZE));

        // Apple
        ctx.drawImage(images.pomme, apple.x, apple.y, TILE_SIZE, TILE_SIZE);

        // Viruses
        viruses.forEach(v => ctx.drawImage(images.virus, v.x, v.y, TILE_SIZE, TILE_SIZE));

        // Snake
        snake.forEach((s, i) => {
            if (i === 0) {
                // Head rotation
                ctx.save();
                ctx.translate(s.x + TILE_SIZE/2, s.y + TILE_SIZE/2);
                let angle = 0;
                if (direction.x > 0) angle = 0; // Right (default image orientation?)
                // Actually Python code rotates: Right=270, Left=90, Up=0, Down=180
                // Assuming image points UP by default based on Python code logic
                if (direction.x > 0) angle = 90 * Math.PI / 180;
                else if (direction.x < 0) angle = -90 * Math.PI / 180;
                else if (direction.y < 0) angle = 0;
                else if (direction.y > 0) angle = 180 * Math.PI / 180;
                
                ctx.rotate(angle);
                ctx.drawImage(images.tete, -TILE_SIZE/2, -TILE_SIZE/2, TILE_SIZE, TILE_SIZE);
                ctx.restore();
            } else {
                ctx.drawImage(images.corps, s.x, s.y, TILE_SIZE, TILE_SIZE);
            }
        });
    }

    // Input
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (!isPlaying) {
                if (isGameOver) resetGame();
                startGame();
            }
        }
        
        if (!isPlaying) return;

        switch(e.key) {
            case 'ArrowUp':
                if (direction.y === 0) nextDirection = { x: 0, y: -TILE_SIZE };
                break;
            case 'ArrowDown':
                if (direction.y === 0) nextDirection = { x: 0, y: TILE_SIZE };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) nextDirection = { x: -TILE_SIZE, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) nextDirection = { x: TILE_SIZE, y: 0 };
                break;
            case 'p':
            case 'P':
                // Pause logic could go here
                break;
        }
    });

    // Start loading
    loadImages();

    // Fullscreen Logic
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const gameContainer = document.getElementById('game-container');

    fullscreenBtn?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            gameContainer.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            gameContainer.style.display = 'flex';
            gameContainer.style.justifyContent = 'center';
            gameContainer.style.alignItems = 'center';
            gameContainer.style.background = 'black';
            canvas.style.height = '100vh';
            canvas.style.width = 'auto'; // Keep aspect ratio
        } else {
            gameContainer.style.display = 'inline-block';
            gameContainer.style.background = 'transparent';
            canvas.style.height = '';
            canvas.style.width = '900px';
        }
    });
});
