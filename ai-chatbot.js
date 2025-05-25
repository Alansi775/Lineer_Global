// ai-chatbot.js
const AI_CONFIG = {
    averageWPM: 50,
    minDelay: 800,
    logging: true,
    cacheSize: 100
};


const languageResponses = {
    en: {
        greeting: "Hello! I'm Lineer Global AI Assistant. How can I help you today?",
        services: `Lineer Global provides integrated solutions in:
        - Health Solutions (Pharmaceutical packaging, medical equipment)
        - Food Industry (Custom labeling, packaging solutions)
        - Textile & Apparel (Branded merchandise, technical textiles)
        - Education Services (Course materials, educational packaging)
        - Industrial Solutions (Custom packaging, logistics support)
        Visit our Features section for detailed information.`,
        about: `Lineer Global bridges health, education, and industry sectors through:
        - Cross-sector integration solutions
        - Emerging market specialization
        - Global standard implementations
        - CEO: Dr. Esaam Moqbel (20+ years industry experience)`,
        contact: `Reach us through:
        📧 info@lineerglobal.com 
        📍 123 Innovation Valley, Istanbul, Turkey
        📱 +90 212 555 01 01
        Social: [YouTube] [LinkedIn] [Twitter] [Instagram]`,
        team: `Our expert team includes:
        - Dr. Esaam Moqbel (CEO) - Health & Education Solutions
        - John Smith (CTO) - Technical Implementations
        - Ayşe Demir (COO) - Operations Management
        Meet us in the 'Our Team' section.`,
        values: `Core Values Driving Our Solutions:
        1. Quality Assurance (ISO Certified Processes)
        2. Innovative Approaches (R&D Focused)
        3. Ethical Operations (Transparent Practices)
        4. Sustainable Development (Eco-friendly Solutions)
        5. Human Capital Development (Training Programs)`,
        shipping: "We handle global logistics with partners in 30+ countries. Standard shipping 3-5 business days, express options available.",
        partnerships: "We welcome strategic partnerships. Contact our Business Development team at partnerships@lineerglobal.com",
        careers: "Join our team! Send CV to careers@lineerglobal.com. Current openings: Logistics Specialist, Sales Manager, QA Engineer.",
        fallback: "I can help with: Service info, team details, partnership opportunities, career options, shipping queries. Please ask!"
    },
    ar: {
        greeting: "مرحبًا! أنا المساعد الذكي لشركة لاينير جلوبال. كيف يمكنني مساعدتك؟",
        services: `تقدم لاينير جلوبال حلولاً متكاملة في:
        - القطاع الصحي (تغليف الأدوية، المعدات الطبية)
        - الصناعات الغذائية (الملصقات المخصصة، حلول التعبئة)
        - المنسوجات والملابس (المنتجات المميزة، الأقمشة التقنية)
        - الخدمات التعليمية (المواد التعليمية، التغليف التعليمي)
        - الحلول الصناعية (التعبئة المخصصة، الدعم اللوجستي)
        قم بزيارة قسم الميزات لمعلومات مفصلة.`,
        about: `تعمل لاينير جلوبال على ربط القطاعات الصحية والتعليمية والصناعية من خلال:
        - حلول التكامل بين القطاعات
        - التخصص في الأسواق الناشئة
        - تطبيقات المعايير العالمية
        - الرئيس التنفيذي: د. عصام مقبل (20+ سنة خبرة)`,
        contact: `تواصل معنا عبر:
        📧 info@lineerglobal.com 
        📍 وادي الابتكار 123، إسطنبول، تركيا
        📱 212 555 01 01 90+
        وسائل التواصل: [يوتيوب] [لينكدإن] [تويتر] [إنستجرام]`,
        team: `فريقنا يتضمن:
        - د. عصام مقبل (الرئيس التنفيذي) - حلول الصحة والتعليم
        - جون سميث (الرئيس التقني) - التنفيذ التقني
        - عائشة دمير (مدير العمليات) - إدارة العمليات
        تعرف علينا في قسم "فريقنا".`,
        values: `القيم الأساسية الدافعة لعملنا:
        1. ضمان الجودة (عمليات معتمدة بأيزو)
        2. أساليب مبتكرة (مركزة على البحث والتطوير)
        3. عمليات أخلاقية (ممارسات شفافة)
        4. تنمية مستدامة (حلول صديقة للبيئة)
        5. تطوير رأس المال البشري (برامج تدريبية)`,
        shipping: "نحن نتعامل مع الشحن العالمي مع شركاء في أكثر من 30 دولة. الشحن العادي 3-5 أيام عمل، مع خيارات سريعة متاحة.",
        partnerships: "نرحب بالشراكات الإستراتيجية. تواصل مع فريق تطوير الأعمال partnerships@lineerglobal.com",
        careers: "انضم لفريقنا! أرسل السيرة الذاتية careers@lineerglobal.com. الوظائف المتاحة: أخصائي لوجستي، مدير مبيعات، مهندس ضمان جودة.",
        fallback: "يمكنني المساعدة في: معلومات الخدمات، تفاصيل الفريق، فرص الشراكة، الوظائف، استفسارات الشحن. الرجاء طرح سؤال!"
    },
    tr: {
        greeting: "Merhaba! Lineer Global Yapay Zeka Asistanı'yım. Nasıl yardımcı olabilirim?",
        services: `Lineer Global olarak sunduğumuz entegre çözümler:
        - Sağlık Çözümleri (İlaç ambalajlama, tıbbi ekipman)
        - Gıda Endüstrisi (Özel etiketleme, ambalaj çözümleri)
        - Tekstil ve Giyim (Markalı ürünler, teknik kumaşlar)
        - Eğitim Hizmetleri (Ders materyalleri, eğitim ambalajı)
        - Endüstriyel Çözümler (Özel ambalajlama, lojistik destek)
        Detaylı bilgi için Özellikler bölümümüzü ziyaret edin.`,
        about: `Lineer Global sağlık, eğitim ve endüstri sektörlerini birleştirerek:
        - Sektörler arası entegrasyon çözümleri
        - Gelişmekte olan pazarlarda uzmanlık
        - Küresel standart uygulamaları
        - CEO: Dr. Esaam Moqbel (20+ yıl endüstri deneyimi)`,
        contact: `İletişim bilgilerimiz:
        📧 info@lineerglobal.com 
        📍 123 İnovasyon Vadisi, İstanbul, Türkiye
        📱 0212 555 01 01
        Sosyal Medya: [YouTube] [LinkedIn] [Twitter] [Instagram]`,
        team: `Uzman ekibimiz:
        - Dr. Esaam Moqbel (CEO) - Sağlık & Eğitim Çözümleri
        - John Smith (CTO) - Teknik Uygulamalar
        - Ayşe Demir (COO) - Operasyon Yönetimi
        Ekibimizi 'Ekibimiz' bölümünde tanıyın.`,
        values: `Temel Değerlerimiz:
        1. Kalite Güvencesi (ISO Sertifikalı Süreçler)
        2. Yenilikçi Yaklaşımlar (Ar-Ge Odaklı)
        3. Etik Operasyonlar (Şeffaf Uygulamalar)
        4. Sürdürülebilir Gelişim (Çevre Dostu Çözümler)
        5. İnsan Kaynağı Gelişimi (Eğitim Programları)`,
        shipping: "30+ ülkede lojistik partnerlerle çalışıyoruz. Standart teslimat 3-5 iş günü, ekspres seçenekler mevcuttur.",
        partnerships: "Stratejik ortaklıklara açığız. İş Geliştirme ekibimiz partnerships@lineerglobal.com",
        careers: "Ekibimize katılın! CV gönderin: careers@lineerglobal.com. Açık pozisyonlar: Lojistik Uzmanı, Satış Müdürü, Kalite Mühendisi.",
        fallback: "Şunlarla ilgili yardımcı olabilirim: Hizmet bilgileri, ekip detayları, ortaklık fırsatları, kariyer seçenekleri, nakliye soruları. Lütfen sorun!"
    }
};

const responsePatterns = [
    {
        pattern: /^(hi|hello|merhaba|مرحبا|سلام|selam)/i,
        key: 'greeting'
    },
    {
        pattern: /(service|solution|product|hizmet|çözüm|ürün|خدمة|حل|منتج)/i,
        key: 'services'
    },
    {
        pattern: /(about|company|who are you|hakkında|şirket|من نحن|شركة)/i,
        key: 'about'
    },
    {
        pattern: /(contact|reach|address|email|phone|iletişim|اتصل|بريد|هاتف)/i,
        key: 'contact'
    },
    {
        pattern: /(team|member|staff|employee|ekip|عضو|فريق|موظف)/i,
        key: 'team'
    },
    {
        pattern: /(value|principle|ethic|quality|değer|ilke|etik|kalite|قيمة|مبدأ|جودة)/i,
        key: 'values'
    },
    {
        pattern: /(ship|deliver|logistic|transport|nakliye|teslimat|lojistik|شحن|توصيل|لوجستي)/i,
        key: 'shipping'
    },
    {
        pattern: /(partner|collaborate|affiliate|ortak|iş birliği|شريك|تعاون)/i,
        key: 'partnerships'
    },
    {
        pattern: /(career|job|position|hire|kariyer|iş|pozisyon|işe alım|وظيفة|مهنة)/i,
        key: 'careers'
    }
];

const responseCache = new Map();


export class ChatbotAI {
    constructor() {
        this.conversationHistory = [];
    }

    async getResponse(userMessage, currentLang) {
        const cacheKey = `${currentLang}:${userMessage.toLowerCase().trim()}`;
        
        try {
            // Check cache first
            if (responseCache.has(cacheKey)) {
                return this.formatCachedResponse(cacheKey);
            }

            const startTime = performance.now();
            const response = this.generateResponse(userMessage, currentLang);
            
            // Update cache
            responseCache.set(cacheKey, response);
            if (responseCache.size > AI_CONFIG.cacheSize) {
                responseCache.delete(responseCache.keys().next().value);
            }

            if (AI_CONFIG.logging) {
                this.logInteraction(userMessage, response, currentLang, startTime);
            }

            return {
                text: response,
                typingDelay: this.calculateTypingDelay(response)
            };
        } catch (error) {
            console.error('AI Error:', error);
            return this.getFallbackResponse(currentLang);
        }
    }

    formatCachedResponse(cacheKey) {
        return {
            text: responseCache.get(cacheKey),
            typingDelay: 300 // Faster response for cached items
        };
    }

    generateResponse(message, lang) {
        const cleanMessage = message.toLowerCase().trim();
        const matchedPattern = responsePatterns.find(({ pattern }) => pattern.test(cleanMessage));
        const responseKey = matchedPattern?.key || 'fallback';
        
        let response = languageResponses[lang][responseKey];
        if (responseKey !== 'fallback') {
            response += `\n\n${languageResponses[lang].fallback}`;
        }

        this.updateConversationHistory(message, response);
        return response;
    }

    calculateTypingDelay(text) {
        const words = text.split(/\s+/).length;
        return Math.max(AI_CONFIG.minDelay, (words / AI_CONFIG.averageWPM) * 60000);
    }

    getFallbackResponse(lang) {
        return {
            text: languageResponses[lang].fallback,
            typingDelay: AI_CONFIG.minDelay
        };
    }

    logInteraction(query, response, lang, startTime) {
        const duration = performance.now() - startTime;
        console.log(`[AI Log] ${new Date().toISOString()} | ${lang} | ${duration.toFixed(2)}ms\nQuery: "${query}"`);
    }

    updateConversationHistory(query, response) {
        this.conversationHistory.push({
            timestamp: new Date().toISOString(),
            query,
            response
        });
        
        if (this.conversationHistory.length > 20) {
            this.conversationHistory.shift();
        }
    }
}