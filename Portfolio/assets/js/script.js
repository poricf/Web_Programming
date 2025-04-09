document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Particle array
    const particles = [];
    const particleCount = 200;
    const text = 'Fahmi';

    // Colors for particles (purple shades)
    const colors = ['#A855F7', '#6B21A8', '#D8B4FE'];

    // Mouse position for interactivity
    let mouse = { x: null, y: null };
    let isHovering = false;

    // Create particles based on text
    function createParticlesFromText() {
        ctx.font = '80px Poppins';
        ctx.fillStyle = '#FFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Clear the canvas after getting the text data
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create particles at text positions
        for (let y = 0; y < canvas.height; y += 2) {
            for (let x = 0; x < canvas.width; x += 2) {
                const index = (y * canvas.width + x) * 4;
                if (data[index + 3] > 128) { // If pixel is part of the text (alpha > 128)
                    particles.push({
                        x: x,
                        y: y,
                        homeX: x,
                        homeY: y,
                        vx: 0,
                        vy: 0,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        size: Math.random() * 2 + 1
                    });
                }
            }
        }
    }

    // Particle animation
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            // Apply forces
            if (isHovering && mouse.x && mouse.y) {
                // Scatter particles when hovering
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 50) {
                    const force = (50 - distance) / 50;
                    p.vx -= force * dx * 0.1;
                    p.vy -= force * dy * 0.1;
                }
            } else {
                // Return to home position
                const dx = p.homeX - p.x;
                const dy = p.homeY - p.y;
                p.vx += dx * 0.05;
                p.vy += dy * 0.05;
            }

            // Damping
            p.vx *= 0.95;
            p.vy *= 0.95;

            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    // Initialize particles
    createParticlesFromText();
    animateParticles();

    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        isHovering = true;
    });

    canvas.addEventListener('mouseout', () => {
        isHovering = false;
        mouse.x = null;
        mouse.y = null;
    });
});





document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('themeSwitch');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(savedTheme);
        themeSwitch.checked = savedTheme === 'light-mode';
    }

    // Toggle theme on switch change
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });
});