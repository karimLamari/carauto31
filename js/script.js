// Menu Burger Mobile avec Overlay
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMobile = document.getElementById('navMobile');
    
    if (burgerMenu && navMobile) {
        // Ouvrir/fermer le menu mobile
        burgerMenu.addEventListener('click', function() {
            navMobile.classList.toggle('active');
            burgerMenu.innerHTML = navMobile.classList.contains('active') ? '✕' : '☰';
        });
        
        // Fermer le menu en cliquant sur l'overlay
        navMobile.addEventListener('click', function(e) {
            if (e.target === navMobile) {
                navMobile.classList.remove('active');
                burgerMenu.innerHTML = '☰';
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        const mobileLinks = navMobile.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMobile.classList.remove('active');
                burgerMenu.innerHTML = '☰';
            });
        });
        
        // Fermer le menu avec la touche Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMobile.classList.contains('active')) {
                navMobile.classList.remove('active');
                burgerMenu.innerHTML = '☰';
            }
        });
    }
});

// Formulaire de Contact amélioré
if (window.location.pathname.includes('contact.html')) {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Validation en temps réel
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation complète
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField({target: input})) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Simulation d'envoi (remplacer par vraie soumission)
                showSuccess();
                contactForm.reset();
            }
        });
    }
}

function validateField(event) {
    const field = event.target;
    const fieldName = field.name;
    const value = field.value.trim();
    const errorElement = document.getElementById(fieldName + '-error');
    
    if (!errorElement) return true;
    
    let errorMessage = '';
    
    switch(fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'Le nom est requis';
            } else if (value.length < 2) {
                errorMessage = 'Le nom doit contenir au moins 2 caractères';
            }
            break;
            
        case 'email':
            if (!value) {
                errorMessage = 'L\'email est requis';
            } else if (!isValidEmail(value)) {
                errorMessage = 'Format d\'email invalide';
            }
            break;
            
        case 'phone':
            if (value && !isValidPhone(value)) {
                errorMessage = 'Format de téléphone invalide';
            }
            break;
            
        case 'message':
            if (!value) {
                errorMessage = 'Le message est requis';
            } else if (value.length < 10) {
                errorMessage = 'Le message doit contenir au moins 10 caractères';
            }
            break;
            
        case 'consent':
            if (!field.checked) {
                errorMessage = 'Vous devez accepter les conditions';
            }
            break;
    }
    
    if (errorMessage) {
        errorElement.textContent = errorMessage;
        field.style.borderColor = '#dc3545';
        return false;
    } else {
        errorElement.textContent = '';
        field.style.borderColor = '#28a745';
        return true;
    }
}

function clearError(event) {
    const field = event.target;
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement && errorElement.textContent) {
        errorElement.textContent = '';
        field.style.borderColor = '#ddd';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone);
}

function showSuccess() {
    const successDiv = document.getElementById('form-success');
    const formContainer = document.querySelector('.contact-form-container');
    
    if (successDiv && formContainer) {
        successDiv.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Cacher le message après 10 secondes
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 10000);
    }
}