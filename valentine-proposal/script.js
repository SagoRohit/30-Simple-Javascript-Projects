document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const messageBox = document.getElementById('response-message');
    const proposalScreen = document.getElementById('proposal-screen');
    const successScreen = document.getElementById('success-screen');

    // Funny messages array
    const messages = [
        "Hey! That’s not happening 😌",
        "I KNOW you love me 😏",
        "Nice try 😆",
        "Your finger slipped, didn't it? 👀",
        "You really wanna say no to this face? 🥺",
        "Stop playing hard to get 😤",
        "The universe won't allow that ❌",
        "Be serious pls 😭",
        "Just press YES already 💖",
        "Okay now you're just teasing 😈"
    ];

    let messageIndex = 0;

    // --- NO BUTTON LOGIC ---

    const moveButton = () => {
        // Get button dimensions
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate max positions based on the WINDOW size
        const maxLeft = window.innerWidth - btnRect.width - 20; 
        const maxTop = window.innerHeight - btnRect.height - 20;

        // Generate Random Position
        // Math.max(0, ...) ensures it never goes into negative space (off-screen top/left)
        const randomLeft = Math.max(0, Math.floor(Math.random() * maxLeft));
        const randomTop = Math.max(0, Math.floor(Math.random() * maxTop));

        // --- THE FIX ---
        // 1. Use FIXED so coordinates apply to the whole screen
        noBtn.style.position = 'fixed'; 
        
        // 2. Apply new coordinates
        noBtn.style.left = randomLeft + 'px';
        noBtn.style.top = randomTop + 'px';

        // 3. Clear the 'right' property so it doesn't stretch
        noBtn.style.right = 'auto'; 
        
        // 4. Force it to sit on top of everything
        noBtn.style.zIndex = '9999';

        // Add a slight rotation for chaos
        const randomRot = Math.floor(Math.random() * 20) - 10;
        noBtn.style.transform = `rotate(${randomRot}deg)`;

        // --- MESSAGE ANIMATION UPDATE ---
        // Fade out/in logic
        messageBox.style.opacity = 0; 
        messageBox.style.transform = 'scale(0.8)'; // Shrink slightly

        setTimeout(() => {
            messageBox.innerText = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;
            
            // Fade in and Pop up
            messageBox.style.opacity = 1;
            messageBox.style.transform = 'scale(1.1)'; // Pop slightly bigger
            setTimeout(() => {
                 messageBox.style.transform = 'scale(1)'; // Settle back to normal
            }, 100);

        }, 200);
    };

    // Trigger movement on Hover (Desktop) and Touch (Mobile)
    noBtn.addEventListener('mouseenter', moveButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent actual click
        moveButton();
    });

    // --- YES BUTTON LOGIC ---

    // --- YES BUTTON LOGIC ---

   // --- YES BUTTON LOGIC ---

    yesBtn.addEventListener('click', () => {
        
        // 1. STOP Background Music (if it's playing)
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0; // Reset track to start
        }

        // 2. PLAY Success Music
        const successMusic = document.getElementById('celebration-music');
        if (successMusic) {
            successMusic.volume = 0.6; // Adjust volume as needed
            successMusic.play().catch(error => console.log("Music play failed:", error));
        }

        // 3. UI Updates (Hide Question, Show Success)
        proposalScreen.style.display = 'none';
        successScreen.classList.remove('hidden');

        // 4. Trigger Confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFC0CB', '#FFD6E8', '#E6CCFF', '#FF0000']
        });

        // 5. Heartbeat Loop
        setInterval(() => {
             confetti({
                particleCount: 20,
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: ['#FFC0CB', '#d6336c']
            });
        }, 2000);
    });
});