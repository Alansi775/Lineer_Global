document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const formMessages = document.getElementById('form-messages');
    const submitButton = form.querySelector('button[type="submit"]');
    const submitButtonSpan = submitButton.querySelector('span'); // Get the span inside the button

    // Define all localized messages and button texts in a central object
    const localizedContent = {
        buttonOriginal: { // Original text for the button (from data attributes)
            en: submitButton.getAttribute('data-en') || 'Send Message',
            ar: submitButton.getAttribute('data-ar') || 'إرسال الرسالة',
            tr: submitButton.getAttribute('data-tr') || 'Mesaj Gönder'
        },
        sending: { // Text for the button while sending
            en: 'Sending...',
            ar: 'جاري الإرسال...',
            tr: 'Gönderiliyor...'
        },
        success: { // Success message
            en: 'Thank you for your message We will contact you soon',
            ar: 'شكرا لرسالتك سوف نتصل بك قريبا',
            tr: 'Mesajınız için teşekkür ederiz Yakında sizinle iletişime geçeceğiz'
        },
        errorGeneric: { // Generic error message
            en: 'Oops There was a problem sending your message',
            ar: 'عذرًا حدثت مشكلة أثناء إرسال رسالتك',
            tr: 'Hata Mesajınız gönderilirken bir sorun oluştu'
        },
        errorValidation: { // Specific error for input issues
            en: 'Please check your input.',
            ar: 'الرجاء التحقق من المدخلات الخاصة بك.',
            tr: 'Lütfen girişinizi kontrol edin.'
        },
        errorNetwork: { // Network error message
            en: 'A network error occurred. Please try again later.',
            ar: 'حدث خطأ في الشبكة. الرجاء المحاولة مرة أخرى لاحقًا.',
            tr: 'Bir ağ hatası oluştu. Lütfen daha sonra tekrar deneyin.'
        }
    };

    // Function to get the current language from the <html> tag
    function getCurrentLanguage() {
        return document.documentElement.lang || 'en'; // Defaults to 'en'
    }

    // Function to update button text to its ORIGINAL localized state
    function updateSubmitButtonTextToOriginal() {
        const currentLang = getCurrentLanguage();
        submitButtonSpan.textContent = localizedContent.buttonOriginal[currentLang];
    }

    // --- Initial Setup ---
    // 1. Set the correct original button text on page load
    updateSubmitButtonTextToOriginal();

    // 2. Attach event listener for language switcher changes
    //    This assumes your main language switcher (likely in script.js)
    //    correctly updates document.documentElement.lang when the language changes.
    //    We also add a listener directly to the select element for redundancy.
    const languageSwitcher = document.getElementById('language-switcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            // After the main language script updates document.documentElement.lang,
            // we update the button text
            updateSubmitButtonTextToOriginal();

            // Optional: If you want to also update the placeholder texts of inputs
            // (though this is typically handled by a broader language script)
            // This example would be for a direct placeholder update:
            // document.querySelector('input[name="name"]').placeholder = //...localized placeholder...
        });
    }

    // --- Form Submission Logic ---
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission (which causes the redirect)

        const formData = new FormData(form);
        const formspreeUrl = form.action;
        const currentLang = getCurrentLanguage(); // Get language at time of submission

        // Show loading state and disable button
        submitButton.disabled = true;
        submitButtonSpan.textContent = localizedContent.sending[currentLang]; // Set button text to 'Sending...' in correct language
        formMessages.classList.remove('show', 'success', 'error'); // Hide previous messages
        formMessages.textContent = ''; // Clear previous text

        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Essential for Formspree to return JSON instead of redirecting
                }
            });

            const data = await response.json(); // Parse the JSON response

            if (response.ok) {
                // Success!
                formMessages.textContent = localizedContent.success[currentLang]; // Use localized success message
                formMessages.classList.add('show', 'success');
                form.reset(); // Clear the form fields
            } else {
                // Error from Formspree
                let errorMessage = localizedContent.errorGeneric[currentLang];
                if (data && data.errors) {
                    errorMessage += ' ' + localizedContent.errorValidation[currentLang];
                } else if (data && data.error) {
                    // Try to use Formspree's error if it's more specific than our generic one.
                    // Filter out overly generic Formspree errors (e.g., "invalid request")
                    const fsError = data.error.toLowerCase();
                    if (!fsError.includes("failed") && !fsError.includes("problem") && !fsError.includes("invalid request")) {
                        errorMessage = data.error; // Use Formspree's specific error
                    }
                }
                formMessages.textContent = errorMessage;
                formMessages.classList.add('show', 'error');
            }
        } catch (error) {
            // Network or other unexpected errors
            console.error('Submission error:', error);
            formMessages.textContent = localizedContent.errorNetwork[currentLang]; // Use localized network error
            formMessages.classList.add('show', 'error');
        } finally {
            // Always re-enable button and restore original localized text after submission (success or failure)
            submitButton.disabled = false;
            updateSubmitButtonTextToOriginal(); // Call the function to restore the correct localized text

            // Hide the message after a few seconds
            setTimeout(() => {
                formMessages.classList.remove('show');
                // Optionally clear text after fade out
                setTimeout(() => formMessages.textContent = '', 400);
            }, 7000); // Hide after 7 seconds
        }
    });
});