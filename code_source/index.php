<?php
require_once __DIR__ . '/src/db.php';

// Simple router
$page = $_GET['page'] ?? 'home';

// Basic routing logic
$template = __DIR__ . '/templates/' . $page . '.php';

// Whitelist allowed pages for security
$allowed_pages = ['home', 'information', 'education', 'legals', 'snake', 'contact'];
if (!in_array($page, $allowed_pages) || !file_exists($template)) {
    $page = 'home';
    $template = __DIR__ . '/templates/home.php';
}

// Page Titles
switch ($page) {
    case 'information':
        $page_title = "Comprendre";
        break;
    case 'education':
        $page_title = "Simulateur NIRD";
        break;
    case 'legals':
        $page_title = "Mentions Légales";
        break;
    case 'snake':
        $page_title = "🐍 Mission Secrète";
        break;
    case 'contact':
        $page_title = "💀 Pannes Critiques";
        break;
    default:
        $page_title = "Accueil";
        break;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?> - Le Village Numérique Résistant</title>
    <link rel="icon" href="public/images/icone.png">
    <link rel="stylesheet" href="public/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=HK+Grotesk:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <?php include __DIR__ . '/templates/header.php'; ?>

    <main class="container">
        <?php include $template; ?>
    </main>

    <?php include __DIR__ . '/templates/footer.php'; ?>
    
    <script src="public/js/main.js"></script>
</body>
</html>
