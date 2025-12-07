
        // Gestione Cookie Consent
        document.addEventListener('DOMContentLoaded', function() {
            const cookieBanner = document.getElementById('cookieConsentBanner');
            const acceptAllBtn = document.getElementById('acceptAllCookies');
            const acceptNecessaryBtn = document.getElementById('acceptNecessaryCookies');
            
            // Controlla se l'utente ha già fatto una scelta
            const cookieChoice = localStorage.getItem('cookieConsent');
            
            if (!cookieChoice) {
                // Mostra il banner se non c'è una scelta salvata
                setTimeout(() => {
                    cookieBanner.style.display = 'block';
                }, 1000);
            } else if (cookieChoice === 'all') {
                // Se ha già accettato tutti i cookie, carica GA immediatamente
                loadGoogleAnalytics();
            }
            
            // Gestione click su "Accetta tutti i cookie"
            acceptAllBtn.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'all');
                cookieBanner.style.display = 'none';
                loadGoogleAnalytics();
            });
            
            // Gestione click su "Solo cookie necessari"
            acceptNecessaryBtn.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'necessary');
                cookieBanner.style.display = 'none';
                // Non caricare GA
            });
            
            // Funzione per caricare Google Analytics
            function loadGoogleAnalytics() {
                // Carica lo script di Google Analytics
                const script1 = document.createElement('script');
                script1.async = true;
                script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-WJGZS4C3FX';
                document.head.appendChild(script1);
                
                // Inizializza Google Analytics
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-WJGZS4C3FX');
                
                // Aggiungi event tracking per le chiamate
                const callButtons = document.querySelectorAll('a[href^="tel:"]');
                callButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        gtag('event', 'phone_call', {
                            'event_category': 'Contact',
                            'event_label': 'Phone Call Button'
                        });
                    });
                });
                
                // Tracciamento clic sui pulsanti "CHIAMA ORA"
                const callNowButtons = document.querySelectorAll('.call-now');
                callNowButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        gtag('event', 'call_now_click', {
                            'event_category': 'Conversion',
                            'event_label': 'Call Now Button'
                        });
                    });
                });
            }
        });
        
        // Aggiungi un semplice effetto di scroll per i link
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });