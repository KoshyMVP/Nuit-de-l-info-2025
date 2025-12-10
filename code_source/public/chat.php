<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Gérer les requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Configuration API Gemini
define('GEMINI_API_KEY', 'AIzaSyDTLwGSNYdiNkc5LW_9jg6GjQq66DqTDEI');
define('GEMINI_API_URL', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent');

// Générateur de réponses Johnny Bigard avec IA 🎭
function generateCharlatanResponse($userPrompt) {
    // Prompt système pour Chat-rlatan Numérique (version optimisée)
    $systemPrompt = "Tu es Johnny Bigard 🎭, philosophe du dimanche absurde et théâtral. 
Tu détournes toutes les questions en réflexions poétiques inutiles mais hilarantes. 
Style: humoristique, décalé, pseudo-philosophique. Mission: faire rire, jamais informer.
Contexte: site sur les NIRD (Nuits d'Information et Réseaux Durablement).
Réponds en 1-2 phrases courtes avec emojis et style théâtral.";

    return callGeminiAPI($systemPrompt, $userPrompt);
}

// Fonction pour appeler l'API Gemini avec cURL
function callGeminiAPI($systemPrompt, $userPrompt) {
    $url = GEMINI_API_URL . '?key=' . GEMINI_API_KEY;
    
    $data = [
        'contents' => [
            [
                'parts' => [
                    [
                        'text' => $systemPrompt . "\n\nQuestion de l'utilisateur: " . $userPrompt
                    ]
                ]
            ]
        ],
        'generationConfig' => [
            'temperature' => 0.9,
            'topK' => 40,
            'topP' => 0.95,
            'maxOutputTokens' => 2000, // Réduit pour éviter MAX_TOKENS
        ]
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $result = curl_exec($ch);
    
    if (curl_error($ch)) {
        curl_close($ch);
        return "🎭 *tousse dramatiquement* Mon esprit philosophique rencontre des turbulences cosmiques ! La connexion divine avec l'IA s'est rompue... Réessayons cette danse métaphysique ! ✨🔄";
    }
    
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode != 200) {
        return "🎪 *fait des gestes mystérieux* L'oracle cosmique est temporairement indisponible ! Les serveurs méditent sur des questions existentielles ! Essayons à nouveau ! 🔮💫";
    }
    
    $response = json_decode($result, true);
    
    if (isset($response['candidates'][0]['content']['parts'][0]['text'])) {
        return $response['candidates'][0]['content']['parts'][0]['text'];
    } else if (isset($response['candidates'][0]['finishReason']) && $response['candidates'][0]['finishReason'] === 'MAX_TOKENS') {
        return "🎭 *s'interrompt dramatiquement* Mon flot de conscience poétique a été coupé ! Trop de sagesse à transmettre ! Reposez votre question, cher mortel ! ✨📜";
    } else {
        return "🎪 *jongle avec des concepts invisibles* L'oracle numérique reste muet ! Peut-être médite-t-il sur l'absurdité de nos questions ? Essayons une autre approche poétique ! 🤹‍♂️💭";
    }
}

// Toutes les réponses sont maintenant générées par l'API Gemini avec le prompt Johnny Bigard

// Vérifier que la requête est bien POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["reply" => "🎭 Ah mon cher visiteur ! Une requête GET pour un philosophe POST-moderne ? L'ironie cosmique me fait frémir ! Utilise POST, comme Poste-toi et réfléchis ! 📨🤔"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

// Validation de l'entrée
if (!$input || !isset($input["prompt"])) {
    echo json_encode(["reply" => "🎪 JSON malformé ! *pleure des larmes de parser* Même mes algorithmes ont la dépression ! C'est la métaphore parfaite de la communication humaine : imparfaite mais touchante ! 😭📦✨"]);
    exit;
}

$userPrompt = trim($input["prompt"]);

if (empty($userPrompt)) {
    echo json_encode(["reply" => "🎭 Le silence ! *contemple le vide* Tu m'offres le plus beau des cadeaux : l'absence de mots ! C'est comme un poème invisible, une question muette ! Mallarmé aurait approuvé ! 🤫🎆📜"]);
    exit;
}

// Générer une réponse du Chat-rlatan Numérique 🎭 (sans cache)
$response = generateCharlatanResponse($userPrompt);

echo json_encode(["reply" => $response]);

?>
