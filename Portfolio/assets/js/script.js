document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    const preloader = document.querySelector(".preloader")
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("hidden")
      }, 500)
    })
  
    // Theme Switcher
    const themeSwitch = document.getElementById("themeSwitch")
    const body = document.body
  
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      body.classList.remove("dark-mode", "light-mode")
      body.classList.add(savedTheme)
      themeSwitch.checked = savedTheme === "light-mode"
    }
  
    // Toggle theme on switch change
    themeSwitch.addEventListener("change", () => {
      if (themeSwitch.checked) {
        body.classList.remove("dark-mode")
        body.classList.add("light-mode")
        localStorage.setItem("theme", "light-mode")
      } else {
        body.classList.remove("light-mode")
        body.classList.add("dark-mode")
        localStorage.setItem("theme", "dark-mode")
      }
    })
  
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mobileMenu = document.querySelector(".mobile-menu")
  
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active")
      mobileMenu.classList.toggle("active")
    })
  
    // Close mobile menu when clicking a link
    document.querySelectorAll(".mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        mobileMenu.classList.remove("active")
      })
    })
  
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Particle Animation
    const canvas = document.getElementById("particleCanvas")
    if (canvas) {
      const ctx = canvas.getContext("2d")
  
      // Set canvas size
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
  
      // Particle array
      const particles = []
      const text = "Fahmi"
  
      // Colors for particles (purple shades)
      const colors = ["#A855F7", "#8A44D5", "#D8B4FE"]
  
      // Mouse position for interactivity
      const mouse = { x: null, y: null }
      let isHovering = false
  
      // Create particles based on text
      function createParticlesFromText() {
        ctx.font = "80px Poppins, sans-serif"
        ctx.fillStyle = "#FFF"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
  
        // Clear the canvas after getting the text data
        ctx.clearRect(0, 0, canvas.width, canvas.height)
  
        // Create particles at text positions
        for (let y = 0; y < canvas.height; y += 3) {
          // Increased spacing for fewer particles
          for (let x = 0; x < canvas.width; x += 3) {
            const index = (y * canvas.width + x) * 4
            if (data[index + 3] > 128) {
              // If pixel is part of the text (alpha > 128)
              particles.push({
                x: x,
                y: y,
                homeX: x,
                homeY: y,
                vx: 0,
                vy: 0,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 1.5 + 0.5, // Smaller particles for minimal look
              })
            }
          }
        }
      }
  
      // Particle animation
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
  
        particles.forEach((p) => {
          // Apply forces
          if (isHovering && mouse.x && mouse.y) {
            // Scatter particles when hovering
            const dx = mouse.x - p.x
            const dy = mouse.y - p.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 50) {
              const force = (50 - distance) / 50
              p.vx -= force * dx * 0.08
              p.vy -= force * dy * 0.08
            }
          } else {
            // Return to home position
            const dx = p.homeX - p.x
            const dy = p.homeY - p.y
            p.vx += dx * 0.05
            p.vy += dy * 0.05
          }
  
          // Damping
          p.vx *= 0.92
          p.vy *= 0.92
  
          // Update position
          p.x += p.vx
          p.y += p.vy
  
          // Draw particle
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        })
  
        requestAnimationFrame(animateParticles)
      }
  
      // Initialize particles
      createParticlesFromText()
      animateParticles()
  
      // Mouse interaction
      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = e.clientX - rect.left
        mouse.y = e.clientY - rect.top
        isHovering = true
      })
  
      canvas.addEventListener("mouseout", () => {
        isHovering = false
        mouse.x = null
        mouse.y = null
      })
  
      // Handle window resize
      window.addEventListener("resize", () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        particles.length = 0 // Clear particles
        createParticlesFromText() // Recreate particles
      })
    }
  
    // Scroll reveal animations
    function revealOnScroll() {
      const reveals = document.querySelectorAll(".reveal-fade, .reveal-left, .reveal-right")
  
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150
  
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active")
        }
      })
  
      // Animate skill bars when they come into view
      const skillBars = document.querySelectorAll(".skill-progress")
      skillBars.forEach((bar) => {
        const windowHeight = window.innerHeight
        const elementTop = bar.getBoundingClientRect().top
        const elementVisible = 150
  
        if (elementTop < windowHeight - elementVisible) {
          const width = bar.style.width
          bar.style.width = "0"
          setTimeout(() => {
            bar.style.width = width
          }, 100)
        }
      })
    }
  
    // Run reveal on scroll initially and on scroll
    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll()
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for navbar height
            behavior: "smooth",
          })
        }
      })
    })
  
    // Form submission with basic validation
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value
  
        if (!name || !email || !message) {
          alert("Please fill in all fields")
          return
        }
  
        // For a beginner PHP implementation, the form would submit to contact.php
        alert("Thank you for your message! I will get back to you soon.")
        contactForm.reset()
      })
    }
  
    // Project filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    if (filterBtns.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Remove active class from all buttons
          filterBtns.forEach((b) => b.classList.remove("active"))
  
          // Add active class to clicked button
          btn.classList.add("active")
  
          const category = btn.getAttribute("data-category")
  
          // Filter projects
          projectCards.forEach((card) => {
            if (category === "all") {
              card.style.display = "block"
            } else {
              if (card.getAttribute("data-category") === category) {
                card.style.display = "block"
              } else {
                card.style.display = "none"
              }
            }
          })
        })
      })
    }
  
    // Achievements horizontal scroll
    const achievementsContainer = document.querySelector(".achievements-container")
    const scrollDots = document.querySelectorAll(".scroll-dot")
  
    if (scrollDots.length > 0 && achievementsContainer) {
      scrollDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          // Remove active class from all dots
          scrollDots.forEach((d) => d.classList.remove("active"))
  
          // Add active class to clicked dot
          dot.classList.add("active")
  
          // Calculate scroll position
          const cardWidth = document.querySelector(".achievement-card").offsetWidth + 30 // card width + gap
          const scrollPosition = index * cardWidth
  
          // Scroll to position
          achievementsContainer.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          })
        })
      })
  
      // Update active dot on scroll
      achievementsContainer.addEventListener("scroll", () => {
        const scrollPosition = achievementsContainer.scrollLeft
        const cardWidth = document.querySelector(".achievement-card").offsetWidth + 30
        const activeIndex = Math.round(scrollPosition / cardWidth)
  
        scrollDots.forEach((dot, index) => {
          if (index === activeIndex) {
            dot.classList.add("active")
          } else {
            dot.classList.remove("active")
          }
        })
      })
    }
  
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-links a")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  })
  
  // Remove all carousel-related code 

  document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all achievement cards
    document.querySelectorAll('.achievement-card').forEach(card => {
        observer.observe(card);
    });

    // Observe stats section
    observer.observe(document.querySelector('.achievement-stats'));

    // Counter animation for stats
    function animateCounter() {
        const statsSection = document.querySelector('.achievement-stats');
        if (statsSection.classList.contains('show')) {
            document.querySelectorAll('.stat-item').forEach(item => {
                const target = parseInt(item.getAttribute('data-count'));
                const statNumber = item.querySelector('.stat-number');
                const current = parseInt(statNumber.innerText);
                
                // Calculate increment based on target value
                const increment = target > 100 ? Math.ceil(target / 100) : 1;
                
                if (current < target) {
                    statNumber.innerText = Math.min(current + increment, target);
                    setTimeout(animateCounter, 20);
                }
            });
        }
    }

    // Start counter animation when stats are visible
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(animateCounter, 500);
        }
    }, { threshold: 0.5 });
    
    statsObserver.observe(document.querySelector('.achievement-stats'));

    // Hover effect for achievement cards
    document.querySelectorAll('.achievement-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Parallax effect for background
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.querySelector('.achievements-section').style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // SVG Gradient for stat circles
  const svgNS = "http://www.w3.org/2000/svg";
  const defs = document.createElementNS(svgNS, "defs");
  const gradient = document.createElementNS(svgNS, "linearGradient");
  gradient.setAttribute("id", "gradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "0%");
  
  const stop1 = document.createElementNS(svgNS, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#a855f7");
  
  const stop2 = document.createElementNS(svgNS, "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#f472b6");
  
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  
  document.querySelectorAll('.stat-circle').forEach(circle => {
    circle.appendChild(defs.cloneNode(true));
  });
  
  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('achievement-card')) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        } else if (entry.target.classList.contains('achievements-stats')) {
          animateStats();
        }
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Apply initial styles for animation
  document.querySelectorAll('.achievement-card').forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Observe stats section
  observer.observe(document.querySelector('.achievements-stats'));
  
  // Animate stat circles and numbers
  function animateStats() {
    document.querySelectorAll('.stat-item').forEach(item => {
      const count = parseInt(item.getAttribute('data-count'));
      const circle = item.querySelector('.stat-circle-progress');
      const number = item.querySelector('.stat-number');
      
      // Calculate circle circumference and offset
      const radius = circle.getAttribute('r');
      const circumference = 2 * Math.PI * radius;
      
      // Set the circle's stroke-dasharray to the circumference
      circle.style.strokeDasharray = circumference;
      
      // Calculate percentage for the circle
      let percentage;
      if (count >= 1000) {
        // For year stats, show full circle
        percentage = 100;
      } else {
        // For other stats, calculate percentage based on a max value
        const maxValue = 10; // Adjust this based on your expected max values
        percentage = Math.min((count / maxValue) * 100, 100);
      }
      
      // Calculate the dash offset
      const dashOffset = circumference - (percentage / 100) * circumference;
      
      // Animate the circle
      setTimeout(() => {
        circle.style.strokeDashoffset = dashOffset;
      }, 100);
      
      // Animate the number
      animateNumber(number, count);
    });
  }
  
  // Animate counter
  function animateNumber(element, target) {
    let current = 0;
    const increment = target > 100 ? Math.ceil(target / 100) : 1;
    const duration = 2000; // 2 seconds
    const steps = Math.ceil(duration / 16); // 60fps
    const step = Math.max(1, Math.floor(target / steps));
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = current;
      }
    }, 16);
  }
  
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const achievementCards = document.querySelectorAll('.achievement-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filter = button.getAttribute('data-filter');
      
      // Filter cards
      achievementCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = 0;
          card.style.transform = 'translateY(50px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 600);
        }
      });
    });
  });
  
  // 3D tilt effect for cards
  document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      // Calculate rotation values (limited to a small range)
      const rotateY = mouseX * 0.01; // Max ±10 degrees
      const rotateX = -mouseY * 0.01; // Max ±10 degrees
      
      // Apply the rotation
      card.querySelector('.card-content').style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset the rotation when mouse leaves
      card.querySelector('.card-content').style.transform = 'perspective(1500px) rotateX(0) rotateY(0)';
    });
  });
  
  // Parallax effect for background
  document.addEventListener('mousemove', e => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.achievements-bg').style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// Animate skills section on scroll
function animateSkillsSection() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const cards = skillsSection.querySelectorAll('.skills-category-card');
  const badges = skillsSection.querySelectorAll('.skill-badge');
  const windowHeight = window.innerHeight;
  const sectionTop = skillsSection.getBoundingClientRect().top;
  if (sectionTop < windowHeight - 100) {
    // Animate cards
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add('show'), i * 120);
    });
    // Animate badges with stagger
    let badgeDelay = 0;
    cards.forEach((card) => {
      const cardBadges = card.querySelectorAll('.skill-badge');
      cardBadges.forEach((badge, j) => {
        setTimeout(() => badge.classList.add('show'), badgeDelay + j * 70);
      });
      badgeDelay += cardBadges.length * 70 + 100;
    });
    // Remove scroll listener after animation
    window.removeEventListener('scroll', animateSkillsSection);
  }
}
window.addEventListener('scroll', animateSkillsSection);
animateSkillsSection();