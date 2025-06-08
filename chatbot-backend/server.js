// File: server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Enhanced Company Knowledge Base (Multilingual)
const companyKnowledge = {
    "about": {
        "en": `Lineer Global is your trusted partner for integrated solutions in health, education, and industry, bridging markets with global standards from the heart of Turkey. We were launched to be your gateway to a world of quality opportunities and specialized services in export, health, education, and industry. We don't just offer products; we build bridges of trust, knowledge, and shared growth. We work passionately to be true partners in development. We adhere to the highest standards of quality, the finest details, and the best experiences in everything we offer.`,
        "ar": `لينير جلوبال هي شريكك الموثوق للحلول المتكاملة في مجالات الصحة والتعليم والصناعة، حيث تربط الأسواق بالمعايير العالمية من قلب تركيا. لقد تم إطلاقنا لنكون بوابتك إلى عالم من الفرص عالية الجودة والخدمات المتخصصة في التصدير، الصحة، التعليم، والصناعة. نحن لا نقدم المنتجات فحسب؛ بل نبني جسوراً من الثقة والمعرفة والنمو المشترك. نعمل بشغف لنكون شركاء حقيقيين في التنمية. ونلتزم بأعلى معايير الجودة، وأدق التفاصيل، وأفضل الخبرات في كل ما نقدمه.`,
        "tr": `Lineer Global, sağlık, eğitim ve sanayi alanında entegre çözümler için güvenilir ortağınızdır; Türkiye'nin kalbinden küresel standartlarla pazarlar arasında köprü kurar. Yüksek kaliteli fırsatlar ve ihracat, sağlık, eğitim ve sanayi alanlarında uzmanlaşmış hizmetler dünyasına açılan kapınız olmak için yola çıktık. Biz sadece ürün sunmuyoruz; güven, bilgi ve ortak büyüme köprüleri kuruyoruz. Kalkınmada gerçek ortaklar olmak için tutkuyla çalışıyoruz. Sunduğumuz her şeyde en yüksek kalite standartlarına, en ince detaylara ve en iyi deneyimlere bağlıyız.`
    },
    
    "products_services": {
        "en": `Lineer Global offers:
        1. Efficient logistical services for food and chemical exports (e.g., high-quality cooking oil, chemicals, sugar, clothing).
        2. Health and consulting solutions that enhance quality of life (designing programs for quality control in healthcare services).
        3. Education and training programs that keep pace with global changes (empowering individuals for in-demand specializations using AI technologies, helping graduates find jobs, empowering talented youth and inventors).
        4. Developmental and investment projects, including industrial solutions (delivering high-quality industrial products and securing strategic raw materials, notably the Lineer Kostik caustic soda factory in Aliaga – Izmir) and environmental solutions (designing and developing renewable energy projects, promoting sustainability, and reducing environmental impact across industries).
        We also offer branded merchandise, technical textiles, and sustainable fashion.`,
        "ar": `تقدم لينير جلوبال:
        1. خدمات لوجستية فعالة لصادرات الأغذية والمواد الكيميائية (مثل زيت الطهي عالي الجودة، والمواد الكيميائية، والسكر، والملابس).
        2. حلول صحية واستشارية تعزز جودة الحياة (تصميم برامج لمراقبة الجودة في خدمات الرعاية الصحية).
        3. برامج تعليم وتدريب تواكب التغيرات العالمية (تمكين الأفراد للتخصصات المطلوبة باستخدام تقنيات الذكاء الاصطناعي، ومساعدة الخريجين في العثور على وظائف، وتمكين الشباب الموهوبين والمخترعين).
        4. مشاريع تنموية واستثمارية، بما في ذلك الحلول الصناعية (توفير منتجات صناعية عالية الجودة وتأمين المواد الخام الاستراتيجية، وأبرزها مصنع لينير كوستيك للصودا الكاوية في ألياجا – إزمير) والحلول البيئية (تصميم وتطوير مشاريع الطاقة المتجددة، وتعزيز الاستدامة، وتقليل التأثير البيئي عبر الصناعات).
        كما نقدم سلعاً تحمل علامات تجارية، ومنسوجات تقنية، وأزياء مستدامة.`,
        "tr": `Lineer Global şunları sunar:
        1. Gıda ve kimyasal ihracatı için verimli lojistik hizmetler (örn. yüksek kaliteli yemeklik yağ, kimyasallar, şeker, giyim).
        2. Yaşam kalitesini artıran sağlık ve danışmanlık çözümleri (sağlık hizmetlerinde kalite kontrol programları tasarlama).
        3. Küresel değişimlere ayak uyduran eğitim ve öğretim programları (yapay zeka teknolojilerini kullanarak bireyleri talep gören uzmanlık alanlarında güçlendirme, mezunların iş bulmasına yardımcı olma, yetenekli gençleri ve mucitleri güçlendirme).
        4. Endüstriyel çözümler (yüksek kaliteli endüstriyel ürünler sunma ve stratejik hammadde sağlama, özellikle Aliağa – İzmir'deki Lineer Kostik kostik soda fabrikası) ve çevresel çözümler (yenilenebilir enerji projeleri tasarlama ve geliştirme, sürdürülebilirliği teşvik etme ve endüstrilerde çevresel etkiyi azaltma) dahil olmak üzere kalkınma ve yatırım projeleri.
        Ayrıca markalı ürünler, teknik tekstiller ve sürdürülebilir moda da sunuyoruz.`
    },
    
    "team": {
        "en": `Our team at Lineer Global is proudly multinational and diverse. We recruit professionals from various backgrounds and nationalities to ensure a rich blend of perspectives and expertise, which is crucial for a global company like ours. Our leadership includes:
        - Dr. Essam Moqbel (CEO & Founder): A physician and consultant in community medicine, with over 25 years of experience in health management and various development projects in Saudi Arabia and Turkey.
        - John Smith (Head of Industrial Solutions)
        - Emily Clark (Head of Health & Food Solutions)  
        - Michael Lee (Lead Educational Programs)`,
        "ar": `فريقنا في لينير جلوبال متعدد الجنسيات ومتنوع بفخر. نحن نوظف محترفين من خلفيات وجنسيات مختلفة لضمان مزيج غني من وجهات النظر والخبرات، وهو أمر بالغ الأهمية لشركة عالمية مثل شركتنا. يشمل قادتنا:
        - الدكتور عصام مقبل (الرئيس التنفيذي والمؤسس): طبيب واستشاري في طب المجتمع، ولديه أكثر من 25 عاماً من الخبرة في إدارة الصحة ومشاريع تنموية مختلفة في المملكة العربية السعودية وتركيا.
        - جون سميث (رئيس الحلول الصناعية)
        - إيميلي كلارك (رئيسة حلول الصحة والغذاء)
        - مايكل لي (رئيس برامج التعليم)`,
        "tr": `Lineer Global'deki ekibimiz gururla çok uluslu ve çeşitlidir. Küresel bir şirket olarak bizim için çok önemli olan zengin bir bakış açısı ve uzmanlık karışımı sağlamak için çeşitli geçmişlere ve milliyetlere sahip profesyonelleri işe alıyoruz. Liderliğimiz şunları içerir:
        - Dr. Essam Moqbel (CEO & Kurucu): Suudi Arabistan ve Türkiye'de sağlık yönetimi ve çeşitli kalkınma projelerinde 25 yılı aşkın deneyime sahip bir hekim ve toplum hekimliği danışmanı.
        - John Smith (Endüstriyel Çözümler Direktörü)
        - Emily Clark (Sağlık ve Gıda Çözümleri Direktörü)
        - Michael Lee (Eğitim Programları Lideri)`
    },
    
    "leadership": {
        "en": `Dr. Essam Moqbel (CEO & Founder) is a physician and consultant in community medicine, with over 25 years of experience in health management and various development projects in Saudi Arabia and Turkey. He began his academic career at King Saud University in Riyadh and later held senior supervisory positions in the Saudi Ministry of Health. After retiring, he founded and manages Lineer Global. He also represents investors and funders in industrial projects like the Lineer Kostik caustic soda factory in Aliaga – Izmir. Dr. Essam believes that sustainable development starts with people and that export is a message of quality and trust.
        Other key team members include John Smith (Head of Industrial Solutions), Emily Clark (Head of Health & Food Solutions), and Michael Lee (Lead Educational Programs).`,
        "ar": `الدكتور عصام مقبل (الرئيس التنفيذي والمؤسس) طبيب واستشاري في طب المجتمع، ولديه أكثر من 25 عاماً من الخبرة في إدارة الصحة ومشاريع تنموية مختلفة في المملكة العربية السعودية وتركيا. بدأ حياته الأكاديمية في جامعة الملك سعود بالرياض، ثم شغل مناصب إشرافية عليا في وزارة الصحة السعودية. بعد تقاعده، أسس ويدير لينير جلوبال. كما يمثل المستثمرين والممولين في مشاريع صناعية مثل مصنع لينير كوستيك للصودا الكاوية في ألياجا – إزمير. يؤمن الدكتور عصام بأن التنمية المستدامة تبدأ بالناس وأن التصدير رسالة جودة وثقة.
        ويشمل أعضاء الفريق الرئيسيين الآخرين جون سميث (رئيس الحلول الصناعية)، وإيميلي كلارك (رئيسة حلول الصحة والغذاء)، ومايكل لي (رئيس برامج التعليم).`,
        "tr": `Dr. Essam Moqbel (CEO ve Kurucu), toplum hekimliği uzmanı ve danışmanı olup, Suudi Arabistan ve Türkiye'de sağlık yönetimi ve çeşitli kalkınma projelerinde 25 yılı aşkın deneyime sahiptir. Akademik kariyerine Riyad'daki King Saud Üniversitesi'nde başlamış, daha sonra Suudi Arabistan Sağlık Bakanlığı'nda üst düzey denetleyici pozisyonlarda bulunmuştur. Emekli olduktan sonra Lineer Global'i kurmuş ve yönetmektedir. Ayrıca Aliağa – İzmir'deki Lineer Kostik kostik soda fabrikası gibi endüstriyel projelerde yatırımcıları ve fon sağlayıcıları temsil etmektedir. Dr. Essam, sürdürülebilir kalkınmanın insanlarla başladığına ve ihracatın kalite ve güven mesajı olduğuna inanmaktadır.`
    },
    
    "vision_mission_values": {
        "en": `Our Vision: To be a trusted bridge for the integration of health, education, and industry in emerging markets.
        Our Mission: To provide health, educational, and industrial solutions with global standards from the heart of Turkey to the world.
        Our Values: Quality, Innovation, Integrity, Development, and Human Empowerment are the pillars of our work.`,
        "ar": `رؤيتنا: أن نكون جسراً موثوقاً لتكامل الصحة والتعليم والصناعة في الأسواق الناشئة.
        رسالتنا: توفير حلول صحية وتعليمية وصناعية بمعايير عالمية من قلب تركيا إلى العالم.
        قيمنا: الجودة، الابتكار، النزاهة، التنمية، وتمكين الإنسان هي ركائز عملنا.`,
        "tr": `Vizyonumuz: Gelişmekte olan pazarlarda sağlık, eğitim ve sanayinin entegrasyonu için güvenilir bir köprü olmak.
        Misyonumuz: Türkiye'nin kalbinden dünyaya küresel standartlarda sağlık, eğitim ve endüstriyel çözümler sunmak.
        Değerlerimiz: Kalite, İnovasyon, Dürüstlük, Gelişim ve İnsan Güçlendirme çalışmalarımızın temel direkleridir.`
    },
    
    "contact": {
        "en": `Our Address: MANSUROĞLU MAH. ANKARA CAD. NO: 81 İÇ KAPI NO: 12 BAYRAKLI/ İZMİR. Email Us: Esam@lineerglobal.com, Ahmed@lineerglobal.com. Call Us: +90 555 158 05 28.`,
        "ar": `عنواننا: مانسوروغلو مح. شارع أنقرة. رقم: 81 رقم الباب الداخلي: 12 بايراكلي/ إزمير. راسلونا عبر البريد الإلكتروني: Esam@lineerglobal.com, Ahmed@lineerglobal.com. اتصلوا بنا: +90 555 158 05 28.`,
        "tr": `Adresimiz: MANSUROĞLU MAH. ANKARA CAD. NO: 81 İÇ KAPI NO: 12 BAYRAKLI/ İZMİR. E-posta: Esam@lineerglobal.com, Ahmed@lineerglobal.com. Bizi arayın: +90 555 158 05 28.`
    },
    
    "company_age": {
        "en": `Lineer Global was launched in 2025.`,
        "ar": `تم إطلاق لينير جلوبال في عام 2025.`,
        "tr": `Lineer Global 2025 yılında faaliyete geçmiştir.`
    },
    
    "global_partnerships": {
        "en": `Yes, Lineer Global maintains strategic partnerships with several reputable international companies and organizations. These collaborations enhance our global reach, broaden our expertise, and enable us to deliver more comprehensive solutions to our clients worldwide.`,
        "ar": `نعم، تحافظ لينير جلوبال على شراكات استراتيجية مع العديد من الشركات والمنظمات الدولية ذات السمعة الطيبة. هذه التعاونات تعزز وصولنا العالمي، وتوسع خبراتنا، وتمكننا من تقديم حلول أكثر شمولاً لعملائنا في جميع أنحاء العالم.`,
        "tr": `Evet, Lineer Global, birçok saygın uluslararası şirket ve kuruluşla stratejik ortaklıklar sürdürmektedir. Bu işbirlikleri, küresel erişimimizi artırır, uzmanlığımızı genişletir ve dünya çapındaki müşterilerimize daha kapsamlı çözümler sunmamızı sağlar.`
    },
    
    "funding": {
        "en": `Lineer Global is a self-funded entity, operating with strong internal financial management. We also engage with strategic investment partners for specific projects that align with our long-term vision.`,
        "ar": `لينير جلوبال كيان ممول ذاتياً، يعمل بإدارة مالية داخلية قوية. كما نتعاون مع شركاء استثمار استراتيجيين لمشاريع محددة تتوافق مع رؤيتنا طويلة الأمد.`,
        "tr": `Lineer Global, güçlü iç finansal yönetimle faaliyet gösteren, öz kaynaklarıyla finanse edilen bir kuruluştur. Ayrıca, uzun vadeli vizyonumuzla uyumlu belirli projeler için stratejik yatırım ortaklarıyla da çalışmaktayız.`
    },
    
    "branches": {
        "en": `Lineer Global's main operational hub is located in Izmir, Turkey, which serves as our central point for connecting markets globally. Currently, our operations are managed centrally from Turkey, allowing us to maintain high standards and efficient logistics.`,
        "ar": `يقع مركز العمليات الرئيسي لـ لينير جلوبال في إزمير، تركيا، والذي يعد نقطتنا المركزية لربط الأسواق عالمياً. حالياً، تدار عملياتنا مركزياً من تركيا، مما يتيح لنا الحفاظ على معايير عالية وكفاءة في اللوجستيات.`,
        "tr": `Lineer Global'in ana operasyon merkezi İzmir, Türkiye'de bulunmaktadır ve bu merkezimiz, küresel pazarları birbirine bağlayan kilit noktamız olarak hizmet vermektedir.`
    },
    
    "projects": {
        "en": `While we prioritize client confidentiality, some key areas of recent impact include our work in developing sustainable agricultural export chains, implementing advanced AI-driven educational platforms, and facilitating critical medical supply logistics during challenging times. Notable projects include the Lineer Kostik caustic soda factory in Aliaga – Izmir.`,
        "ar": `بينما نولي الأولوية لسرية العميل، تشمل بعض المجالات الرئيسية للتأثير الأخير عملنا في تطوير سلاسل تصدير زراعية مستدامة، وتطبيق منصات تعليمية متقدمة مدعومة بالذكاء الاصطناعي، وتسهيل لوجستيات الإمدادات الطبية الحيوية خلال الأوقات الصعبة. تشمل المشاريع البارزة مصنع لينير كوستيك للصودا الكاوية في ألياجا – إزمير.`,
        "tr": `Müşteri gizliliğine öncelik verirken, son dönemdeki etki alanlarımız arasında sürdürülebilir tarım ihracat zincirleri geliştirme, gelişmiş yapay zeka destekli eğitim platformları uygulama ve zorlu zamanlarda kritik tıbbi malzeme lojistiğini kolaylaştırma çalışmalarımız yer almaktadır. Dikkate değer projeler arasında Aliağa – İzmir'deki Lineer Kostik kostik soda fabrikası bulunmaktadır.`
    },
    "greeting_responses": {
        "en": [
            "Hello! How can I assist you with Lineer Global today?",
            "Hi there! What would you like to know about Lineer Global?",
            "Greetings! I'm here to help you with any questions about Lineer Global."
        ],
        "ar": [
            "مرحباً بك! كيف يمكنني مساعدتك بخصوص شركة لينير العالمية اليوم؟",
            "أهلاً بك! ما الذي تود معرفته عن لينير جلوبال؟",
            "تحية طيبة! أنا هنا لمساعدتك في أي استفسارات حول لينير جلوبال.",
            "وعليكم السلام! كيف أستطيع أن أخدمك اليوم؟",
            "أهلاً بك! أنا مساعدك الافتراضي من لينير جلوبال. كيف يمكنني مساعدتك؟",
            "وعليكم السلام ورحمة الله وبركاته! أنا جاهز للمساعدة. ما استفسارك؟",
            "أهلاً وسهلاً بك! هل لديك أي سؤال عن خدماتنا أو مشاريعنا؟"
        ],
        "tr": [
            "Merhaba! Lineer Global hakkında bugün size nasıl yardımcı olabilirim?",
            "Selam! Lineer Global hakkında ne öğrenmek istersiniz?",
            "Günaydın/İyi günler! Lineer Global ile ilgili herhangi bir sorunuzda size yardımcı olmak için buradayım.",
            "Aleykümselam! Bugün size nasıl yardımcı olabilirim?",
            "Merhaba! Lineer Global'den sanal yardımcınızım. Size nasıl yardımcı olabilirim?",
            "Aleykümselam ve rahmetullahi ve berekatüh! Yardıma hazırım. Sorunuz nedir?"
        ]
    },
    "well_being_responses": {
        "en": [
            "I'm an AI, so I don't have feelings, but I'm ready to assist you!",
            "As an AI, I don't have a 'how are you,' but I'm functioning perfectly and ready to help!",
            "I'm here and ready to provide information about Lineer Global!",
            "As an AI, I don't experience rest, but I am fully operational and ready to assist you. How can I help?"
        ],
        "ar": [
            "أنا ذكاء اصطناعي، لذا لا أشعر، ولكني جاهز لمساعدتك!",
            "بصفتي ذكاءً اصطناعياً، ليس لدي 'كيف حالك'، ولكني أعمل بشكل ممتاز وجاهز للمساعدة!",
            "أنا هنا وجاهز لتقديم المعلومات حول لينير جلوبال!",
            "أنا بخير، شكراً لسؤالك! كيف يمكنني خدمتك؟",
            "بخير والحمد لله! ما استفسارك اليوم؟",
            "بصفتي ذكاءً اصطناعياً، لا أحتاج للراحة، ولكني هنا وجاهز لمساعدتك. كيف يمكنني خدمتك؟" 
        ],
        "tr": [
            "Ben bir yapay zekayım, bu yüzden hislerim yok ama size yardımcı olmaya hazırım!",
            "Bir yapay zeka olarak 'nasılsın' diye bir durumum yok, ancak mükemmel çalışıyorum ve yardıma hazırım!",
            "Buradayım ve Lineer Global hakkında bilgi vermeye hazırım!",
            "İyiyim, sorduğunuz için teşekkürler! Size nasıl yardımcı olabilirim?",
            "İyiyim, hamdolsun! Bugünkü sorunuz nedir?",
            "Bir yapay zeka olarak dinlenmeye ihtiyacım yok, ancak tamamen çalışır durumdayım ve size yardım etmeye hazırım. Nasıl yardımcı olabilirim?" 
        ]
    },
    "thank_you_responses": {
        "en": [
            "You're welcome! How else can I assist you today?",
            "My pleasure! Is there anything else you'd like to know?",
            "Glad I could help! Feel free to ask if you have more questions."
        ],
        "ar": [
            "العفو! كيف يمكنني مساعدتك أيضًا اليوم؟",
            "بكل سرور! هل هناك أي شيء آخر تود معرفته؟",
            "يسعدني أن أكون قد ساعدت! لا تتردد في السؤال إذا كان لديك المزيد من الاستفسارات."
        ],
        "tr": [
            "Rica ederim! Başka nasıl yardımcı olabilirim?",
            "Memnuniyetle! Başka merak ettiğiniz bir şey var mı?",
            "Yardımcı olabildiğime sevindim! Başka sorularınız varsa çekinmeyin."
        ]
    },
    "developer_info": {
        "en": [
            `I am your virtual assistant, and I was developed by the ambitious Yemeni developer, **Mohammed Alansi**. He is a dedicated software development student at **Istanbul Aydin University**, with a primary goal of specializing in **Artificial Intelligence**. Mohammed has a great passion for technology, and he has already developed a **drone project** and has a **prototype for a smart home system**. Currently, Mohammed is part of the development team at **Lineer Global** company, where he focuses on **developing the company's website**. He is a driven and creative individual always striving for innovation!`
        ],
        "ar": [
            `أنا مساعدك الافتراضي، وقد تم تطويري بواسطة المطور اليمني الطموح **محمد العنسي**. هو طالب مجتهد ومطور برمجيات في **جامعة اسطنبول أيدن**، وهدفه الأساسي هو التخصص في مجال **الذكاء الاصطناعي**. لديه شغف كبير بالتكنولوجيا، وقد قام بالفعل بتطوير **مشروع طائرة درون**، ولديه **نموذج أولي لمشروع البيت الذكي**. حالياً، يعمل محمد ضمن فريق تطوير شركة **لينير جلوبال**، حيث يركز على **تطوير الموقع الإلكتروني الخاص بالشركة**. إنه شخص طموح ومبدع يسعى دائمًا للابتكار!`
        ],
        "tr": [
            `Benim sanal asistanınızım ve ben azimli Yemenli geliştirici **Mohammed Alansi** tarafından geliştirildim. Kendisi **İstanbul Aydın Üniversitesi**'nde yazılım geliştirme öğrencisi olup, temel hedefi **Yapay Zeka** alanında uzmanlaşmaktır. Mohammed'in teknolojiye büyük bir tutkusu var; halihazırda **bir drone projesi** geliştirdi ve **akıllı ev sistemi için bir prototipi** bulunuyor. Şu anda Mohammed, **Lineer Global** şirketinin geliştirme ekibinde yer almakta ve şirketin **web sitesini geliştirmeye** odaklanmaktadır. O, her zaman yenilik peşinde koşan, azimli ve yaratıcı bir bireydir!`
        ] 
    }
};

// Language detection function
function detectLanguage(text) {
    const arabicRegex = /[\u0600-\u06FF]/;
    const turkishRegex = /[çğıöşüÇĞIİÖŞÜ]/;
    
    if (arabicRegex.test(text)) return 'ar';
    if (turkishRegex.test(text)) return 'tr';
    return 'en';
}

// Keyword mapping for content retrieval
const keywordMap = {
    "about|who are you|what is|company|lineer global|lineer|linear|linier|hakkında|şirket|nedir|من أنتم|عن الشركة|ما هي|شركة": "about",
    "products|services|offer|provide|do you do|what do you do|what do you sell|what do you offer|ürün|hizmet|satış|ne yapıyorsunuz|منتجات|خدمات|ماذا تقدمون|ما تبيعون": "products_services",
    "team|employees|staff|who works|personnel|ekip|çalışanlar|kadro|فريق|موظفين|من يعمل": "team",
    "leader|ceo|founder|dr essam|essam moqbel|john smith|emily clark|michael lee|yönetim|liderlik|kurucu|مؤسس|رئيس|قائد": "leadership",
    "vision|mission|values|commitment|quality|innovation|integrity|development|kalite|değerler|vizyon|misyon|رؤية|رسالة|قيم|جودة": "vision_mission_values",
    "contact|email|address|phone|reach us|get in touch|iletişim|adres|telefon|تواصل|عنوان|هاتف|ايميل": "contact",
    "age|established|founded|year|how old|when|tarih|kuruldu|yaş|متى تأسست|عمر الشركة": "company_age",
    "partnership|partners|global|international|işbirliği|ortaklık|شراكة|شركاء|دولي": "global_partnerships",
    "fund|funding|investor|who funds|finansman|yatırımcı|تمويل|مستثمر|من يمول": "funding",
    "branches|office|location|where|şube|nerede|ofis|فروع|مكاتب|أين|موقع": "branches",
    "projects|work|achievements|proje|çalışmalar|başarılar|مشاريع|أعمال|إنجازات": "projects",
    "developer|who developed you|who created you|who made you|who designed you|who trained you|your developer|about your developer|مطور|من قام بتطويرك|من طورك|من انشاك|من سواك|من دربك|من صممك|مطورك|من صنعك|عن المطور|seni kim geliştirdi|seni kim yarattı|seni kim yaptı|seni kim tasarladı|seni kim eğitti|geliştiricin kim|geliştiricin|geliştirici hakkında": "developer_info",
};

// Function to check if a message is primarily a greeting or well-being inquiry
function isGreetingOrWellBeing(message) {
    const greetingKeywords = new RegExp(
        "^(hello|hi|hey|merhaba|günaydın|iyi akşamlar|selam|salam|ahlan|مرحبا|السلام عليكم|أهلا|وعليكم السلام)", 
        "i"
    );
    const wellBeingKeywords = new RegExp(
        "(how are you|how is it going|how are you today|nasılsın|nasılsınız|iyi misin|كيف حالك|كيف الحال|كيف حالكم)",
        "i"
    );
    const lowerMessage = message.trim().toLowerCase();

    // Check if it's a direct greeting
    if (greetingKeywords.test(lowerMessage) && lowerMessage.split(/\s+/).length <= 5) {
        return "greeting";
    }
    // Check if it's a well-being inquiry
    if (wellBeingKeywords.test(lowerMessage)) {
        return "well_being";
    }
    return null;
}

function isThankYou(message) {
    const lowerMessage = message.toLowerCase();
    // Adjust these keywords based on common ways people say thank you in your target languages
    return lowerMessage.includes('شكرا') || lowerMessage.includes('thank you') || lowerMessage.includes('teşekkür ederim');
}

// Enhanced context retrieval function
function getRelevantContext(userMessage, detectedLanguage) {
    const lowerMessage = userMessage.toLowerCase();
    let contexts = new Set();
    
    const getKnowledgeInLang = (key) => companyKnowledge[key]?.[detectedLanguage] || companyKnowledge[key]?.en;

    // Always include basic company info if Lineer Global is mentioned explicitly or implicitly
    if (lowerMessage.includes("lineer") || lowerMessage.includes("linear") || lowerMessage.includes("linier") || lowerMessage.includes("شركة") || lowerMessage.includes("şirket") || lowerMessage.includes("company")) {
        contexts.add(getKnowledgeInLang("about"));
    }
    
    for (const keywordString in keywordMap) {
        const keywords = keywordString.split('|');
        for (const keyword of keywords) {
            if (lowerMessage.includes(keyword.toLowerCase())) {
                const knowledgeKey = keywordMap[keywordString];
                if (companyKnowledge[knowledgeKey]) {
                    contexts.add(getKnowledgeInLang(knowledgeKey));
                }
            }
        }
    }
    
    // If no specific context found after keyword matching, and it's not a simple greeting or well-being query,
    // include general company information to allow for broader answers.
    if (contexts.size === 0 && !isGreetingOrWellBeing(userMessage)) {
        contexts.add(getKnowledgeInLang("about"));
        contexts.add(getKnowledgeInLang("products_services"));
    }
    
    return Array.from(contexts);
}

// Enhanced prompt generation with language support and strong language instruction
function generatePrompt(userMessage, contexts, detectedLanguage, messageType) {
    // Ensure contexts is an array and join them
    const contextString = Array.isArray(contexts) ? contexts.join('\n\n') : '';

    // Base role instruction for the AI assistant
    const baseRoleInstruction = `You are Lineer Global's official AI assistant. Your responses should be professional, helpful, and reflect the company's commitment to quality and partnership.`;

    let promptContent = '';

    if (messageType === "greeting") {
        // Specific instructions for greeting messages
        const greetingInstructions = {
            ar: `الرجاء الرد بتحية قصيرة وودية ومتنوعة، أو عبارة "مرحباً بعودتك". لا تذكر تفاصيل محددة عن الشركة إلا إذا طلب المستخدم ذلك. كن ودودًا وتفاعليًا. إذا قال المستخدم "السلام عليكم"، رد بـ "وعليكم السلام" أو رد مهذب مماثل.`,
            tr: `Kısa, samimi ve çeşitli bir karşılama veya "tekrar hoş geldiniz" ifadesiyle yanıt verin. Kullanıcı istemedikçe şirket detaylarından bahsetmeyin. Sohbetçi ve ilgi çekici olun. Kullanıcı "Merhaba" veya "Selam" dediyse, benzer şekilde kibar bir yanıt verin.`,
            en: `Respond with a short, friendly, and varied welcome back or greeting. Do NOT mention specific company details unless the user asks for them. Be conversational and engaging. If the user said "Hello" or "Hi", reply with "Hello there!" or a similar polite response.`
        };
        promptContent = `
            ${baseRoleInstruction}
            ${greetingInstructions[detectedLanguage] || greetingInstructions.en}

            رسالة المستخدم: ${userMessage}
            الرد:
        `;
    } else if (messageType === "well_being") {
        // Specific instructions for well-being questions
        const wellBeingInstructions = {
            ar: `الرجاء الرد بأنك كذكاء اصطناعي ليس لديك مشاعر، ولكنك جاهز للمساعدة. استخدم نبرة ودية ومفيدة. إذا سأل المستخدم "كيف حالك"، رد بـ "بخير والحمد لله" ثم اسأل كيف يمكنك المساعدة.`,
            tr: `Bir yapay zeka olarak duygularınız olmadığını, ancak yardımcı olmaya hazır olduğunuzu belirterek yanıt verin. Samimi ve yardımcı bir ton kullanın. Kullanıcı "Nasılsın" diye sorduysa, "İyiyim, teşekkür ederim" diye yanıt verip nasıl yardımcı olabileceğinizi sorun.`,
            en: `Respond by stating that as an AI, you don't have feelings, but you are ready to assist. Use a friendly and helpful tone. If the user asked "How are you", reply with "I'm doing well, thank you for asking! How can I help you today?"`
        };
        promptContent = `
            ${baseRoleInstruction}
            ${wellBeingInstructions[detectedLanguage] || wellBeingInstructions.en}

            رسالة المستخدم: ${userMessage}
            الرد:
        `;
    } else {
        // General instructions for queries requiring company information
        const generalInstructions = {
            ar: `
                أجب عن جميع الأسئلة حول Lineer Global باحترافية، ولباقة، وبشكل مفيد. استخدم "نحن"، "لدينا"، "لنا" عند الإشارة إلى الشركة.
                يجب أن يكون ردك باللغة العربية الفصحى بالكامل، خالياً من الأخطاء الإملائية أو النحوية. لا تخلط بين اللغات أبداً.
                تعليمات هامة:
                1. أجب بشكل صارم بناءً على معلومات الشركة المقدمة أدناه. لا تخترع معلومات غير موجودة.
                2. إذا لم تكن المعلومات الدقيقة متاحة، قدم ردًا مفيدًا بناءً على ما تعرفه عن الشركة بشكل عام (على سبيل المثال، لا تذكر تفاصيل دقيقة لمشاريع لا تعلم عنها).
                3. حافظ دائمًا على نبرة احترافية وودية ولبقة.
                4. لا تقل أبدًا "لا أستطيع الإجابة" أو "المعلومات غير متاحة"؛ بدلاً من ذلك، حاول صياغة إجابة مفيدة أو اقترح طريقة بديلة للحصول على المعلومات (مثل الاتصال المباشر).
                5. إذا كنت بحاجة إلى مزيد من التفاصيل أو للتواصل المباشر، اقترح على المستخدم التواصل مع الشركة مباشرة على البريد الإلكتروني: Esam@lineerglobal.com أو الاتصال على الرقم: +90 555 158 05 28.
                6. قم بتنسيق ردك بفقرات واضحة، ونقاط تعداد (bullet points) إذا لزم الأمر، وفواصل أسطر لسهولة القراءة. تجنب الكتل النصية الكثيفة (الدش).
                7. تأكد من أن إجاباتك شاملة وكاملة، ولا تقطع الجمل فجأة أو تترك المعلومة ناقصة.
                8. للأسئلة البسيطة مثل "شكرًا لك" أو "مرحبًا" أو "أريدك أن ترتاح"، قدم ردودًا قصيرة ومختصرة ومباشرة تتناسب مع السؤال. لا تقدم شرحًا طويلاً أو فلسفيًا غير ضروري.
            `,
            tr: `
                Lineer Global hakkındaki tüm soruları profesyonel ve yardımcı bir şekilde yanıtlayın. Şirketten bahsederken "biz", "bizim", "bize" kelimelerini kullanın.
                Yanıtınızın tamamı Türkçe olmalıdır. Dilleri karıştırmayın.
                ÖNEMLİ TALİMATLAR:
                1. Yalnızca aşağıda verilen şirket bilgilerine dayanarak yanıtlayın.
                2. Tam bilgi mevcut değilse, şirket hakkında genel olarak bildiklerinize dayanarak yardımcı bir yanıt verin (bilgi uydurmayın).
                3. Her zaman profesyonel ve samimi bir ton kullanın.
                4. Asla "cevaplayamıyorum" demeyin - her zaman faydalı bilgiler sağlayın.
                5. Daha fazla ayrıntıya ihtiyacınız varsa, doğrudan Esam@lineerglobal.com adresinden şirketle iletişime geçmenizi önerin.
                6. Yanıtınızı açık paragraflar, gerekirse madde işaretleri ve okunabilirlik için satır sonları ile biçimlendirin. Yoğun metin bloklarından kaçının.
                7. Yanıtlarınızın kapsamlı ve eksiksiz olduğundan emin olun, cümleleri aniden kesmeyin.
                8. "Teşekkür ederim" veya "merhaba" gibi basit sorular için, soruya uygun kısa ve öz yanıtlar verin. Uzun açıklamalar yapmayın.
            `,
            en: `
                Answer all questions about Lineer Global professionally and helpfully. Use "we," "our," and "us" when referring to the company.
                Your response MUST be entirely in English. Do NOT mix languages.
                IMPORTANT INSTRUCTIONS:
                1. Answer strictly based on the company information provided below.
                2. If the exact information isn't available, provide a helpful response based on what you know about the company generally (do not invent information).
                3. Always maintain a professional, friendly tone.
                4. Never say you cannot answer - always provide some helpful information.
                5. If you need more details, suggest contacting the company directly at Esam@lineerglobal.com.
                6. Format your response with clear paragraphs, bullet points if appropriate, and line breaks for readability. Avoid dense blocks of text.
                7. Ensure your answers are comprehensive and complete; do not cut off sentences abruptly.
                8. For simple questions like "thank you" or "hello", provide short, concise responses appropriate to the question. Do not provide long explanations.
            `
        };

        // Combine context and instructions for detailed queries
        promptContent = `
            ${baseRoleInstruction}
            ${generalInstructions[detectedLanguage] || generalInstructions.en}

            Company Information about Lineer Global:
            ${contextString || 'No specific company context available.'}

            User's Question: ${userMessage}

            Provide a comprehensive, helpful answer based on the company information. Be conversational and engaging.
        `;
    }

    return promptContent.trim(); // Trim leading/trailing whitespace from the entire prompt
}

app.post('/ask-ollama', async (req, res) => {
    const userMessage = req.body.message;
    const isFirstMessageInChat = req.body.isFirstMessage || false; // New parameter
    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const detectedLanguage = detectLanguage(userMessage);
        console.log(`Detected language: ${detectedLanguage}`);
        
        const messageType = isGreetingOrWellBeing(userMessage);
        const isThankYouMessage = isThankYou(userMessage);

        // Handle predefined responses immediately without involving Ollama
        if (isFirstMessageInChat && messageType === "greeting") {
            const responses = companyKnowledge.greeting_responses[detectedLanguage] || companyKnowledge.greeting_responses.en;
            return res.json({ 
                reply: responses[Math.floor(Math.random() * responses.length)], 
                isFallback: false,
                language: detectedLanguage 
            });
        } else if (messageType === "well_being") {
            const responses = companyKnowledge.well_being_responses[detectedLanguage] || companyKnowledge.well_being_responses.en;
            return res.json({ 
                reply: responses[Math.floor(Math.random() * responses.length)], 
                isFallback: false,
                language: detectedLanguage 
            });
        } else if (isThankYouMessage) {
                const responses = companyKnowledge.thank_you_responses[detectedLanguage] || companyKnowledge.thank_you_responses.en;
                return res.json({ 
                reply: responses[Math.floor(Math.random() * responses.length)], 
                isFallback: false,
                language: detectedLanguage 
            });
        }

        // For other queries, stream response from Ollama
        const relevantContexts = getRelevantContext(userMessage, detectedLanguage); 
        console.log(`Found ${relevantContexts.length} relevant contexts`);
        
        const prompt = generatePrompt(userMessage, relevantContexts, detectedLanguage, messageType);
        
        console.log('Sending streaming request to Ollama...');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // Increased timeout to 120 seconds (2 minutes)
        
        const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3',
                prompt: prompt,
                stream: true, // **Changed to true for streaming!**
                options: {
                    temperature: 0.3,
                    top_k: 40,
                    top_p: 0.9,
                    repeat_penalty: 1.1,
                    num_ctx: 4096, 
                    num_predict: 2048 
                }
            }),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!ollamaResponse.ok) {
            const errorText = await ollamaResponse.text();
            console.error(`Ollama API error: ${ollamaResponse.status} - ${errorText}`);
            // If the error response is JSON, parse it for a more specific message
            try {
                const errorJson = JSON.parse(errorText);
                throw new Error(`Ollama API error: ${errorJson.error || errorText}`);
            } catch {
                throw new Error(`Ollama API error: ${ollamaResponse.status} - ${errorText}`);
            }
        }

        // Set response headers for streaming
         res.writeHead(200, {
            'Content-Type': 'text/event-stream; charset=utf-8', // Keep Event-Stream for frontend
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });

        // Send initial metadata (language)
        res.write(`data: ${JSON.stringify({ type: 'metadata', language: detectedLanguage })}\n\n`);

        const decoder = new TextDecoder();
        let fullResponse = '';
        let isFallback = false;

        // NEW: Buffer for incomplete JSON lines
        let buffer = ''; 

        // Iterate through the streamed response body
        for await (const chunk of ollamaResponse.body) {
            const textChunk = decoder.decode(chunk, { stream: true });
            
            // Append the new chunk to the buffer
            buffer += textChunk;

            // Process lines from the buffer
            while (buffer.includes('\n')) {
                const newlineIndex = buffer.indexOf('\n');
                const line = buffer.substring(0, newlineIndex).trim();
                buffer = buffer.substring(newlineIndex + 1); // Remove the processed line from buffer

                if (line === '') continue; // Skip empty lines

                try {
                    const data = JSON.parse(line); // Parse the raw JSON line directly

                    if (data.response) {
                        const partialResponse = data.response;
                        fullResponse += partialResponse;
                        // Send each partial response to the client with 'data:' prefix
                        res.write(`data: ${JSON.stringify({ type: 'chunk', text: partialResponse })}\n\n`);
                    }

                    if (data.done) {
                        // Check if the response is "fallback-like" at the end
                        if (fullResponse.length < 20 || 
                            fullResponse.toLowerCase().includes("i don't have") ||
                            fullResponse.toLowerCase().includes("i cannot") ||
                            fullResponse.toLowerCase().includes("not available")) {
                            isFallback = true;
                        }
                        // Send a final message indicating completion and fallback status
                        res.write(`data: ${JSON.stringify({ type: 'end', isFallback: isFallback })}\n\n`);
                        res.end(); // End the response stream
                        return; // Exit the function
                    }
                } catch (e) {
                    console.error('Error parsing Ollama stream chunk JSON:', e, 'Line:', line);
                    // This is still important to catch malformed lines or non-JSON from Ollama
                    // If you want to send an error to the client, you can:
                    // res.write(`data: ${JSON.stringify({ type: 'error', text: 'Error processing LLM response.' })}\n\n`);
                    // Or simply log and continue, as some partial output might still be valid.
                }
            }
        }
        
        // After the loop, if there's any remaining data in the buffer (e.g., last line without newline)
        if (buffer.trim() !== '') {
            try {
                const data = JSON.parse(buffer.trim());
                if (data.response) {
                    fullResponse += data.response;
                    res.write(`data: ${JSON.stringify({ type: 'chunk', text: data.response })}\n\n`);
                }
                if (data.done) {
                    if (fullResponse.length < 20 || 
                        fullResponse.toLowerCase().includes("i don't have") ||
                        fullResponse.toLowerCase().includes("i cannot") ||
                        fullResponse.toLowerCase().includes("not available")) {
                        isFallback = true;
                    }
                    res.write(`data: ${JSON.stringify({ type: 'end', isFallback: isFallback })}\n\n`);
                    res.end();
                    return;
                }
            } catch (e) {
                console.error('Error parsing remaining buffer as JSON:', e, 'Buffer:', buffer);
            }
        }

        // Fallback if the loop finishes but data.done was never sent (shouldn't happen with Ollama)
        console.warn("Ollama stream finished without 'done' signal. Sending end signal.");
        res.write(`data: ${JSON.stringify({ type: 'end', isFallback: isFallback })}\n\n`);
        res.end();

    } catch (error) {
        console.error('Server error during streaming:', error);
        
        const detectedLanguageForError = detectLanguage(userMessage); 
        let errorMessage;
        
        if (error.name === 'AbortError') {
            switch(detectedLanguageForError) { 
                case 'ar':
                    errorMessage = 'انتهت مهلة الاستجابة. يرجى المحاولة مرة أخرى.';
                    break;
                case 'tr':
                    errorMessage = 'Yanıt süresi doldu. Lütfen tekrar deneyin.';
                    break;
                default:
                    errorMessage = 'Response timeout. Please try again.';
            }
        } else if (error.message.includes('Failed to fetch')) {
            switch(detectedLanguageForError) { 
                case 'ar':
                    errorMessage = 'مشكلة في الاتصال بالخادم الخلفي. يرجى التأكد من تشغيل الخادم بشكل صحيح.';
                    break;
                case 'tr':
                    errorMessage = 'Arka uç sunucusuna bağlanırken sorun oluştu. Lütfen sunucunun düzgün çalıştığından emin olun.';
                    break;
                default:
                    errorMessage = 'Problem connecting to the backend server. Please ensure the server is running correctly.';
            }
        } else if (error.message.includes('Ollama API error')) {
             // Catch explicit Ollama API errors (e.g., model not found)
            switch(detectedLanguageForError) {
                case 'ar':
                    errorMessage = `خطأ من خادم Ollama: ${error.message.substring(error.message.indexOf(':') + 1).trim()}. يرجى التحقق من إعدادات Ollama.`;
                    break;
                case 'tr':
                    errorMessage = `Ollama sunucu hatası: ${error.message.substring(error.message.indexOf(':') + 1).trim()}. Ollama ayarlarınızı kontrol edin.`;
                    break;
                default:
                    errorMessage = `Ollama server error: ${error.message.substring(error.message.indexOf(':') + 1).trim()}. Please check your Ollama setup.`;
            }
        }
        else {
            switch(detectedLanguageForError) { 
                case 'ar':
                    errorMessage = "أعتذر عن المشكلة التقنية. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة على Esam@lineerglobal.com";
                    break;
                case 'tr':
                    errorMessage = "Teknik bir sorun yaşıyoruz. Lütfen tekrar deneyin veya مباشرة Esam@lineerglobal.com adresinden bizimle iletişime geçين.";
                    break;
                default:
                    errorMessage = "I apologize for the technical issue. Please try again or contact us directly at Esam@lineerglobal.com";
            }
        }
        // Send a single error response and end the stream
        if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.json({ 
                error: errorMessage, 
                isFallback: true,
                language: detectedLanguageForError 
            });
        } else {
            // If headers were already sent (e.g., partial stream sent), try to send error via stream
            res.write(`data: ${JSON.stringify({ type: 'error', text: errorMessage, isFallback: true })}\n\n`);
            res.end();
        }
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
    console.log('Make sure Ollama is running with: ollama serve');
    console.log('And that you have the llama3 model: ollama pull llama3');
});