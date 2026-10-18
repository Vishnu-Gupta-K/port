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
    document.querySelectorAll('header a[href^="#"], footer a[href^="#"], .hero-cta a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;
            
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } catch (err) {
                // If not a valid CSS selector, leave default browser behavior
            }
        });
    });

    // Terminal Animation (scoped strictly to the interactive terminal in about section)
    const aboutTerminal = document.querySelector('.terminal:not(.modal-terminal)');
    if (aboutTerminal) {
        const terminalLines = aboutTerminal.querySelectorAll('.terminal-body .line');
        const commands = aboutTerminal.querySelectorAll('.command:not(.blink)');
        const outputs = aboutTerminal.querySelectorAll('.output');
        
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
                if (terminalLines[currentLine * 2]) {
                    terminalLines[currentLine * 2].style.display = 'block';
                }
                
                simulateTyping(command, commandText, 0, () => {
                    setTimeout(() => {
                        if (output && terminalLines[currentLine * 2 + 1]) {
                            terminalLines[currentLine * 2 + 1].style.display = 'block';
                        }
                        
                        currentLine++;
                        
                        if (currentLine < commands.length) {
                            setTimeout(processNextLine, 500);
                        } else {
                            // Show the last line with blinking cursor
                            setTimeout(() => {
                                if (terminalLines[terminalLines.length - 1]) {
                                    terminalLines[terminalLines.length - 1].style.display = 'block';
                                }
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
        
        terminalObserver.observe(aboutTerminal);
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

    // Form Submission & Contact Modal Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const contactModal = document.getElementById('contactModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCloseDot = document.getElementById('modalCloseDot');
    const openGmailBtn = document.getElementById('openGmailBtn');
    const retryMailtoBtn = document.getElementById('retryMailtoBtn');
    const copyMessageBtn = document.getElementById('copyMessageBtn');
    const copyBtnText = document.getElementById('copyBtnText');

    function openModal() {
        if (contactModal) {
            contactModal.classList.add('active');
            contactModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (contactModal) {
            contactModal.classList.remove('active');
            contactModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCloseDot) modalCloseDot.addEventListener('click', closeModal);

    if (openGmailBtn) {
        openGmailBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const url = this.getAttribute('href');
            if (url && url.startsWith('http')) {
                window.open(url, '_blank', 'noopener,noreferrer');
                e.preventDefault();
            }
        });
    }

    if (retryMailtoBtn) {
        retryMailtoBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const mailto = this.getAttribute('href');
            if (mailto && mailto.startsWith('mailto:')) {
                window.location.href = mailto;
                e.preventDefault();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
            closeModal();
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Validation
            if (!name || !email || !subject || !message) {
                if (formStatus) {
                    formStatus.className = 'form-status error';
                    formStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please fill in all fields before sending.';
                    formStatus.style.display = 'block';
                }
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (formStatus) {
                    formStatus.className = 'form-status error';
                    formStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter a valid email address.';
                    formStatus.style.display = 'block';
                }
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonHtml = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i>Opening Email...';

            // Construct email data
            const recipient = 'vishnuguptakarapakulaa@gmail.com';
            const emailSubject = `[Portfolio] ${subject} - ${name}`;
            const emailBody = `Hi Vishnu,\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\n---\nSent via portfolio contact form`;

            const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            // Configure modal buttons
            if (openGmailBtn) openGmailBtn.href = gmailUrl;
            if (retryMailtoBtn) retryMailtoBtn.href = mailtoUrl;

            if (copyMessageBtn) {
                copyMessageBtn.onclick = () => {
                    const textToCopy = `To: ${recipient}\nSubject: ${emailSubject}\n\n${emailBody}`;
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        if (copyBtnText) copyBtnText.textContent = 'Copied to Clipboard! ✓';
                        copyMessageBtn.style.borderColor = 'var(--primary-color)';
                        setTimeout(() => {
                            if (copyBtnText) copyBtnText.textContent = 'Copy Email & Message';
                            copyMessageBtn.style.borderColor = '';
                        }, 2500);
                    }).catch(() => {
                        if (copyBtnText) copyBtnText.textContent = 'Copy failed, please copy manually';
                    });
                };
            }

            // Launch mailto link via hidden anchor
            const mailLink = document.createElement('a');
            mailLink.href = mailtoUrl;
            mailLink.style.display = 'none';
            document.body.appendChild(mailLink);
            mailLink.click();
            setTimeout(() => {
                if (document.body.contains(mailLink)) {
                    document.body.removeChild(mailLink);
                }
            }, 300);

            // Display modal and inline notice
            setTimeout(() => {
                openModal();
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Mail app launched! You can also email directly to <a href="mailto:' + recipient + '" class="direct-email-link">' + recipient + '</a>.';
                    formStatus.style.display = 'block';
                }
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonHtml;
            }, 600);
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