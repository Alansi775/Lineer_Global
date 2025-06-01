document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------
    // 1. تحديد العناصر الأساسية
    // ---------------------------------------------------
    const languageSwitcher = document.getElementById('language-switcher');
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotModal = document.getElementById('chatbot-modal');
    const closeChatbotBtn = document.querySelector('.close-chatbot-btn');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const sendChatbotMessageBtn = document.getElementById('send-chatbot-message');

    // New elements for Dr. Esaam Moqbel's biography modal
    const esaamMoqbelCard = document.querySelector('#team .team-member:first-child');
    const esaamBioModal = document.getElementById('esaam-bio-modal');
    const closeEsaamBioButton = document.getElementById('close-esaam-bio');

    // ---------------------------------------------------
    // 2. وظائف تبديل اللغة (Language Switching)
    // ---------------------------------------------------
    const translatableElements = document.querySelectorAll('[data-en], [data-ar], [data-tr]');

    const updateLanguage = (lang) => {
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                // Check if the element has a span child, otherwise update its own textContent
                const targetElement = element.querySelector('span');
                if (targetElement) {
                    targetElement.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        document.querySelectorAll('input[data-en-placeholder], textarea[data-en-placeholder]').forEach(input => {
            const placeholderTranslation = input.getAttribute(`data-${lang}-placeholder`);
            if (placeholderTranslation) {
                input.setAttribute('placeholder', placeholderTranslation);
            }
        });

        // Specific updates for various dynamic elements
        const chatbotTooltip = document.querySelector('.chatbot-tooltip');
        if (chatbotTooltip) {
            chatbotTooltip.textContent = chatbotTooltip.getAttribute(`data-${lang}`);
        }
        const chatbotHeaderTitle = document.querySelector('.chatbot-header h3');
        if (chatbotHeaderTitle) {
            chatbotHeaderTitle.textContent = chatbotHeaderTitle.getAttribute(`data-${lang}`);
        }
        const chatbotInputPlaceholder = document.getElementById('chatbot-input');
        if (chatbotInputPlaceholder) {
            chatbotInputPlaceholder.placeholder = chatbotInputPlaceholder.getAttribute(`data-${lang}-placeholder`);
        }
        const initialAiMessageElement = document.querySelector('.chatbot-messages .ai-message[data-initial-message]');
        if (initialAiMessageElement) {
             initialAiMessageElement.textContent = initialAiMessageElement.getAttribute(`data-${lang}-initial-message`);
        }
        
        // Update welcoming message header and content
        const welcomeMessageHeader = document.querySelector('.welcome-message h2');
        if (welcomeMessageHeader) {
            welcomeMessageHeader.textContent = welcomeMessageHeader.getAttribute(`data-${lang}`);
        }
        document.querySelectorAll('.welcome-message p, .welcome-message li').forEach(el => {
            if (el.hasAttribute(`data-${lang}`)) {
                el.textContent = el.getAttribute(`data-${lang}`);
            }
        });


        // Update Dr. Esaam Bio Modal title and content
        const esaamBioModalTitle = document.querySelector('#esaam-bio-modal .bio-modal-header h3');
        if (esaamBioModalTitle) {
            esaamBioModalTitle.textContent = esaamBioModalTitle.getAttribute(`data-${lang}`);
        }
        document.querySelectorAll('#esaam-bio-modal .bio-modal-body p, #esaam-bio-modal .bio-modal-body li').forEach(el => {
            if (el.hasAttribute(`data-${lang}`)) {
                el.textContent = el.getAttribute(`data-${lang}`);
            }
        });
        
        if (lang === 'ar') {
            body.classList.add('ar');
            document.documentElement.dir = 'rtl';
        } else {
            body.classList.remove('ar');
            document.documentElement.dir = 'ltr';
        }

        // Store in localStorage for persistence
        localStorage.setItem('selectedLang', lang);
    };

    const storedLang = localStorage.getItem('selectedLang') || 'en';
    languageSwitcher.value = storedLang;
    updateLanguage(storedLang);

    languageSwitcher.addEventListener('change', (event) => {
        updateLanguage(event.target.value);
    });

    // ---------------------------------------------------
    // 3. وظائف تبديل الثيم (Theme Toggling)
    // ---------------------------------------------------
    const applyTheme = (theme) => {
        const body = document.body;
        body.classList.remove('light-mode', 'dark-mode');
        
        if (theme === 'light') {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
        
        // إعادة تحميل المتغيرات CSS بالقوة
        const root = document.documentElement;
        root.style.setProperty('--force-reload', Date.now());
    };

    const storedTheme = localStorage.getItem('theme') || 'dark-mode';
    applyTheme(storedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(currentTheme);
        
        // إعادة تطبيق التصميم على العناصر الحساسة
        document.querySelectorAll('header, nav, .card').forEach(el => {
            el.style.display = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.display = '';
        });
    });

    // ---------------------------------------------------
    // 4. وظائف الأنيميشن (Staggered Animations)
    // ---------------------------------------------------
    const animateHeroSectionElements = () => {
        const tagBox = document.querySelector('.tag-box');
        const mainTitle = document.getElementById('main-title');
        const description = document.querySelector('.hero-section .description');
        const welcomeMessage = document.querySelector('.welcome-message'); // New: Select the welcome message
        const buttons = document.querySelector('.hero-section .buttons');

        if (tagBox) {
            tagBox.style.animation = 'fadeIn 0.8s ease-out 0.1s forwards';
        }
        if (mainTitle) {
            mainTitle.style.animation = 'fadeIn 0.8s ease-out 0.3s forwards';
        }
        if (description) {
            description.style.animation = 'fadeIn 0.8s ease-out 0.5s forwards';
        }
        if (welcomeMessage) { // Animate the welcome message
            welcomeMessage.style.animation = 'fadeIn 0.8s ease-out 0.7s forwards';
        }
        if (buttons) {
            buttons.style.animation = 'fadeIn 0.8s ease-out 0.9s forwards'; // Adjust delay if needed
        }
    };

    animateHeroSectionElements();

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animation');
                const delay = parseFloat(element.getAttribute('data-delay')) || 0;

                if (animationType) {
                    element.style.animation = `${animationType} 1s ease-out ${delay + 0.1}s forwards`;
                }
                observer.unobserve(element);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    document.querySelectorAll(
        'section[data-animation], ' +
        '.section-title[data-animation], ' +
        '.vmv-item[data-animation], .feature-item[data-animation], .value-card[data-animation], ' +
        '.team-member[data-animation], .contact-item[data-animation], .social-media-links[data-animation], ' +
        '.contact-form[data-animation], .resource-item[data-animation], .doc-item[data-animation], .faq-item[data-animation], ' +
        '.animated-element[data-animation]'
    ).forEach(el => {
        // Exclude elements within hero-section from this general observer,
        // as they are handled by animateHeroSectionElements
        if (!el.closest('.hero-section')) {
            observer.observe(el);
        }
    });




// ---------------------------------------------------
// 6. Dr. Esaam Moqbel's Biography Modal Logic (Robust)
// ---------------------------------------------------
if (esaamMoqbelCard) {
    esaamMoqbelCard.style.cursor = 'pointer';
    esaamMoqbelCard.addEventListener('click', () => {
        // Always reset modal state before showing
        esaamBioModal.classList.remove('closing');
        const modalContent = esaamBioModal.querySelector('.bio-modal-content');
        if (modalContent) {
            modalContent.classList.remove('closing');
            modalContent.style.opacity = '';
            modalContent.style.transform = '';
        }
        esaamBioModal.style.display = 'flex';

        // Force reflow to restart animation (fixes some browser bugs)
        void esaamBioModal.offsetWidth;

        // Update modal content language on open
        updateLanguage(localStorage.getItem('selectedLang') || 'en');
    });
}

function closeEsaamModal() {
    const modalContent = esaamBioModal.querySelector('.bio-modal-content');
    if (modalContent) {
        modalContent.classList.add('closing');
    }
}

// Only add this ONCE
if (esaamBioModal) {
    const modalContent = esaamBioModal.querySelector('.bio-modal-content');
    if (modalContent) {
        modalContent.addEventListener('animationend', (event) => {
            if (modalContent.classList.contains('closing')) {
                esaamBioModal.style.display = 'none';
                esaamBioModal.classList.remove('closing');
                modalContent.classList.remove('closing');
            }
        });
    }
    // Close modal if clicking outside of the content
    esaamBioModal.addEventListener('click', (event) => {
        if (event.target === esaamBioModal) {
            closeEsaamModal();
        }
    });
}

if (closeEsaamBioButton) {
    closeEsaamBioButton.addEventListener('click', closeEsaamModal);
}

});