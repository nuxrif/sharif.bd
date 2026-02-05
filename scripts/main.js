document.addEventListener('DOMContentLoaded', () => {
    const heroTagline = document.querySelector('.tagline');

    // Start hero typing effect immediately
    if (heroTagline) {
        typeEffect(heroTagline, 50);
    }

    // Canvas Matrix Effect
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to use (Matrix style)
    const chars = '01';
    const charArray = chars.split('');

    // Font size and columns
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array to track drops
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    // Drawing function
    function draw() {
        // Semi-transparent black to create trail effect
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0'; // Green text
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop to top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Loop animation
    setInterval(draw, 33);

    // Handle Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // --- Advanced Hacker Animations ---

    // 1. Scroll Reveal Observer
    const revealOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 2. Terminal Typing Effect for Headings
    function typeEffect(element, speed = 100) {
        const text = element.innerHTML;
        element.innerHTML = "";
        let i = 0;

        const timer = setInterval(() => {
            if (i < text.length) {
                element.append(text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                // Add blinking cursor
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.innerHTML = '_';
                element.appendChild(cursor);
            }
        }, speed);
    }

    // 3. Random Glitch Flickering
    const glitches = document.querySelectorAll('.glitch');
    setInterval(() => {
        const randomGlitch = glitches[Math.floor(Math.random() * glitches.length)];
        if (randomGlitch) {
            randomGlitch.style.animation = 'none';
            void randomGlitch.offsetWidth; // Trigger reflow
            randomGlitch.style.animation = null;
        }
    }, 3000);

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
