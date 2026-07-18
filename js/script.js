// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // Typewriter effect
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const textArray = ['AI & ML Specialist', 'Linux Fundamentals', 'Python Developer'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Terminal Animation
    const terminalLines = document.querySelectorAll('.terminal-body .line');
    const commands = document.querySelectorAll('.command:not(.blink)');
    const outputs = document.querySelectorAll('.output');
    
    // Hide all lines initially except the first one
    for (let i = 1; i < terminalLines.length; i++) {
        terminalLines[i].style.display = 'none';
    }
    
    // Function to simulate typing
    function simulateTyping(element, text, index, callback) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => {
                simulateTyping(element, text, index + 1, callback);
            }, Math.random() * 50 + 30);
        } else {
            callback();
        }
    }
    
    // Function to show terminal animation
    function showTerminalAnimation() {
        let currentLine = 0;
        
        function processNextLine() {
            if (currentLine >= commands.length) {
                return;
            }
            
            const command = commands[currentLine];
            const output = outputs[currentLine];
            const commandText = command.textContent;
            
            command.textContent = '';
            terminalLines[currentLine * 2].style.display = 'block';
            
            simulateTyping(command, commandText, 0, () => {
                setTimeout(() => {
                    if (output) {
                        terminalLines[currentLine * 2 + 1].style.display = 'block';
                    }
                    
                    currentLine++;
                    
                    if (currentLine < commands.length) {
                        setTimeout(processNextLine, 500);
                    } else {
                        // Show the last line with blinking cursor
                        setTimeout(() => {
                            terminalLines[terminalLines.length - 1].style.display = 'block';
                        }, 500);
                    }
                }, 300);
            });
        }
        
        processNextLine();
    }
    
    // Intersection Observer for Terminal Animation
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showTerminalAnimation();
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        terminalObserver.observe(terminal);
    }

    // Animate elements when they come into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-card, .project-card, .timeline-item, .certification-card').forEach(item => {
        animateOnScroll.observe(item);
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }

    // Matrix background effect for hero section
    function createMatrixBackground() {
        const matrixBg = document.querySelector('.matrix-bg');
        if (!matrixBg) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        matrixBg.appendChild(canvas);
        
        canvas.width = matrixBg.offsetWidth;
        canvas.height = matrixBg.offsetHeight;
        
        const characters = '01';
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(draw, 33);
    }
    
    createMatrixBackground();

    // Resize event for matrix background
    window.addEventListener('resize', () => {
        const matrixBg = document.querySelector('.matrix-bg');
        if (matrixBg) {
            const canvas = matrixBg.querySelector('canvas');
            if (canvas) {
                matrixBg.removeChild(canvas);
                createMatrixBackground();
            }
        }
    });
});