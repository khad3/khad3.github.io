// ========================================
// CONFIGURATION
// ========================================

// 📧 EMAIL CONFIGURATION
// Choose one method: EmailJS OR Mailto

// METHOD 1: EmailJS (Recommended - sends to your inbox directly)
// Sign up at https://www.emailjs.com/
// After creating an account, get your keys from the dashboard
const EMAILJS_CONFIG = {
    enabled: false, // Set to true to use EmailJS
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Replace with your EmailJS public key
    serviceId: 'YOUR_SERVICE_ID', // Replace with your service ID
    templateId: 'YOUR_TEMPLATE_ID' // Replace with your template ID
};

// METHOD 2: Mailto (Opens default email client)
const MAILTO_CONFIG = {
    enabled: true, // Set to true to use mailto
    email: 'wongkhadley0@gmail.com', // Replace with your email
    subject: 'Birthday Wish from Yeobo'
};

// 📸 PHOTO CONFIGURATION
// Add your photo filenames here (they should be in the same folder as index.html)
const PHOTOS = [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg',
    'photo5.jpg',
    'photo6.jpg'
];

// ========================================
// GLOBAL VARIABLES
// ========================================
const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');
const mainContent = document.getElementById('mainContent');
const wishBtn = document.getElementById('wishBtn');
const wishModal = document.getElementById('wishModal');
const modalClose = document.getElementById('modalClose');
const wishForm = document.getElementById('wishForm');
const successMessage = document.getElementById('successMessage');
const bgMusic = document.getElementById('bgMusic');
const unmuteBtn = document.getElementById('unmuteBtn');

let animationStarted = false;
let explosionOccurred = false;

// ========================================
// CANVAS SETUP
// ========================================
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ========================================
// PARTICLE CLASS
// ========================================
class Particle {
    constructor(x, y, color, velocity, gravity = 0.05) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.gravity = gravity;
        this.friction = 0.98;
        this.size = Math.random() * 3 + 2;
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ========================================
// FIREWORK CLASS (Rising rocket)
// ========================================
class Firework {
    constructor(x, startY, targetY) {
        this.x = x;
        this.y = startY;
        this.targetY = targetY;
        this.speed = 2;
        this.trail = [];
        this.exploded = false;
    }

    update() {
        if (this.y > this.targetY) {
            this.y -= this.speed;
            this.speed += 0.1; // Accelerate
            
            // Add trail
            this.trail.push({ x: this.x, y: this.y, alpha: 1 });
            if (this.trail.length > 30) {
                this.trail.shift();
            }
        } else {
            this.exploded = true;
        }
    }

    draw() {
        // Draw trail
        this.trail.forEach((point, index) => {
            ctx.save();
            ctx.globalAlpha = point.alpha * (index / this.trail.length);
            ctx.fillStyle = '#ffd700';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ffd700';
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            point.alpha *= 0.95;
        });

        // Draw rocket
        ctx.save();
        ctx.fillStyle = '#ffd700';
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#ffd700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ========================================
// EXPLOSION EFFECT
// ========================================
function createExplosion(x, y) {
    const particles = [];
    const colors = ['#ffd700', '#ff69b4', '#ff1493', '#ffed4e', '#ff6347', '#ff00ff', '#00ffff'];
    
    // Main explosion particles
    for (let i = 0; i < 150; i++) {
        const angle = (Math.PI * 2 * i) / 150;
        const velocity = {
            x: Math.cos(angle) * (Math.random() * 8 + 4),
            y: Math.sin(angle) * (Math.random() * 8 + 4)
        };
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, velocity, 0.08));
    }

    // Sparkle particles
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        const velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };
        particles.push(new Particle(x, y, '#ffffff', velocity, 0.15));
    }

    // Secondary explosions
    setTimeout(() => {
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 * i) / 6;
            const distance = 150;
            const secX = x + Math.cos(angle) * distance;
            const secY = y + Math.sin(angle) * distance;
            
            for (let j = 0; j < 30; j++) {
                const secAngle = Math.random() * Math.PI * 2;
                const velocity = {
                    x: Math.cos(secAngle) * (Math.random() * 4 + 2),
                    y: Math.sin(secAngle) * (Math.random() * 4 + 2)
                };
                const color = colors[Math.floor(Math.random() * colors.length)];
                particles.push(new Particle(secX, secY, color, velocity, 0.1));
            }
        }
    }, 300);

    return particles;
}

// ========================================
// SCREEN FLASH EFFECT
// ========================================
function screenFlash() {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

// ========================================
// CAMERA SHAKE EFFECT
// ========================================
function cameraShake(duration = 500) {
    const startTime = Date.now();
    const originalTransform = canvas.style.transform;
    
    function shake() {
        const elapsed = Date.now() - startTime;
        if (elapsed < duration) {
            const intensity = 20 * (1 - elapsed / duration);
            const x = (Math.random() - 0.5) * intensity;
            const y = (Math.random() - 0.5) * intensity;
            canvas.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(shake);
        } else {
            canvas.style.transform = originalTransform;
        }
    }
    shake();
}

// ========================================
// MAIN FIREWORK ANIMATION
// ========================================
function startFireworkAnimation() {
    const centerX = canvas.width / 2;
    const startY = canvas.height + 50;
    const targetY = canvas.height * 0.3;
    
    const firework = new Firework(centerX, startY, targetY);
    let particles = [];
    let animationComplete = false;

    function animate() {
        // Clear with fade effect
        ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw firework
        if (!firework.exploded) {
            firework.update();
            firework.draw();
        } else if (!animationComplete) {
            // Explosion moment
            animationComplete = true;
            screenFlash();
            cameraShake(800);
            particles = createExplosion(centerX, targetY);
            explosionOccurred = true;
            
            // Trigger photo burst after 1 second
            setTimeout(() => {
                burstPhotos(centerX, targetY);
                // Fade out canvas and show main content
                setTimeout(() => {
                    canvas.style.transition = 'opacity 1s';
                    canvas.style.opacity = '0';
                    mainContent.classList.remove('hidden');
                    createFloatingHearts();
                    createSparkles();
                }, 500);
            }, 1000);
        }

        // Update and draw particles
        particles = particles.filter(particle => particle.alpha > 0);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        if (!animationComplete || particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// ========================================
// PHOTO BURST ANIMATION
// ========================================
function burstPhotos(centerX, centerY) {
    const container = document.getElementById('photosContainer');
    
    PHOTOS.forEach((photoSrc, index) => {
        const photo = document.createElement('img');
        photo.src = photoSrc;
        photo.alt = `Memory ${index + 1}`;
        photo.className = 'floating-photo';
        
        // Random burst direction
        const angle = (Math.PI * 2 * index) / PHOTOS.length + (Math.random() - 0.5);
        const distance = 200 + Math.random() * 200;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;
        
        // Ensure photos stay within viewport
        const finalX = Math.max(75, Math.min(window.innerWidth - 75, targetX));
        const finalY = Math.max(75, Math.min(window.innerHeight - 75, targetY));
        
        // Set initial position at explosion center
        photo.style.left = `${centerX}px`;
        photo.style.top = `${centerY}px`;
        photo.style.transform = 'scale(0) rotate(0deg)';
        photo.style.opacity = '0';
        
        container.appendChild(photo);
        
        // Animate to final position
        setTimeout(() => {
            photo.style.transition = `all 1s cubic-bezier(0.34, 1.56, 0.64, 1)`;
            photo.style.left = `${finalX - 75}px`;
            photo.style.top = `${finalY - 75}px`;
            photo.style.transform = `scale(1) rotate(${Math.random() * 30 - 15}deg)`;
            photo.style.opacity = '1';
            
            // Add random animation delay
            photo.style.animationDelay = `${Math.random() * 2}s`;
        }, 50);
        
        // Add parallax effect
        addParallaxToPhoto(photo);
    });
}

// ========================================
// PARALLAX EFFECT
// ========================================
function addParallaxToPhoto(photo) {
    document.addEventListener('mousemove', (e) => {
        const rect = photo.getBoundingClientRect();
        const photoX = rect.left + rect.width / 2;
        const photoY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - photoX) / 50;
        const deltaY = (e.clientY - photoY) / 50;
        
        photo.style.transform += ` translate(${deltaX}px, ${deltaY}px)`;
    });
}

// ========================================
// FLOATING HEARTS
// ========================================
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💖';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${6 + Math.random() * 4}s`;
        heart.style.fontSize = `${20 + Math.random() * 20}px`;
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 10000);
    }, 2000);
}

// ========================================
// SPARKLE PARTICLES AROUND TEXT
// ========================================
function createSparkles() {
    const container = document.getElementById('sparkleParticles');
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 3}s`;
        sparkle.style.animationDuration = `${2 + Math.random() * 2}s`;
        container.appendChild(sparkle);
    }
}

// ========================================
// BACKGROUND MUSIC
// ========================================
unmuteBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            unmuteBtn.classList.add('playing');
            unmuteBtn.querySelector('.unmute-text').textContent = 'Music playing';
        }).catch(err => {
            console.log('Audio play failed:', err);
        });
    } else {
        bgMusic.pause();
        unmuteBtn.classList.remove('playing');
        unmuteBtn.querySelector('.unmute-text').textContent = 'Tap to unmute';
    }
});

// ========================================
// MODAL FUNCTIONALITY
// ========================================
wishBtn.addEventListener('click', () => {
    wishModal.classList.remove('hidden');
});

modalClose.addEventListener('click', () => {
    wishModal.classList.add('hidden');
    successMessage.classList.add('hidden');
});

wishModal.querySelector('.modal-backdrop').addEventListener('click', () => {
    wishModal.classList.add('hidden');
    successMessage.classList.add('hidden');
});

// ========================================
// FORM SUBMISSION
// ========================================
wishForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const wishText = document.getElementById('wishText').value;
    
    if (EMAILJS_CONFIG.enabled) {
        // METHOD 1: EmailJS
        try {
            // Load EmailJS SDK
            if (!window.emailjs) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
                document.head.appendChild(script);
                await new Promise(resolve => script.onload = resolve);
            }
            
            emailjs.init(EMAILJS_CONFIG.publicKey);
            
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                {
                    wish: wishText,
                    from_name: 'Yeobo',
                    to_name: 'Birthday Person'
                }
            );
            
            showSuccessMessage();
        } catch (error) {
            console.error('EmailJS Error:', error);
            alert('Failed to send wish. Please check your EmailJS configuration.');
        }
    } else if (MAILTO_CONFIG.enabled) {
        // METHOD 2: Mailto
        const subject = encodeURIComponent(MAILTO_CONFIG.subject);
        const body = encodeURIComponent(`Birthday Wish:\n\n${wishText}`);
        window.location.href = `mailto:${MAILTO_CONFIG.email}?subject=${subject}&body=${body}`;
        
        showSuccessMessage();
    } else {
        alert('Please configure either EmailJS or Mailto in script.js');
    }
});

function showSuccessMessage() {
    wishForm.style.display = 'none';
    successMessage.classList.remove('hidden');
    
    setTimeout(() => {
        wishModal.classList.add('hidden');
        wishForm.style.display = 'block';
        successMessage.classList.add('hidden');
        document.getElementById('wishText').value = '';
    }, 3000);
}

// ========================================
// START ANIMATION ON LOAD
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        startFireworkAnimation();
    }, 500);
});

// ========================================
// ERROR HANDLING FOR MISSING PHOTOS
// ========================================
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Photo not found:', e.target.src);
        // Replace with placeholder gradient
        e.target.style.background = 'linear-gradient(135deg, #ffd700 0%, #ff69b4 100%)';
    }
}, true);
