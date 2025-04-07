document.addEventListener('DOMContentLoaded', () => {
    const gremlin = document.getElementById('gremlin');
    const speechBubble = document.getElementById('speech-bubble');
    const commandInput = document.getElementById('command-input');
    const heroContent = document.querySelector('.hero-content');

    const quips = [
        '// TODO: Stop breaking things',
        'SyntaxError: Coffee not found',
        'Ctrl+C, Ctrl+V, profit!',
        'I debug in production, fight me'
    ];

    const showSpeech = (text, duration = 2000) => {
        speechBubble.textContent = text;
        speechBubble.classList.add('show');
        setTimeout(() => speechBubble.classList.remove('show'), duration);
    };

    // Random idle quip every few seconds
    setInterval(() => {
        if (!speechBubble.classList.contains('show')) {
            showSpeech(quips[Math.floor(Math.random() * quips.length)]);
        }
    }, 5000);

    // Hover reaction
    gremlin.addEventListener('mouseover', () => {
        showSpeech('Oi, you hovering over my code?!');
        gremlin.style.animation = 'shake 0.5s infinite';
    });

    gremlin.addEventListener('mouseout', () => {
        gremlin.style.animation = 'typing 1s infinite alternate';
    });

    // Click to break the page
    gremlin.addEventListener('click', () => {
        showSpeech('You asked for it!');
        const originalText = heroContent.innerHTML;
        heroContent.innerHTML = heroContent.textContent.split('').sort(() => Math.random() - 0.5).join('');
        setTimeout(() => heroContent.innerHTML = originalText, 2000);
    });

    // Command input
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.toLowerCase().trim();
            commandInput.value = '';
            switch (command) {
                case 'coffee':
                    showSpeech('Ahh, sweet nectar!');
                    gremlin.style.animation = 'dance 1s infinite';
                    setTimeout(() => gremlin.style.animation = 'typing 1s infinite alternate', 3000);
                    break;
                case 'bug':
                    showSpeech('AHH! Bugs everywhere!');
                    for (let i = 0; i < 5; i++) {
                        const bug = document.createElement('div');
                        bug.textContent = '🐞';
                        bug.style.position = 'absolute';
                        bug.style.left = `${Math.random() * 280}px`;
                        bug.style.top = `${Math.random() * 130}px`;
                        document.querySelector('.gremlin-container').appendChild(bug);
                        setTimeout(() => bug.remove(), 2000);
                    }
                    break;
                case 'debug':
                    showSpeech('Fixed it... probably.');
                    break;
                default:
                    showSpeech('Huh? What’s that supposed to do?');
            }
        }
    });
});

// Extra animation for shaking
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shake {
        0% { transform: translateX(-50%) translateY(0); }
        25% { transform: translateX(-50%) translateY(-5px) rotate(5deg); }
        75% { transform: translateX(-50%) translateY(-5px) rotate(-5deg); }
        100% { transform: translateX(-50%) translateY(0); }
    }
    @keyframes dance {
        0% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.2) rotate(10deg); }
        100% { transform: translateX(-50%) scale(1); }
    }
`;
document.head.appendChild(styleSheet);