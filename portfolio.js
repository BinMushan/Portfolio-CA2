
//  Theme Toggle
document.addEventListener('DOMContentLoaded', function () {
    const root = document.documentElement;
    const themeBtn = document.getElementById('themeBtn');

    //    Theme Management

    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        root.classList.toggle('light', savedTheme === 'light');
        updateThemeButton();
        updateThreeJSColors(savedTheme === 'light');
    }

    function updateThemeButton() {
        if (!themeBtn) return;
        const isLight = root.classList.contains('light');
        themeBtn.innerHTML = isLight
            ? '<i class="ph ph-moon"></i><span>Dark Mode</span>'
            : '<i class="ph ph-sun"></i><span>Light Mode</span>';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isLight = root.classList.toggle('light');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateThemeButton();
            updateThreeJSColors(isLight);
        });
    }

    //    Mobile Menu

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        function toggleMenu() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        }

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        document.addEventListener('click', (e) => {
            if (
                !navLinks.contains(e.target) &&
                !mobileMenuBtn.contains(e.target) &&
                navLinks.classList.contains('active')
            ) {
                toggleMenu();
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }



    // Typing Effect
    
    function initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const texts = ['ICT Undergraduate', 'Learner & Innovator', 'Creative Problem Solver', 'Web Developer'];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                charIndex--;
                typingText.textContent = currentText.substring(0, charIndex);
            } else {
                charIndex++;
                typingText.textContent = currentText.substring(0, charIndex);
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Wait 2s at the end
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(type, isDeleting ? 50 : 100);
        }

        type();
    }


    initTypingEffect();


    //    Form submission

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();


            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');


            alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`);


            this.reset();
        });
    }


});
