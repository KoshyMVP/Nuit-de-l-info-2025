console.log("Le Village Numérique Résistant - Chargé");

document.addEventListener('DOMContentLoaded', () => {
    // Theme Selector
    const themeSelector = document.getElementById('theme-selector');
    const body = document.body;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    }

    themeSelector?.addEventListener('change', (e) => {
        setTheme(e.target.value);
    });

    function setTheme(theme) {
        // Remove all theme attributes first
        body.removeAttribute('data-theme');
        
        if (theme !== 'light') {
            body.setAttribute('data-theme', theme);
        }
        
        localStorage.setItem('theme', theme);
        
        // Update selector value if needed (e.g. on load)
        if (themeSelector) {
            themeSelector.value = theme;
        }
    }

    // Scroll Top
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle?.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
    });

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Simulator Init
    const simContainer = document.getElementById('simulator-container');
    if (simContainer) {
        initSimulator(simContainer);
    }

    // Konami Code (Haut, Haut, Bas, Bas, G, D, G, D, B, A)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activate Secret
                window.location.href = 'index.php?page=snake';
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});

// Simulator Logic
function initSimulator(container) {
    console.log("Simulator init");

    const initialState = {
        budget: 15000,
        energy: 2,
        obsolescence: 80,
        nird: 10
    };

    // Working state variable
    let state = { ...initialState };
    // Base state to store configuration (budget, etc.)
    let baseState = { ...initialState };

    const maxActions = 3;
    let selectedCards = new Set();
    
    // Initial Dashboard Update
    updateDashboard();
    
    // Cards Definition (unchanged)
    // Cards Definition (Rebalanced)
    const cards = [
        {
            id: 1,
            title: "Formation Logiciel Libre",
            cost: 800,
            desc: "Former l'équipe aux outils libres.",
            effect: (s) => { s.budget -= 800; s.budget *= 0.85; s.nird += 10; },
            effectDesc: "📉 Coûts -15%, 📈 NIRD +10%"
        },
        {
            id: 2,
            title: "Migration LibreOffice",
            cost: 200,
            desc: "Remplacer la suite bureautique propriétaire.",
            effect: (s) => { s.budget -= 200; s.budget *= 0.75; s.nird += 15; },
            effectDesc: "📉 Coûts -25%, 📈 NIRD +15%"
        },
        {
            id: 3,
            title: "Réinstallation Linux (20 PC)",
            cost: 1200,
            desc: "Donner une seconde vie aux vieux PC.",
            effect: (s) => { s.budget -= 1200; s.obsolescence -= 35; s.energy += 3; s.nird += 10; },
            effectDesc: "📉 Obs -35%, 📈 Sobriété +3, 📈 NIRD +10%"
        },
        {
            id: 4,
            title: "Achat Licences Pro",
            cost: 5000,
            desc: "Renouveler les abonnements propriétaires.",
            effect: (s) => { s.budget -= 5000; s.obsolescence -= 40; s.budget *= 1.4; },
            effectDesc: "📉 Obs -40%, 📈 Coûts +40% (Attention !)"
        },
        {
            id: 5,
            title: "Optimisation Serveurs",
            cost: 500,
            desc: "Éteindre les serveurs inutiles la nuit.",
            effect: (s) => { s.budget -= 500; s.energy += 3; },
            effectDesc: "📈 Sobriété +3"
        },
        {
            id: 6,
            title: "Sensibilisation Élèves",
            cost: 300,
            desc: "Ateliers sur les données personnelles.",
            effect: (s) => { s.budget -= 300; s.nird += 15; },
            effectDesc: "📈 NIRD +15%"
        },
        {
            id: 7,
            title: "Matériel Reconditionné",
            cost: 2500,
            desc: "Acheter des PC reconditionnés.",
            effect: (s) => { s.budget -= 2500; s.obsolescence -= 25; s.energy += 2; s.nird += 5; },
            effectDesc: "📉 Obs -25%, 📈 Sobriété +2, 📈 NIRD +5%"
        },
        {
            id: 8,
            title: "Hébergement Local",
            cost: 1000,
            desc: "Héberger le site chez un chaton.",
            effect: (s) => { s.budget -= 1000; s.nird += 20; s.energy += 1; },
            effectDesc: "📈 NIRD +20%, 📈 Sobriété +1"
        }
    ];

    const cardsGrid = document.getElementById('cards-grid');
    
    // Listen for Game Events
    document.addEventListener('cardCollected', (e) => {
        const cardId = e.detail.cardId;
        toggleCard(cardId);
        
        // Update UI counter
        const countEl = document.getElementById('collected-count');
        if (countEl) countEl.textContent = selectedCards.size;
    });

    // Render Cards (Hidden but kept for logic)
    /*
    cards.forEach(card => {
        // ... (Rendering logic removed as we use canvas now)
    });
    */

    function toggleCard(id) {
        if (selectedCards.has(id)) {
            selectedCards.delete(id);
        } else {
            if (selectedCards.size < maxActions) {
                selectedCards.add(id);
            } else {
                // Should not happen in game mode if logic is correct, but safety check
                return;
            }
        }
        updateState();
        
        // Check for Game Over condition
        if (selectedCards.size >= maxActions) {
            // Trigger End Game
            endGame(state);
            
            // Notify Game Script to stop
            const event = new CustomEvent('gameEnded');
            document.dispatchEvent(event);
        }
    }

    function updateState() {
        // Reset to Base State (Configured)
        state = { ...baseState };
        
        // Apply effects of all selected cards
        selectedCards.forEach(id => {
            const card = cards.find(c => c.id === id);
            if (card) {
                card.effect(state);
            }
        });

        // Update UI Cards
        document.querySelectorAll('.action-card').forEach(el => {
            const id = parseInt(el.dataset.id);
            const btn = el.querySelector('.select-btn');
            
            if (selectedCards.has(id)) {
                el.classList.add('selected');
                btn.textContent = "Désélectionner";
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-primary');
            } else {
                el.classList.remove('selected');
                btn.textContent = "Choisir";
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-secondary');
            }
        });

        updateDashboard();
        // updateValidationButton(selectedCards.size === maxActions, state); // Removed as game ends automatically
    }

    function updateDashboard() {
        document.getElementById('stat-budget').textContent = Math.round(state.budget) + " €";
        document.getElementById('stat-energy').textContent = state.energy + "/10";
        document.getElementById('stat-obsolescence').textContent = state.obsolescence + "%";
        document.getElementById('stat-nird').textContent = state.nird + "%";
    }

    /*
    function updateValidationButton(ready, finalState) {
        // ... (Removed)
    }
    */

    function endGame(state) {
        const modal = document.getElementById('result-modal');
        const title = document.getElementById('result-title');
        const msg = document.getElementById('result-message');
        const details = document.getElementById('result-details');
        
        modal.classList.remove('hidden');
        
        // Win Condition (Rebalanced)
        // Budget < 12000 (was 10000)
        // NIRD >= 50 (was 40)
        // Energy >= 5 (unchanged)
        // Obsolescence < 50 (NEW)
        let success = state.budget < 12000 && state.nird >= 50 && state.energy >= 5 && state.obsolescence < 50;
        
        if (success) {
            title.textContent = "🏆 Village Numérique Résistant !";
            msg.textContent = "Félicitations ! Vous avez trouvé l'équilibre parfait entre budget, écologie et liberté.";
            title.style.color = "var(--color-good, #27ae60)";
        } else {
            title.textContent = "Transition Incomplète";
            let advice = "";
            if (state.budget >= 12000) advice += "Le budget est trop élevé. ";
            if (state.nird < 50) advice += "L'indice NIRD est trop faible. ";
            if (state.energy < 5) advice += "La sobriété énergétique est insuffisante. ";
            if (state.obsolescence >= 50) advice += "Le parc informatique est trop obsolète. ";
            
            msg.textContent = "Encore un effort ! " + advice;
            title.style.color = "var(--color-low, #e67e22)";
        }

        details.innerHTML = `
            <div style="margin-top: 1rem; text-align: left; background: var(--bg-color); padding: 1rem; border-radius: 10px;">
                <p><strong>Budget Final :</strong> ${Math.round(state.budget)} € <small>(Objectif < 12 000)</small></p>
                <p><strong>Sobriété :</strong> ${state.energy}/10 <small>(Objectif ≥ 5)</small></p>
                <p><strong>Obsolescence :</strong> ${state.obsolescence}% <small>(Objectif < 50%)</small></p>
                <p><strong>Indice NIRD :</strong> ${state.nird}% <small>(Objectif ≥ 50%)</small></p>
            </div>
        `;
    }
}


