document.getElementById('magicButton').addEventListener('click', () => {
    const magicEffect = document.getElementById('magicEffect');
    magicEffect.innerHTML = ''; // Clear previous effects

    // Create a random number of particles
    const numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        magicEffect.appendChild(particle);

        // Remove the particle after animation ends
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
});
STY