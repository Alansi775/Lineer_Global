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

    // ---------------------------------------------------
    // 2. وظائف تبديل اللغة (Language Switching)
    // ---------------------------------------------------
    const translatableElements = document.querySelectorAll('[data-en], [data-ar], [data-tr]');

    const updateLanguage = (lang) => {
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                const targetElement = element.querySelector('span') || element;
                targetElement.textContent = translation;
            }
        });

        document.querySelectorAll('input[data-en-placeholder], textarea[data-en-placeholder]').forEach(input => {
            const placeholderTranslation = input.getAttribute(`data-${lang}-placeholder`);
            if (placeholderTranslation) {
                input.setAttribute('placeholder', placeholderTranslation);
            }
        });

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
        const mainTitle = document.getElementById('main-title');
        if (mainTitle) {
            mainTitle.textContent = mainTitle.getAttribute(`data-${lang}`);
        }
        const heroDescription = document.querySelector('.hero-section .description');
        if (heroDescription) {
            heroDescription.textContent = heroDescription.getAttribute(`data-${lang}`);
        }

        if (lang === 'ar') {
            body.classList.add('ar');
        } else {
            body.classList.remove('ar');
        }

        // Store in memory instead of localStorage
        window.selectedLang = lang;
    };

    const storedLang = window.selectedLang || 'en';
    languageSwitcher.value = storedLang;
    updateLanguage(storedLang);

    languageSwitcher.addEventListener('change', (event) => {
        updateLanguage(event.target.value);
    });

    // ---------------------------------------------------
    // 3. وظائف تبديل الثيم (Theme Toggling)
    // ---------------------------------------------------
    const applyTheme = (theme) => {
        if (theme === 'light-mode') {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        }
        window.theme = theme;
    };

    const storedTheme = window.theme || 'dark-mode';
    applyTheme(storedTheme);

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            applyTheme('dark-mode');
        } else {
            applyTheme('light-mode');
        }
    });

    // ---------------------------------------------------
    // 4. وظائف الأنيميشن (Staggered Animations)
    // ---------------------------------------------------
    const animateHeroSectionElements = () => {
        const tagBox = document.querySelector('.tag-box');
        const mainTitle = document.getElementById('main-title');
        const description = document.querySelector('.hero-section .description');
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
        if (buttons) {
            buttons.style.animation = 'fadeIn 0.8s ease-out 0.7s forwards';
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
        if (!el.closest('.hero-section')) {
            observer.observe(el);
        }
    });

    // ---------------------------------------------------
    // 5. OPTIMIZED AI CHATBOT - FAST RESPONSE SYSTEM
    // ---------------------------------------------------

    // Context Memory for Smarter Responses
    let conversationContext = {
        userPreferences: {},
        askedQuestions: new Set(),
        sessionStartTime: Date.now()
    };

    // Quick Response Cache
    const responseCache = new Map();

    // Enhanced Language Support with Faster Processing
    const languageResponses = {
        en: {
            greeting: "Hello! I'm Lineer Global AI Assistant. How can I help you today?",
            services: `Lineer Global provides integrated solutions in:
            • Health Solutions (Pharmaceutical packaging, medical equipment)
            • Food Industry (Custom labeling, packaging solutions)
            • Textile & Apparel (Branded merchandise, technical textiles)
            • Education Services (Course materials, educational packaging)
            • Industrial Solutions (Custom packaging, logistics support)
            Visit our Features section for detailed information.`,
            about: `Lineer Global bridges health, education, and industry sectors through:
            • Cross-sector integration solutions
            • Emerging market specialization
            • Global standard implementations
            • CEO: Dr. Esaam Moqbel (20+ years industry experience)`,
            contact: `📧 info@lineerglobal.com | 📍 123 Innovation Valley, Istanbul, Turkey | 📱 +90 212 555 01 01
            Follow us: YouTube | LinkedIn | Twitter | Instagram`,
            team: `Our expert team:
            • Dr. Esaam Moqbel (CEO) - Health & Education Solutions
            • John Smith (CTO) - Technical Implementations  
            • Ayşe Demir (COO) - Operations Management
            Meet us in the 'Our Team' section.`,
            values: `Core Values: Quality Assurance (ISO Certified) | Innovation (R&D Focused) | Ethics (Transparent) | Sustainability (Eco-friendly) | Human Development (Training Programs)`,
            shipping: "Global logistics with 30+ country partners. Standard: 3-5 business days. Express available.",
            partnerships: "Strategic partnerships welcome! Contact: partnerships@lineerglobal.com",
            careers: "Join us! Send CV: careers@lineerglobal.com | Open roles: Logistics Specialist, Sales Manager, QA Engineer",
            thanks: "You're welcome! Anything else I can help with?",
            bye: "Thank you for visiting Lineer Global! Have a great day!",
            fallback: "I can help with: Services, Team, Partnerships, Careers, Shipping, Contact info. What interests you?"
        },
        ar: {
            greeting: "مرحبًا! أنا المساعد الذكي لشركة لاينير جلوبال. كيف يمكنني مساعدتك؟",
            services: `تقدم لاينير جلوبال حلولاً متكاملة في:
            • القطاع الصحي (تغليف الأدوية، المعدات الطبية)  
            • الصناعات الغذائية (الملصقات المخصصة، حلول التعبئة)
            • المنسوجات والملابس (المنتجات المميزة، الأقمشة التقنية)
            • الخدمات التعليمية (المواد التعليمية، التغليف التعليمي)
            • الحلول الصناعية (التعبئة المخصصة، الدعم اللوجستي)`,
            about: `لاينير جلوبال تربط القطاعات الصحية والتعليمية والصناعية من خلال:
            • حلول التكامل بين القطاعات • التخصص في الأسواق الناشئة • تطبيق المعايير العالمية
            • الرئيس التنفيذي: د. عصام مقبل (خبرة 20+ سنة)`,
            contact: `📧 info@lineerglobal.com | 📍 وادي الابتكار 123، إسطنبول، تركيا | 📱 212 555 01 01 90+
            تابعونا: يوتيوب | لينكدإن | تويتر | إنستجرام`,
            team: `فريقنا المتخصص:
            • د. عصام مقبل (الرئيس التنفيذي) - حلول الصحة والتعليم
            • جون سميث (الرئيس التقني) - التنفيذ التقني
            • عائشة دمير (مدير العمليات) - إدارة العمليات`,
            values: `قيمنا الأساسية: ضمان الجودة | الابتكار | الشفافية | الاستدامة | تطوير الموارد البشرية`,
            shipping: "شحن عالمي مع شركاء في 30+ دولة. عادي: 3-5 أيام عمل. سريع متاح.",
            partnerships: "مرحبا بالشراكات الإستراتيجية! اتصل: partnerships@lineerglobal.com",
            careers: "انضم إلينا! أرسل السيرة: careers@lineerglobal.com | الوظائف: أخصائي لوجستي، مدير مبيعات، مهندس جودة",
            thanks: "عفواً! أي شيء آخر يمكنني مساعدتك فيه؟",
            bye: "شكراً لزيارة لاينير جلوبال! نتمنى لك يوماً سعيداً!",
            fallback: "يمكنني المساعدة في: الخدمات، الفريق، الشراكات، الوظائف، الشحن، التواصل. ما يهمك؟"
        },
        tr: {
            greeting: "Merhaba! Lineer Global Yapay Zeka Asistanı'yım. Nasıl yardımcı olabilirim?",
            services: `Lineer Global entegre çözümler sunar:
            • Sağlık Çözümleri (İlaç ambalajı, tıbbi ekipman)
            • Gıda Endüstrisi (Özel etiketleme, ambalaj çözümleri)  
            • Tekstil & Giyim (Markalı ürünler, teknik kumaşlar)
            • Eğitim Hizmetleri (Ders materyalleri, eğitim ambalajı)
            • Endüstriyel Çözümler (Özel ambalaj, lojistik destek)`,
            about: `Lineer Global sektörleri birleştiriyor:
            • Sektörler arası entegrasyon • Gelişen pazarlarda uzmanlık • Küresel standartlar
            • CEO: Dr. Esaam Moqbel (20+ yıl deneyim)`,
            contact: `📧 info@lineerglobal.com | 📍 123 İnovasyon Vadisi, İstanbul | 📱 0212 555 01 01
            Takip edin: YouTube | LinkedIn | Twitter | Instagram`,
            team: `Uzman ekibimiz:
            • Dr. Esaam Moqbel (CEO) - Sağlık & Eğitim Çözümleri
            • John Smith (CTO) - Teknik Uygulamalar
            • Ayşe Demir (COO) - Operasyon Yönetimi`,
            values: `Temel Değerler: Kalite Güvencesi | Yenilik | Etik | Sürdürülebilirlik | İnsan Kaynağı Gelişimi`,
            shipping: "30+ ülkede lojistik. Standart: 3-5 iş günü. Ekspres mevcut.",
            partnerships: "Stratejik ortaklık için: partnerships@lineerglobal.com",
            careers: "Katılın! CV: careers@lineerglobal.com | Açık pozisyonlar: Lojistik Uzmanı, Satış Müdürü, Kalite Mühendisi",
            thanks: "Rica ederim! Başka nasıl yardımcı olabilirim?",
            bye: "Lineer Global'i ziyaret ettiğiniz için teşekkürler! İyi günler!",
            fallback: "Yardım edebileceğim konular: Hizmetler, Ekip, Ortaklıklar, Kariyer, Nakliye, İletişim. Hangisi?"
        }
    };

    // Ultra-Fast Pattern Matching with Pre-computed Regex
    const responsePatterns = [
        { regex: /^(hi|hello|hey|merhaba|مرحبا|سلام|selam)/i, key: 'greeting' },
        { regex: /(service|solution|product|hizmet|çözüm|ürün|خدمة|حل|منتج)/i, key: 'services' },
        { regex: /(about|company|who are you|hakkında|şirket|من نحن|شركة)/i, key: 'about' },
        { regex: /(contact|reach|address|email|phone|iletişim|اتصل|بريد|هاتف)/i, key: 'contact' },
        { regex: /(team|member|staff|employee|ekip|عضو|فريق|موظف)/i, key: 'team' },
        { regex: /(value|principle|ethic|quality|değer|ilke|etik|kalite|قيمة|مبدأ|جودة)/i, key: 'values' },
        { regex: /(ship|deliver|logistic|transport|nakliye|teslimat|lojistik|شحن|توصيل|لوجستي)/i, key: 'shipping' },
        { regex: /(partner|collaborate|affiliate|ortak|iş birliği|شريك|تعاون)/i, key: 'partnerships' },
        { regex: /(career|job|position|hire|kariyer|iş|pozisyon|işe alım|وظيفة|مهنة)/i, key: 'careers' },
        { regex: /(thank|thanks|teşekkür|شكر)/i, key: 'thanks' },
        { regex: /(bye|goodbye|see you|hoşça kal|وداع)/i, key: 'bye' }
    ];

    // Chat Functions
    chatbotButton.addEventListener('click', () => {
        chatbotModal.classList.toggle('active');
        if (chatbotModal.classList.contains('active')) {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            chatbotInput.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!chatbotModal.contains(event.target) && !chatbotButton.contains(event.target) && chatbotModal.classList.contains('active')) {
            chatbotModal.classList.remove('active');
        }
    });

    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener('click', () => {
            chatbotModal.classList.remove('active');
        });
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'ai-message', 'typing-indicator');
        typingDiv.innerHTML = '<span>●</span><span>●</span><span>●</span>';
        typingDiv.id = 'typing-indicator';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return typingDiv;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function getCurrentLanguage() {
        return languageSwitcher.value || window.selectedLang || 'en';
    }

    // SUPER FAST AI Response System
    function getAiResponse(userMessage) {
        const currentLang = getCurrentLanguage();
        const cleanMessage = userMessage.toLowerCase().trim();
        
        // Check cache first (instant response for repeated questions)
        const cacheKey = `${currentLang}-${cleanMessage}`;
        if (responseCache.has(cacheKey)) {
            addMessage(responseCache.get(cacheKey), 'ai');
            return;
        }

        // Show minimal typing indicator
        const typingIndicator = addTypingIndicator();
        
        // Ultra-fast pattern matching (under 10ms)
        const startTime = performance.now();
        let responseKey = 'fallback';
        
        for (const pattern of responsePatterns) {
            if (pattern.regex.test(cleanMessage)) {
                responseKey = pattern.key;
                break;
            }
        }
        
        const response = languageResponses[currentLang][responseKey];
        
        // Cache the response for instant future replies
        responseCache.set(cacheKey, response);
        
        // Update conversation context for smarter responses
        conversationContext.askedQuestions.add(responseKey);
        
        // Minimal delay for natural feel (200ms max)
        setTimeout(() => {
            removeTypingIndicator();
            addMessage(response, 'ai');
            
            // Performance logging
            const processingTime = performance.now() - startTime;
            console.log(`AI Response time: ${processingTime.toFixed(2)}ms`);
        }, Math.min(200, Math.random() * 100 + 100));
    }

    // Event Listeners
    sendChatbotMessageBtn.addEventListener('click', () => {
        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatbotInput.value = '';
            getAiResponse(userMessage);
        }
    });

    chatbotInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendChatbotMessageBtn.click();
        }
    });

    // Auto-clear cache periodically to prevent memory bloat
    setInterval(() => {
        if (responseCache.size > 100) {
            responseCache.clear();
        }
    }, 300000); // Clear every 5 minutes

    // Performance monitoring
    console.log('Optimized AI Chatbot loaded - Ready for ultra-fast responses!');
});