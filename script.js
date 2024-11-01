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

class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'matrix-canvas';
        document.querySelector('.container').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        
        this.initDrops();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.initDrops();
    }

    initDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0F0';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the Matrix rain effect when the page loads
window.addEventListener('load', () => {
    new MatrixRain();
}); 