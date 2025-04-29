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