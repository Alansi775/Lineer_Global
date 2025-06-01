// File: ai-chatbot.js
document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------
    // 5. OPTIMIZED AI CHATBOT - FAST RESPONSE SYSTEM
    // ---------------------------------------------------

    // Get DOM Elements for the chatbot
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotModal = document.getElementById('chatbot-modal');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const sendChatbotMessageBtn = document.getElementById('send-chatbot-message');
    const closeChatbotBtn = document.getElementById('close-chatbot');


    // Smart but Simple AI Chatbot for Lineer Global
class SmartChatbot {
    constructor() {
        this.responsePatterns = [
            { patterns: ['السلام عليكم', 'وعليكم السلام', 'اهلا', 'أهلاً', 'مرحبا', 'صباح الخير', 'مساء الخير', 'سلام', 'الوه', 'الو'], type: 'greeting' },
            { patterns: ['hello', 'hi', 'hey', 'merhaba', 'günaydın', 'iyi akşamlar'], type: 'greeting' },
            { patterns: ['من هو عصام', 'من هو الدكتور عصام', 'ceo', 'esaam', 'moqbel', 'founder', 'دكتور عصام', 'عصام', 'essam'], type: 'ceo' },
            { patterns: ['about', 'company', 'من أنتم', 'من انتم', 'عن الشركة', 'من نحن', 'ما هي لينير', 'ماهي لينير', 'الشركه', 'الشركة', 'lineer global', 'من تكون لينير', 'hakkında', 'şirket'], type: 'about' },
            { patterns: ['service', 'solution', 'what do you do', 'offer', 'provide', 'help with', 'الخدمات', 'خدماتكم', 'حلول', 'تقدموا', 'تقدمو', 'تقدمون', 'قدمت', 'حلول', 'ماذا تقدمون', 'ماذا تفعلون', 'hizmet', 'çözüm'], type: 'services' },
            { patterns: ['health', 'medical', 'pharmaceutical', 'medicine', 'صحة', 'صحه', 'طبي', 'sağlık', 'tıbbi'], type: 'health' },
            { patterns: ['food', 'nutrition', 'beverage', 'غذاء', 'اكل', 'gıda', 'yemek'], type: 'food' },
            { patterns: ['textile', 'clothing', 'fashion', 'apparel', 'نسيج', 'ملابس', 'tekstil', 'giyim'], type: 'textile' },
            { patterns: ['education', 'school', 'learning', 'course', 'تعليم', 'مدرسة', 'دورات', 'eğitim', 'okul'], type: 'education' },
            { patterns: ['industrial', 'manufacturing', 'logistics', 'صناعي', 'صناعة', 'لوجستيات', 'endüstriyel', 'lojistik'], type: 'industrial' },
            { patterns: ['environmental', 'بيئي', 'بيئه', 'بيئة', 'çevresel'], type: 'environmental' },
            { patterns: ['values', 'قيم', 'core values', 'قيمنا', 'الجودة', 'الابتكار', 'النزاهة', 'التنمية', 'التمكين'], type: 'values' },
            { patterns: ['team', 'فريق', 'ekip', 'leadership', 'خبراء', 'قيادتكم', 'خبرائكم'], type: 'team' },
            { patterns: ['contact', 'email', 'address', 'reach', 'phone', 'call', 'اتصل', 'تواصل', 'iletişim', 'telefon', 'adres'], type: 'contact' },
            { patterns: ['job', 'career', 'hiring', 'work', 'وظائف', 'توظيف', 'عمل', 'اشتغل', 'نشتغل', 'kariyer'], type: 'careers' },
            { patterns: ['how', 'technical', 'process', 'specification', 'تقني', 'مواصفات', 'teknik', 'süreç'], type: 'technical' },
            { patterns: ['price', 'cost', 'quote', 'budget', 'سعر', 'تكلفة', 'عرض سعر', 'fiyat', 'teklif'], type: 'pricing' },
            { patterns: ['partner', 'collaboration', 'work together', 'شراكة', 'تعاون', 'ortaklık'], type: 'partnership' },
            { patterns: ['thank', 'thanks', 'شكرا', 'تسلم', 'teşekkürler'], type: 'thanks' },
            { patterns: ['bye', 'goodbye', 'see you', 'مع السلامة', 'الله معاك', 'güle güle'], type: 'goodbye' }
        ];
        this.responses = {
            greeting: {
                en: "Welcome to Lineer Global. How can I help you?",
                ar: "وعليكم السلام، مرحبًا بك في لينير جلوبال. كيف يمكنني مساعدتك؟",
                tr: "Lineer Global'e hoş geldiniz. Size nasıl yardımcı olabilirim?"
            },
            about: {
                en: "Lineer Global is your trusted partner for integrated solutions in health, education, and industry. We connect markets with global standards from the heart of Turkey. We build bridges of trust, knowledge, and growth. Our CEO is Dr. Esaam Moqbel.",
                ar: "لينير جلوبال هي شريكك الموثوق للحلول المتكاملة في الصحة والتعليم والصناعة، نربط الأسواق بمعايير عالمية من قلب تركيا. نبني جسورًا من الثقة والمعرفة والنمو. الرئيس التنفيذي د. عصام مقبل.",
                tr: "Lineer Global, sağlık, eğitim ve endüstride entegre çözümler için güvenilir ortağınızdır. Pazarları Türkiye'den küresel standartlarla birleştiriyoruz. CEO'muz Dr. Esaam Moqbel'dir."
            },
            services: {
                en: "We provide: food and chemical export services, high-quality health and consulting solutions, modern education and training programs, and industrial and environmental projects. Which service interests you?",
                ar: "نقدم خدمات تصدير غذائي وكيميائي، حلول صحية واستشارية، برامج تعليم وتدريب حديثة، ومشاريع صناعية وبيئية. أي خدمة تهمك؟",
                tr: "Gıda ve kimyasal ihracat hizmetleri, sağlık ve danışmanlık çözümleri, modern eğitim ve endüstriyel projeler sunuyoruz. Hangi hizmet ilginizi çekiyor?"
            },
            values: {
                en: "Our core values: Quality, Innovation, Integrity, Development, and Human Empowerment.",
                ar: "قيمنا الجوهرية: الجودة، الابتكار، النزاهة، التنمية، التمكين البشري.",
                tr: "Temel değerlerimiz: Kalite, Yenilik, Dürüstlük, Gelişim ve İnsan Güçlendirme."
            },
            health: {
                en: "We design health programs, provide consulting, and deliver medical products that put people first.",
                ar: "نصمم برامج صحية ونقدم استشارات ونوفر منتجات طبية تضع الإنسان أولاً",
                tr: "Sağlık programları tasarlıyor, danışmanlık veriyor ve insanı ön planda tutan tıbbi ürünler sunuyoruz."
            },
            food: {
                en: "We export high-quality food oils and products to global markets with strong logistics.",
                ar: "نصدر زيوت الطعام عالية الجودة ومنتجات غذائية إلى الأسواق العالمية بكفاءة لوجستية",
                tr: "Yüksek kaliteli gıda yağları ve ürünlerini güçlü lojistikle dünya pazarlarına ihraç ediyoruz."
            },
            textile: {
                en: "We offer branded merchandise, technical textiles, and sustainable fashion.",
                ar: "نقدم منتجات بعلامات تجارية، منسوجات تقنية، وحلول أزياء مستدامة.",
                tr: "Markalı ürünler, teknik tekstiller ve sürdürülebilir moda çözümleri sunuyoruz."
            },
            education: {
                en: "We provide flexible education and training programs using AI, helping graduates find jobs and empowering talented youth.",
                ar: "نقدم برامج تعليم وتدريب مرنة بتقنيات الذكاء الصناعي، ونساعد الخريجين في الحصول على وظائف ونمكّن الشباب الموهوبين.",
                tr: "Yapay zeka ile esnek eğitim ve eğitim programları sunuyor, mezunların iş bulmasına yardımcı oluyor ve yetenekli gençleri güçlendiriyoruz."
            },
            industrial: {
                en: "We deliver high-quality industrial products to consumers and secure strategic raw materials.",
                ar: "نوفر منتجات صناعية عالية الجودة للمستهلكين ونؤمن المواد الخام الاستراتيجية.",
                tr: "Tüketicilere yüksek kaliteli endüstriyel ürünler sunuyor ve stratejik hammaddeleri temin ediyoruz."
            },
            environmental: {
                en: "We design renewable energy projects, promote sustainability, and reduce environmental impact.",
                ar: "نصمم مشاريع طاقة متجددة، ونعزز الاستدامة، ونقلل الأثر البيئي.",
                tr: "Yenilenebilir enerji projeleri tasarlıyor, sürdürülebilirliği teşvik ediyor ve çevresel etkiyi azaltıyoruz."
            },
            team: {
                en: "Our team is led by Dr. Esaam Moqbel. Key leaders: John Smith (Industry), Emily Clark (Health & Food), Michael Lee (Education).",
                ar: "فريقنا بقيادة د. عصام مقبل. من القادة: جون سميث (الصناعة)، إيميلي كلارك (الصحة والغذاء)، مايكل لي (التعليم).",
                tr: "Ekibimiz Dr. Esaam Moqbel liderliğinde. Liderlerimiz: John Smith (Sanayi), Emily Clark (Sağlık & Gıda), Michael Lee (Eğitim)."
            },
            ceo: {
                en: "Dr. Esaam Moqbel is a physician and consultant in community medicine, with over 25 years of experience in Saudi Arabia and Turkey. He leads Lineer Global and believes sustainable development starts with people.",
                ar: "الدكتور عصام محمد مراد طبيب واستشاري في طب المجتمع، بخبرة تزيد عن 25 عامًا في السعودية وتركيا. يقود لينير جلوبال ويؤمن أن التنمية المستدامة تبدأ من الإنسان.",
                tr: "Dr. Esaam Moqbel, toplum hekimliği alanında 25 yılı aşkın deneyime sahip bir doktordur. Türkiye ve Suudi Arabistan'da çalıştı ve Lineer Global'in lideridir."
            },
            contact: {
                en: "Our address: MANSUROĞLU MAH. ANKARA CAD. NO: 81 İÇ KAPI NO: 12 BAYRAKLI/İZMİR. Email: Esam@lineerglobal.com, Ahmed@lineerglobal.com",
                ar: "العنوان: مانسور أوغلو مح. شارع أنقرة رقم: 81، الباب الداخلي رقم: 12، بايراكلي/إزمير. البريد الإلكتروني: Esam@lineerglobal.com، Ahmed@lineerglobal.com",
                tr: "Adresimiz: MANSUROĞLU MAH. ANKARA CAD. NO: 81 İÇ KAPI NO: 12 BAYRAKLI/İZMİR. E-posta: Esam@lineerglobal.com, Ahmed@lineerglobal.com"
            },
            careers: {
                en: "For job opportunities, email careers@lineerglobal.com.",
                ar: "للفرص الوظيفية راسل careers@lineerglobal.com.",
                tr: "İş fırsatları için careers@lineerglobal.com adresine e-posta gönderin."
            },
            technical: {
                en: "We use advanced materials and international standards. For details, email Esam@lineerglobal.com.",
                ar: "نستخدم مواد متقدمة ومعايير دولية. للتفاصيل راسل Esam@lineerglobal.com.",
                tr: "Gelişmiş malzemeler ve uluslararası standartlar kullanıyoruz. Detaylar için Esam@lineerglobal.com."
            },
            pricing: {
                en: "Pricing depends on your needs. Contact Esam@lineerglobal.com for a quote.",
                ar: "الأسعار حسب احتياجك. تواصل مع Esam@lineerglobal.com لعرض سعر.",
                tr: "Fiyatlar ihtiyacınıza göre değişir. Teklif için Esam@lineerglobal.com ile iletişime geçin."
            },
            partnership: {
                en: "We welcome partnerships. Email Esam@lineerglobal.com to discuss.",
                ar: "نرحب بالشراكات. راسل Esam@lineerglobal.com للنقاش.",
                tr: "Ortaklıklara açığız. Görüşmek için Esam@lineerglobal.com adresine yazın."
            },
            thanks: {
                en: "You're welcome! Let me know if you have more questions.",
                ar: "على الرحب والسعة! إذا كان لديك سؤال آخر أنا هنا.",
                tr: "Rica ederim! Başka sorunuz varsa yardımcı olabilirim."
            },
            goodbye: {
                en: "Thank you for chatting with Lineer Global. Have a great day!",
                ar: "شكرًا لتواصلك مع لينير جلوبال. يوم سعيد!",
                tr: "Lineer Global ile sohbet ettiğiniz için teşekkürler. İyi günler!"
            },
            fallback: {
                en: "Ask me about Lineer Global, our services, values, team, Dr. Esaam, or how to contact us.",
                ar: "اسألني عن لينير جلوبال، خدماتنا، قيمنا، فريقنا، الدكتور عصام أو طرق التواصل.",
                tr: "Lineer Global, hizmetlerimiz, değerlerimiz, ekibimiz, Dr. Esaam veya iletişim hakkında bana sorabilirsiniz."
            }
        };
    }

    processMessage(message) {
        const clean = message.trim().toLowerCase();
        const lang = this.detectLanguage(clean);
        for (const pattern of this.responsePatterns) {
            for (const p of pattern.patterns) {
                if (clean.includes(p)) {
                    return this.responses[pattern.type][lang] || this.responses[pattern.type].en;
                }
            }
        }
        return this.responses.fallback[lang] || this.responses.fallback.en;
    }

    detectLanguage(message) {
        if (/[\u0600-\u06FF]/.test(message)) return 'ar';
        if (/[çğıöşüÇĞIİÖŞÜ]/.test(message)) return 'tr';
        return 'en';
    }
}

    // Initialize the smart chatbot
    const smartChatbot = new SmartChatbot();

    // DOM Elements are already declared at the top of this block

    // Chat Interface Functions
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.innerHTML = text; // Use innerHTML to support formatting
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

    // Smart AI Response Function
    function getAiResponse(userMessage) {
        const typingIndicator = addTypingIndicator();

        // Simulate realistic processing time
        const delay = Math.min(800, userMessage.length * 15 + Math.random() * 300 + 200);

        setTimeout(() => {
            try {
                const response = smartChatbot.processMessage(userMessage);
                removeTypingIndicator();
                addMessage(response, 'ai');
            } catch (error) {
                console.error('AI Error:', error);
                removeTypingIndicator();
                addMessage("I apologize for the technical issue. Please contact us directly at Esam@lineerglobal.com for immediate assistance.", 'ai');
            }
        }, delay);
    }

    // Event Listeners for Chat Interface
    if (chatbotButton) {
        chatbotButton.addEventListener('click', () => {
            chatbotModal.classList.toggle('active');
            if (chatbotModal.classList.contains('active')) {
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                chatbotInput.focus();
            }
        });
    }

    // Close chat when clicking outside
    document.addEventListener('click', (event) => {
        if (chatbotModal && !chatbotModal.contains(event.target) && !chatbotButton.contains(event.target) && chatbotModal.classList.contains('active')) {
            chatbotModal.classList.remove('active');
        }
    });

    // Close button
    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener('click', () => {
            chatbotModal.classList.remove('active');
        });
    }

    // Send message button
    if (sendChatbotMessageBtn) {
        sendChatbotMessageBtn.addEventListener('click', () => {
            const userMessage = chatbotInput.value.trim();
            if (userMessage) {
                addMessage(userMessage, 'user');
                chatbotInput.value = '';
                getAiResponse(userMessage);
            }
        });
    }

    // Enter key to send message
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendChatbotMessageBtn.click();
            }
        });
    }

    // Performance monitoring
    console.log('🚀 Smart AI Chatbot System loaded and ready!');

});
