document.addEventListener('DOMContentLoaded', () => {
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Add hover effect to container
    const container = document.querySelector('.container');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        container.style.transform = `
            translate(${x * 20}px, ${y * 20}px)
            rotateX(${y * 10}deg)
            rotateY(${x * 10}deg)
        `;
    });

    // Reset transform on mobile devices
    if (window.innerWidth <= 768) {
        container.style.transform = 'none';
    }
}); 