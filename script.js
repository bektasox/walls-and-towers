document.addEventListener('DOMContentLoaded', function() {
    
    // --- MODULE 1: GLOBAL - MOBILE HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger-menu');
    const header = document.querySelector('.main-header');
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            header.classList.toggle('active');
        });
    }
    document.addEventListener('click', (e) => {
        if (header.classList.contains('active') && !header.contains(e.target)) {
            header.classList.remove('active');
        }
    });

    // --- MODULE 2: GENERIC - SUB-NAVIGATION OBSERVER FOR ANY PAGE ---
    const subNav = document.querySelector('.sub-nav');
    if (subNav) {
        const subNavLinks = subNav.querySelectorAll('a');
        const pageSections = document.querySelectorAll('.page-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const correspondingLink = subNav.querySelector(`a[href="#${id}"]`);
                if (entry.isIntersecting) {
                    subNavLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: `-${(120 + 60 + 5)}px 0px -50% 0px`
        });

        if (pageSections.length > 0) {
            pageSections.forEach(section => {
                observer.observe(section);
            });
        }
    }
    
    // --- MODULE 3: GLOBAL - MULTILINGUAL TRANSLATION ---
    const translations = {
        // translations.js dosyasındaki verilerinizi buraya kopyalayın
        // veya HTML'deki translations.js scriptini koruyun
    };
    const langSwitcher = document.querySelector('.lang-switcher');
    const langLinks = document.querySelectorAll('.lang-link');
    
    const changeLanguage = (lang) => {
        const elementsToTranslate = document.querySelectorAll('[data-lang-key]');
        
        elementsToTranslate.forEach(element => {
            const key = element.dataset.langKey;
            const translation = translations[lang] ? translations[lang][key] : null;

            if(translation) {
                element.textContent = translation;
            } else {
                const enTranslation = translations['en'][key];
                if (enTranslation) element.textContent = enTranslation;
            }
        });

        document.documentElement.lang = lang;

        langLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.lang === lang) {
                link.classList.add('active');
            }
        });

        localStorage.setItem('language', lang);
    };

    if (langSwitcher) {
        langSwitcher.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = e.target.dataset.lang;
            if (targetLang && targetLang !== localStorage.getItem('language')) {
                changeLanguage(targetLang);
            }
        });
    }

    const savedLang = localStorage.getItem('language') || 'en';
    changeLanguage(savedLang);

    // --- MODULE 4: MAPS PAGE - LEAFLET MAP INITIALIZATION ---
    const mapContainer = document.getElementById('mapid');
    if (mapContainer) {
        // Leaflet'in ikon dosyalarının yolunu manuel olarak belirliyoruz
        L.Icon.Default.imagePath = 'lib/leaflet/images/';

        const mymap = L.map('mapid').setView([39.0742, 21.8243], 7);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        const castle_1 = L.marker([37.9792, 23.7162]).addTo(mymap);
        castle_1.bindPopup("<b>Atina Akropolisi</b><br>Tarihi öneme sahip bir kale.");

        const castle_2 = L.marker([38.2466, 21.7346]).addTo(mymap);
        castle_2.bindPopup("<b>Patras Kalesi</b><br>Patras şehrindeki kale.");
    }
});