document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CONTADOR DO CARRINHO
    let cartItemsCount = 0;
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            cartItemsCount++;
            cartCountElement.textContent = cartItemsCount;
            
            // Efeito visual sutil no botão ao clicar (Feedback UX)
            const originalText = button.textContent;
            button.textContent = "Adicionado!";
            button.style.backgroundColor = "var(--cls-accent)";
            button.style.color = "var(--cls-white)";
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = "transparent";
                button.style.color = "var(--cls-primary)";
            }, 1200);
        });
    });

    // 2. SCROLL SUAVE (NAVIGATION)
    const menuLinks = document.querySelectorAll('.nav-menu a, .footer-links a, .hero-content a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Descontar a altura do header fixo para não cobrir o título da seção
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. VALIDAÇÃO DA NEWSLETTER
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        
        const emailValue = newsletterEmail.value.trim();

        if (validateEmail(emailValue)) {
            alert(`Inscrição realizada! Muito obrigado por se conectar ao nosso ateliê, enviaremos nossas novidades para: ${emailValue}`);
            newsletterForm.reset();
        } else {
            alert('Por favor, insira um endereço de e-mail válido.');
        }
    });

    // Função auxiliar para validar regex de e-mail
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});