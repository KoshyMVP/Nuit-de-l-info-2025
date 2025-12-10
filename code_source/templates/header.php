<header>
    <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="logo">
            <a href="index.php" style="text-decoration: none; font-size: 1.5rem; font-weight: bold; color: var(--color-blue);">
                🛡️ Village NIRD
            </a>
        </div>
        <button class="menu-toggle" id="menu-toggle" aria-label="Menu">☰</button>
        <nav id="main-nav">
            <ul>
                <li><a href="index.php?page=home">Accueil</a></li>
                <li><a href="index.php?page=information">Comprendre</a></li>
                <li><a href="index.php?page=education">Simulateur NIRD</a></li>
                <li><a href="index.php?page=contact">Formulaire Pannes</a></li>
                <li>
                    <select id="theme-selector" class="btn btn-secondary" style="padding: 0.5rem; cursor: pointer;">
                        <option value="light">☀️ Mode Clair</option>
                        <option value="dark">🌙 Mode Sombre</option>
                        <option value="retro">🕹️ Mode Rétro</option>
                    </select>
                </li>
            </ul>
        </nav>
    </div>
</header>
