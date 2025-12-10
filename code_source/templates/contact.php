<?php
// Variable pour le message de feedback
$message = "";

// Vérifie si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        // Utilisation de la connexion PDO globale $pdo (définie dans src/db.php)
        
        // Récupération des données du formulaire
        $prenom = $_POST['prenom'];
        $nom_famille = $_POST['nom_famille'];
        $email = $_POST['email'];
        $sujet = $_POST['sujet'];
        $message_panne = $_POST['message']; 
        
        // CHAMPS TROLLÉES
        $modele_ordinateur = $_POST['nom_robot_compagnie']; 
        $heure_panne_estimee = $_POST['heure_reveil_exacte'];
        
        // CHAMP DES CHAUSSETTES
        $couleur_chaussette = $_POST['couleur_chaussette_prefere'];
        
        // Consentement
        $consentement_rgpd = isset($_POST['consentement']) ? 1 : 0; 
        
        // Préparation de la requête d'insertion
        $sql = "INSERT INTO contacts_absurdes (prenom, nom_famille, email, sujet, message, nom_robot_compagnie, heure_reveil_exacte, couleur_chaussette_prefere, consentement) 
                 VALUES (:prenom, :nom_famille, :email, :sujet, :message, :nom_robot, :heure_reveil, :couleur_chaussette, :consentement)";
                
        $stmt = $pdo->prepare($sql);
        
        // Liaison des paramètres
        $stmt->execute([
            ':prenom' => $prenom,
            ':nom_famille' => $nom_famille,
            ':email' => $email,
            ':sujet' => $sujet,
            ':message' => $message_panne,
            ':nom_robot' => $modele_ordinateur,
            ':heure_reveil' => $heure_panne_estimee,
            ':couleur_chaussette' => $couleur_chaussette,
            ':consentement' => $consentement_rgpd
        ]);
    
        $message = "**Transmission Corrompue, mais Acceptée !** <span id='flame-effect'>🔥 DONNÉES EN QUARANTAINE 🔥</span> Le ticket #" . $pdo->lastInsertId() . " a été envoyé à notre technicien le plus suspicieux. Attendez qu'il se manifeste. Peut-être.";
        
    } catch (PDOException $e) {
        $message = "**Erreur :** Le serveur a ri et a refusé l'opération. Bravo ! Mais veuillez réessayer. Détails : " . $e->getMessage();
    }
}
?>

<div id="soul-capture">
    <h2 style="color: var(--color-troll-gold);">DONNÉES VOLÉES. CONFIRMATION RGPD.</h2>
    <img src="public/images/ame.gif" alt="Données Capturées" style="width:200px; height:200px;">
</div>

<div class="gif-placeholder">
    **NIRD - INITIATION DU PROTOCOLE DE DESTRUCTION...**
</div>

<div class="container contact-container">
    <h1>💀 Formulaire de PANNES CRITIQUES</h1>
    <h2>(Attention : La mauvaise réponse peut desinstaller votre système 32)</h2>

    <?php if ($message): ?>
        <div class="form-message"><?= $message ?></div>
    <?php endif; ?>
    
    <div id="image-erreur-validation" style="display: none; text-align: center; margin-bottom: 20px; border: 3px double var(--color-troll-red); padding: 15px; background-color: rgba(100, 20, 20, 0.7);">
        <h2 style="color: var(--color-troll-gold); margin-top: 0;">🚨 ERREUR CRITIQUE : SECTEUR DE BOOT INCOMPLET 🚨</h2>
        <p id="error-text" style="color: var(--color-yellow); font-weight: bold;">Vous avez laissé des champs vides. Cela déclenche un protocole de "Chagrin Intergalactique". Remplissez tout !</p>
        <img src="public/images/erreur.gif" alt="Erreur de validation - Champ manquant" style="max-width: 100%; height: auto; margin-top: 10px; border: 1px solid var(--color-troll-gold);">
    </div>

    <form method="POST" action="index.php?page=contact" novalidate>
        
        <fieldset style="border: 1px solid var(--color-purple); padding: 1rem;">
            <legend style="color: var(--color-magenta); padding: 0 0.5rem;"> Informations peu importantes </legend>
            <div class="form-group required-info">
                <label for="prenom">Prénom *</label>
                <input type="text" id="prenom" name="prenom" required>
            </div>
            
            <div class="form-group required-info">
                <label for="nom_famille">Nom de Famille (celui que vous utilisez pour les emails de scam) *</label>
                <input type="text" id="nom_famille" name="nom_famille" required>
            </div>

            <div class="form-group required-info">
                <label for="email">Adresse E-mail (où l'on vous enverra les liens de piratages) *</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="form-group required-info">
                <label for="sujet">Symptôme Principal (Choisissez bien, cela détermine le prix) *</label>
                <input type="text" id="sujet" name="sujet" required>
            </div>

            <div class="form-group required-info">
                <label for="message">Racontez EXACTEMENT ce que vous faisiez au moment de la panique (Soyez dramatique on veux de la Comedia Del Arte) *</label>
                <textarea id="message" name="message" rows="5" maxlength="1000" required></textarea>
            </div>
        </fieldset>

        <fieldset style="border: 1px solid var(--color-purple); padding: 1rem; margin-top: 1rem;">
            <legend style="color: var(--color-magenta); padding: 0 0.5rem;"> Informations importantes</legend>
            
            <div class="form-group useless-info">
                <label for="modele_ordinateur">Surnom Donné à l'ordinateur Avant la Panne (Ex: Gollum, Hatsune Miku) *</label>
                <input type="text" id="modele_ordinateur" name="nom_robot_compagnie" required>
            </div>
            
            <div class="form-group useless-info">
                <label for="couleur_chaussette_prefere">Couleur EXACTE de vos chaussettes le jour de la Panne (C'est essentiel pour la voyance) *</label>
                <input type="text" id="couleur_chaussette_prefere" name="couleur_chaussette_prefere" required>
            </div>
            
            <div class="form-group useless-info">
                <label for="heure_panne_estimee">Heure à laquelle vous vous êtes réveillé le jour où le PC est mort (La corrélation est vitale) *</label>
                <input type="time" id="heure_panne_estimee" name="heure_reveil_exacte" required>
            </div>

        </fieldset>

        <div class="form-group required-info" style="margin-top: 30px;">
            <input type="checkbox" id="consentement" name="consentement" value="1" required>
            <label for="consentement" style="display: inline;">J'accepte que la NIRD puisse éventuellement vendre mes données à des entités extra-terrestres et les formater si la réparation s'avère trop compliquée. *</label>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <button type="submit" class="contact-btn">ACTIVER LE PROTOCOLE DE CHAOS (Soumettre)</button>
        </div>

    </form>
</div>

<script src="public/js/contact.js"></script>
