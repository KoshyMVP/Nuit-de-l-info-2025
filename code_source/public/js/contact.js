/**
 * Fonction JavaScript pour afficher le pop-up de consentement (troll).
 */
function showConsentPopUp(checkbox) {
    const soulCaptureDiv = document.getElementById('soul-capture');

    if (checkbox.checked) {
        soulCaptureDiv.style.display = 'block';

        setTimeout(() => {
            soulCaptureDiv.style.display = 'none';
        }, 2000); 
    } else {
            soulCaptureDiv.style.display = 'none';
    }
}

// On utilise DOMContentLoaded pour attacher les écouteurs d'événement
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const errorDiv = document.getElementById('image-erreur-validation');
    const checkbox = document.getElementById('consentement'); 

    // Logique du consentement
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            showConsentPopUp(this);
        });
    }
    
    // Gestion de l'image d'erreur de validation (Validation JS manuelle)
    if (form) {
        form.addEventListener('submit', (event) => {
            
            if (errorDiv) errorDiv.style.display = 'none';

            // Récupère TOUS les champs qui ont l'attribut 'required'
            const requiredFields = form.querySelectorAll('[required]');
            
            let formIsValid = true;
            let errorMsg = "Vous avez laissé des champs vides. Cela déclenche un protocole de \"Chagrin Intergalactique\". Remplissez tout !";
            
            requiredFields.forEach(field => {
                // On vérifie si le champ est vide ou non coché
                const isCheckbox = field.type === 'checkbox';
                const isChecked = isCheckbox && field.checked;
                const isTextEmpty = !isCheckbox && field.value.trim() === '';
                
                // Validation Email
                const isEmail = field.type === 'email';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isInvalidEmail = isEmail && !emailRegex.test(field.value.trim());

                if (isTextEmpty || (isCheckbox && !isChecked) || isInvalidEmail) {
                    formIsValid = false;
                    // Ajoute une bordure d'erreur visible (troll)
                    field.style.border = '3px solid var(--color-troll-red)'; 
                    
                    if (isInvalidEmail && !isTextEmpty) {
                        errorMsg = "Votre email n'est pas valide. Même les pigeons voyageurs sont plus fiables. 🐦✉️";
                    }
                } else {
                    // Réinitialiser le style si le champ est correct
                    field.style.border = '1px solid var(--color-dark-violet)'; 
                }
            });
            
            // Si le formulaire n'est PAS valide :
            if (!formIsValid) {
                event.preventDefault(); 
                if (errorDiv) {
                    const errorText = document.getElementById('error-text');
                    if (errorText) errorText.textContent = errorMsg;
                    
                    errorDiv.style.display = 'block';
                    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
});
