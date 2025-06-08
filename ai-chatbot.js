// File: ai-chatbot.js (استبدل الملف بالكامل بهذا الكود)

document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotModal = document.getElementById('chatbot-modal');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const sendChatbotMessageBtn = document.getElementById('send-chatbot-message');
    const closeChatbotBtn = document.getElementById('close-chatbot');

    let isFirstMessageInChatSession = true; 
    let currentAIResponseElement = null; 
    let currentParagraphElement = null; 
    let streamedResponseLanguage = 'en'; 
    let paragraphBuffer = ''; // هذا سيخزن كامل النص للفقرة الحالية

    const TYPING_DELAY_CHARACTER = 30; // تأخير أقل لكل حرف لإظهار تأثير الكتابة الحقيقي
    const PARAGRAPH_DELAY = 100; // تأخير بين الفقرات

    class SmartChatbot {
        constructor() {
            this.isProcessing = false;
            this.retryCount = 0;
            this.maxRetries = 3;
            this.predefinedResponses = {
                "welcome": {
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
                "well_being": {
                    "en": [
                        "I'm an AI, so I don't have feelings, but I'm ready to assist you!",
                        "As an AI, I don't have a 'how are you,' but I'm functioning perfectly and ready to help!",
                        "I'm here and ready to provide information about Lineer Global!"
                    ],
                    "ar": [
                        "أنا ذكاء اصطناعي، لذا لا أشعر، ولكني جاهز لمساعدتك!",
                        "بصفتي ذكاءً اصطناعياً، ليس لدي 'كيف حالك'، ولكني أعمل بشكل ممتاز وجاهز للمساعدة!",
                        "أنا هنا وجاهز لتقديم المعلومات حول لينير جلوبال!",
                        "أنا بخير، شكراً لسؤالك! كيف يمكنني خدمتك؟",
                        "بخير والحمد لله! ما استفسارك اليوم؟"
                    ],
                    "tr": [
                        "Ben bir yapay zekayım, bu yüzden hislerim yok ama size yardımcı olmaya hazırım!",
                        "Bir yapay zeka olarak 'nasılsın' diye bir durumum yok, ancak mükemmel çalışıyorum ve yardıma hazırım!",
                        "Buradayım ve Lineer Global hakkında bilgi vermeye hazırım!",
                        "İyiyim, sorduğunuz için teşekkürler! Size nasıl yardımcı olabilirim?",
                        "İyiyim, hamdolsun! Bugünkü sorunuz nedir?"
                    ]
                },
                "thank_you": {
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
                }
            };
        }

        detectLanguage(message) {
            const arabicRegex = /[\u0600-\u06FF]/;
            const turkishRegex = /[çğıöşüÇĞIİÖŞÜ]/;
            
            if (arabicRegex.test(message)) return 'ar';
            if (turkishRegex.test(message)) return 'tr';
            return 'en';
        }

        isGreetingOrWellBeing(message) {
            const greetingKeywords = new RegExp(
                "^(hello|hi|hey|merhaba|günaydın|iyi akşamlar|selam|salam|ahlan|مرحبا|السلام عليكم|أهلا|وعليكم السلام)", 
                "i"
            );
            const wellBeingKeywords = new RegExp(
                "(how are you|how is it going|how are you today|nasılsın|nasılsınız|iyi misin|كيف حالك|كيف الحال|كيف حالكم)",
                "i"
            );
            const lowerMessage = message.trim().toLowerCase();

            if (greetingKeywords.test(lowerMessage) && lowerMessage.split(/\s+/).length <= 5) {
                return "greeting";
            }
            if (wellBeingKeywords.test(lowerMessage)) {
                return "well_being";
            }
            return null;
        }

        isThankYou(message) {
            const lowerMessage = message.toLowerCase();
            return lowerMessage.includes('شكرا') || lowerMessage.includes('thank you') || lowerMessage.includes('teşekkür ederim');
        }

        async processMessage(message, isFirstMessageInChat) {
            if (this.isProcessing) {
                return;
            }

            this.isProcessing = true;
            const userLang = this.detectLanguage(message);
            const messageType = this.isGreetingOrWellBeing(message);
            const isThankYouMessage = this.isThankYou(message);

            if (isFirstMessageInChat && messageType === "greeting") {
                const responses = this.predefinedResponses.welcome[userLang] || this.predefinedResponses.welcome.en;
                this.isProcessing = false;
                return { reply: responses[Math.floor(Math.random() * responses.length)], isFallback: false, language: userLang, isStream: false };
            }
            
            if (messageType === "well_being") {
                const responses = this.predefinedResponses.well_being[userLang] || this.predefinedResponses.well_being.en;
                this.isProcessing = false;
                return { reply: responses[Math.floor(Math.random() * responses.length)], isFallback: false, language: userLang, isStream: false };
            }

            if (isThankYouMessage) {
                const responses = this.predefinedResponses.thank_you[userLang] || this.predefinedResponses.thank_you.en;
                this.isProcessing = false;
                return { reply: responses[Math.floor(Math.random() * responses.length)], isFallback: false, language: userLang, isStream: false };
            }

            try {
                console.log('Sending message to backend for streaming:', message);
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 120000); 
                
               // const response = await fetch('http://localhost:3000/ask-ollama', { this is local 
               const response = await fetch('https://47b9-78-183-55-233.ngrok-free.app/ask-ollama', { // تأكد من تحديث هذا الرابط
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message, isFirstMessage: isFirstMessageInChat }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    let errorData;
                    if (response.headers.get('content-type')?.includes('application/json')) {
                        errorData = await response.json();
                    } else {
                        errorData = { error: `HTTP ${response.status} - ${response.statusText}` };
                    }
                    throw new Error(`Backend error: ${response.status} - ${errorData.error || response.statusText}`);
                }
                
                return { 
                    reader: response.body.getReader(), 
                    decoder: new TextDecoder('utf-8'),
                    isStream: true 
                };

            } catch (error) {
                console.error('Error communicating with backend:', error);
                
                if (this.retryCount < this.maxRetries && error.name !== 'AbortError' && !error.message.includes('JSON parse error')) {
                    this.retryCount++;
                    console.log(`Retrying... Attempt ${this.retryCount}/${this.maxRetries}`);
                    await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount));
                    this.isProcessing = false; 
                    return this.processMessage(message, isFirstMessageInChat); 
                }
                
                this.retryCount = 0; 
                this.isProcessing = false;
                
                const errorMessage = this.getErrorMessage(userLang, error); 
                
                return { 
                    reply: errorMessage, 
                    isFallback: true,
                    language: userLang,
                    isStream: false 
                };
            } finally {
                // isProcessing reset is handled after stream finishes or for non-streamed responses
            }
        }

        getErrorMessage(language, error = null) {
            let baseMessage = "I apologize for the technical issue. Please try again or contact us directly at Esam@lineerglobal.com";
            if (error) {
                 if (error.name === 'AbortError') {
                    baseMessage = {
                        ar: 'انتهت مهلة الاستجابة. يرجى المحاولة مرة أخرى.',
                        tr: 'Yanıt süresi doldu. Lütfen tekrar deneyin.',
                        en: 'Response timeout. Please try again.'
                    }[language];
                } else if (error.message.includes('Failed to fetch')) {
                    baseMessage = {
                        ar: 'مشكلة في الاتصال بالخادم الخلفي. يرجى التأكد من تشغيل الخادم بشكل صحيح.',
                        tr: 'Arka uç sunucusuna bağlanırken sorun oluştu. Lütfen sunucunun düzgün çalıştığından emin olun.',
                        en: 'Problem connecting to the backend server. Please ensure the server is running correctly.'
                    }[language];
                } else if (error.message.includes('Ollama API error')) {
                     baseMessage = {
                        ar: `خطأ من خادم Ollama: ${error.message.substring(error.message.indexOf(':') + 1).trim()}. يرجى التحقق من إعدادات Ollama.`,
                        tr: `Ollama sunucu hatası: ${error.message.substring(error.message.indexOf(':') + 1).trim()}. Ollama ayarlarınızı kontrol edin.`,
                        en: `Ollama server error: ${error.message.substring(error.message.indexOf(':') + 1).trim()}. Please check your Ollama setup.`
                    }[language];
                }
            }

            switch(language) {
                case 'ar':
                    return baseMessage || "أعتذر عن المشكلة التقنية. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة على Esam@lineerglobal.com";
                case 'tr':
                    return baseMessage || "Teknik bir sorun yaşıyoruz. Lütfen tekrar deneyin veya direkt Esam@lineerglobal.com adresinden bizimle iletişime geçin.";
                default:
                    return baseMessage || "I apologize for the technical issue. Please try again or contact us directly at Esam@lineerglobal.com";
            }
        }
    }

    const smartChatbot = new SmartChatbot();

    function createMessageContainer(sender, language) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.classList.add(`lang-${language}`);
        
        if (language === 'ar') {
            messageDiv.style.direction = 'rtl';
            messageDiv.style.textAlign = 'right';
        } else {
            messageDiv.style.direction = 'ltr';
            messageDiv.style.textAlign = 'left';
        }
        chatbotMessages.appendChild(messageDiv);
        return messageDiv;
    }

    // **الدالة الجديدة لتحريك المحتوى النصي داخل عنصر DOM واحد**
    // هذا يسمح للمتصفح بتشكيل النص بشكل صحيح قبل بدء تأثير الكتابة.
    async function animateTextContent(element, fullText) {
        element.textContent = ''; // مسح أي محتوى سابق
        const words = fullText.split(/(\s+)/); // تقسيم بالكلمات مع الاحتفاظ بالمسافات

        for (const word of words) {
            // استخدام `textContent` مباشرة يضمن أن الكلمة تُضاف ككتلة واحدة
            // مما يسمح للمتصفح بتشكيل الحروف العربية بشكل صحيح
            element.textContent += word;
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, TYPING_DELAY_CHARACTER));
        }
    }


    // دالة addMessage يجب أن تستدعي الدالة الصحيحة (animateTextContent)
    async function addMessage(text, sender, language = 'en') {
        const messageDiv = createMessageContainer(sender, language);
        if (sender === 'user') {
            messageDiv.innerHTML = text.replace(/\n/g, '<br>');
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        } else { 
            // استخدام الدالة الجديدة هنا
            await animateTextContent(messageDiv, text);
        }
    }

    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'ai-message', 'typing-indicator');
        typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        typingDiv.id = 'typing-indicator';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollTop; // Keep current scroll if possible
        return typingDiv;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    async function saveUnansweredQuestion(question, language) {
        if (!window.firebaseDb) {
            console.warn("Firebase database not found (window.firebaseDb is undefined). Cannot save unanswered question.");
            return;
        }

        try {
            const { collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
            
            await addDoc(collection(window.firebaseDb, "unanswered_questions"), {
                question: question,
                language: language,
                timestamp: new Date().toISOString(), 
                userAgent: navigator.userAgent
            });
            
            console.log("Unanswered question saved to Firebase:", question);
        } catch (e) {
            console.error("Error adding document to Firebase: ", e);
            console.warn("Firebase may not be initialized or configured correctly. Ensure 'firebaseDb' is set on window object.");
        }
    }

    async function getAiResponse(userMessage) {
        const typingIndicator = addTypingIndicator();
        const clientSideDetectedLanguage = smartChatbot.detectLanguage(userMessage); 

        try {
            console.log(`Processing message (client-side detected language: ${clientSideDetectedLanguage}), Is First Message: ${isFirstMessageInChatSession}:`, userMessage);
            
            const responseData = await smartChatbot.processMessage(userMessage, isFirstMessageInChatSession);
            
            if (responseData.isStream) {
                currentAIResponseElement = createMessageContainer('ai', clientSideDetectedLanguage);
                // لن نضيف <p> هنا، بل سنبني النص بالكامل ثم نضيفه.
                // أو يمكننا استخدام <p> واحدة وتعبئتها تدريجيا بـ textContent
                currentParagraphElement = document.createElement('p'); // سنستخدم p واحدة لكل رسالة مبدئياً
                currentAIResponseElement.appendChild(currentParagraphElement);

                let fullStreamedText = ''; // لتجميع النص الكامل للرد المتدفق

                const reader = responseData.reader;
                const decoder = responseData.decoder;
                let buffer = ''; 
                let firstChunkReceived = false; 

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    const chunk = decoder.decode(value, { stream: true });
                    buffer += chunk;
                    
                    const lines = buffer.split('\n');
                    buffer = lines.pop(); 

                    for (const line of lines) {
                        if (line.trim() === '' || !line.startsWith('data: ')) {
                            continue;
                        }

                        try {
                            const eventData = JSON.parse(line.substring('data: '.length).trim());
                            
                            if (eventData.type === 'metadata') {
                                streamedResponseLanguage = eventData.language;
                                if (currentAIResponseElement) {
                                    currentAIResponseElement.classList.remove('lang-en', 'lang-ar', 'lang-tr');
                                    currentAIResponseElement.classList.add(`lang-${streamedResponseLanguage}`);
                                    if (streamedResponseLanguage === 'ar') {
                                        currentAIResponseElement.style.direction = 'rtl';
                                        currentAIResponseElement.style.textAlign = 'right';
                                    } else {
                                        currentAIResponseElement.style.direction = 'ltr';
                                        currentAIResponseElement.style.textAlign = 'left';
                                    }
                                }
                            } else if (eventData.type === 'chunk') {
                                if (!firstChunkReceived) {
                                    removeTypingIndicator(); 
                                    firstChunkReceived = true;
                                }
                                const textChunk = eventData.text;
                                fullStreamedText += textChunk; // أضف الـ chunk إلى النص الكامل

                                // هنا الفكرة: بدلاً من إضافة span لكل كلمة، نحدث الـ textContent
                                // هذا يسمح للمتصفح بتشكيل النص بشكل صحيح
                                currentParagraphElement.textContent = fullStreamedText;
                                chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // التمرير للأسفل
                                await new Promise(r => setTimeout(r, TYPING_DELAY_CHARACTER)); // تأخير بسيط لكل تحديث

                                // **معالجة الفقرات**: إذا وجدنا علامتين جديدتين، فهذا يعني فقرة كاملة
                                if (textChunk.includes('\n\n')) {
                                    // قم بإنشاء فقرة جديدة، وامسح النص الكامل لهذه الفقرة
                                    fullStreamedText = '';
                                    currentParagraphElement = document.createElement('p');
                                    currentAIResponseElement.appendChild(currentParagraphElement);
                                    await new Promise(r => setTimeout(r, PARAGRAPH_DELAY));
                                }

                            } else if (eventData.type === 'end') {
                                if (!firstChunkReceived) { 
                                    removeTypingIndicator();
                                }
                                // تأكد من عرض أي نص متبقي في buffer
                                if (fullStreamedText.trim() !== '' && currentParagraphElement) {
                                    currentParagraphElement.textContent = fullStreamedText;
                                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                                } else if (currentParagraphElement && currentParagraphElement.textContent.trim() === '') {
                                    // إذا كانت الفقرة فارغة عند النهاية، قم بإزالتها
                                    currentParagraphElement.remove();
                                }

                                if (eventData.isFallback) {
                                    await saveUnansweredQuestion(userMessage, streamedResponseLanguage);
                                }
                                break; 
                            } else if (eventData.type === 'error') {
                                if (!firstChunkReceived) {
                                    removeTypingIndicator();
                                }
                                // عرض أي نص تم تجميعه حتى الآن قبل عرض رسالة الخطأ
                                if (fullStreamedText.trim() !== '' && currentParagraphElement) {
                                    currentParagraphElement.textContent = fullStreamedText;
                                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                                }

                                if (currentParagraphElement && currentParagraphElement.textContent.trim() !== '') {
                                    // إذا كان هناك نص بالفعل في الفقرة الحالية، ابدأ فقرة جديدة لرسالة الخطأ
                                    currentParagraphElement = document.createElement('p');
                                    currentAIResponseElement.appendChild(currentParagraphElement);
                                    await new Promise(r => setTimeout(r, PARAGRAPH_DELAY));
                                } else if (!currentParagraphElement) {
                                    // إذا لم يكن هناك عنصر فقرة بعد (في حال الخطأ المبكر)
                                    currentParagraphElement = document.createElement('p');
                                    currentAIResponseElement.appendChild(currentParagraphElement);
                                }
                                currentParagraphElement.classList.add('error-message');
                                await animateTextContent(currentParagraphElement, eventData.text); // استخدم الدالة الجديدة لرسالة الخطأ
                                await saveUnansweredQuestion(userMessage, streamedResponseLanguage); 
                                break; 
                            }
                        } catch (e) {
                            console.error('Error parsing stream event data:', e, 'Line:', line);
                        }
                    }
                }
                
                // تنظيف بعد انتهاء الـ stream
                smartChatbot.isProcessing = false; 
                currentAIResponseElement = null; 
                currentParagraphElement = null;
                paragraphBuffer = ''; // التأكد من إعادة تعيينه
                fullStreamedText = ''; // التأكد من إعادة تعيينه
                isFirstMessageInChatSession = false; 

            } else {
                removeTypingIndicator(); 
                await addMessage(responseData.reply, 'ai', responseData.language); 
                if (responseData.isFallback) {
                    await saveUnansweredQuestion(userMessage, responseData.language);
                }
                smartChatbot.isProcessing = false; 
                isFirstMessageInChatSession = false; 
            }

        } catch (error) {
            console.error('AI Response Error (top level catch):', error);
            removeTypingIndicator();
            
            const errorMessage = smartChatbot.getErrorMessage(clientSideDetectedLanguage, error);
            await addMessage(errorMessage, 'ai', clientSideDetectedLanguage); 
            
            await saveUnansweredQuestion(userMessage, clientSideDetectedLanguage);
            smartChatbot.isProcessing = false; 
            currentAIResponseElement = null; 
            currentParagraphElement = null;
            paragraphBuffer = '';
            isFirstMessageInChatSession = false; 
        }
    }

    function initializeChat() {
        const pageLanguage = document.documentElement.lang || 
                           (document.querySelector('html').getAttribute('lang')) || 
                           navigator.language.split('-')[0] || 
                           'en';
        
        const welcomeMessage = smartChatbot.predefinedResponses.welcome[pageLanguage]?.[0] || smartChatbot.predefinedResponses.welcome.en[0];
        addMessage(welcomeMessage, 'ai', pageLanguage);
        isFirstMessageInChatSession = true; 
    }

    sendChatbotMessageBtn.addEventListener('click', async () => {
        const userMessage = chatbotInput.value.trim();
        if (userMessage && !smartChatbot.isProcessing) {
            const language = smartChatbot.detectLanguage(userMessage); 
            addMessage(userMessage, 'user', language);
            chatbotInput.value = '';
            await new Promise(r => setTimeout(r, 50)); 
            await getAiResponse(userMessage);
        }
    });

    chatbotInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendChatbotMessageBtn.click();
        }
    });

    if (chatbotButton) {
        chatbotButton.addEventListener('click', () => {
            chatbotModal.classList.toggle('active');
            if (chatbotModal.classList.contains('active')) {
                if (chatbotMessages.children.length === 0) { 
                    initializeChat();
                }
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                chatbotInput.focus();
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (chatbotModal && chatbotButton) { 
            const isClickInsideModal = chatbotModal.contains(event.target);
            const isClickOnButton = chatbotButton.contains(event.target);

            if (!isClickInsideModal && !isClickOnButton && chatbotModal.classList.contains('active')) {
                chatbotModal.classList.remove('active');
            }
        }
    });

    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener('click', () => {
            chatbotModal.classList.remove('active');
        });
    }

    window.addEventListener('online', () => {
        console.log('Connection restored');
    });

    window.addEventListener('offline', () => {
        console.log('Connection lost');
    });
});