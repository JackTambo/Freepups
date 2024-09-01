document.addEventListener('DOMContentLoaded', () => {
    // Initial values
    let playerHealth = 160; // Increased initial player health
    let bossHealth = 120; // Increased initial boss health
    let attackPower = 8;  // Reduced attack power of the player
    let bossAttackPower = 10; // Increased attack power of the boss
    let bossDefeats = 0; // Counter for the number of times the boss has been defeated
    const totalDefeatsRequired = 3; // Number of defeats required for victory

    // Get elements
    const playerHealthBar = document.getElementById('playerHealth');
    const bossHealthBar = document.getElementById('health');
    const status = document.getElementById('status');
    const attackButton = document.getElementById('attackButton');
    const boss = document.getElementById('boss');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Set initial health bar widths
    playerHealthBar.style.width = `${playerHealth}%`;
    bossHealthBar.style.width = `${bossHealth}%`;

    // Play background music on loop
    backgroundMusic.play();
    backgroundMusic.loop = true; // Ensure it loops in JavaScript too

    // Function to update the status text
    function updateStatus() {
        const defeatsLeft = totalDefeatsRequired - bossDefeats;
        status.textContent = `Boss Health: ${bossHealth}% | Player Health: ${playerHealth}% | Defeats Left: ${defeatsLeft}`;
    }

    // Function to handle the attack
    function attackBoss() {
        if (playerHealth <= 0) return; // Prevent attack if player is defeated

        // Apply vibration effect
        boss.classList.add('vibrate');
        setTimeout(() => boss.classList.remove('vibrate'), 200); // Remove the vibration effect after 200ms

        // Calculate new health values
        bossHealth -= attackPower;
        if (bossHealth < 0) bossHealth = 0; // Ensure health doesn't go below 0
        playerHealth -= bossAttackPower; // Boss attack power

        // Update health bars
        bossHealthBar.style.width = `${bossHealth}%`;
        playerHealthBar.style.width = `${playerHealth}%`;

        // Update status
        updateStatus();

        // Check for win or loss conditions
        if (bossHealth <= 0) {
            // Boss defeated
            bossDefeats++;
            boss.classList.add('explode');
            setTimeout(() => {
                if (bossDefeats >= totalDefeatsRequired) {
                    window.location.href = 'https://freepups.net/index.html'; // Redirect after 3 defeats
                } else {
                    // Reset boss and player health for the next round
                    bossHealth = 120; // Reset boss health to full
                    playerHealth = 160; // Reset player health to full
                    bossHealthBar.style.width = `${bossHealth}%`;
                    playerHealthBar.style.width = `${playerHealth}%`;
                    boss.classList.remove('explode'); // Remove explode effect for next round
                    updateStatus();
                }
            }, 1000); // Delay to show explosion animation
        } else if (playerHealth <= 0) {
            // Player defeated
            boss.classList.add('shake');
            setTimeout(() => {
                location.reload(); // Restart the game on player defeat
            }, 500); // Delay to show shake animation
        }
    }

    // Add event listener for the attack button
    attackButton.addEventListener('click', attackBoss);

    // Boss attacks every 1.5 seconds (more frequently)
    setInterval(() => {
        if (playerHealth > 0 && bossHealth > 0) {
            playerHealth -= bossAttackPower; // Boss attack power
            if (playerHealth < 0) playerHealth = 0; // Ensure health doesn't go below 0
            playerHealthBar.style.width = `${playerHealth}%`;
            updateStatus();
        }
    }, 1500);
});
