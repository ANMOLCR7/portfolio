// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Typing Animation
function initTypingAnimation() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;
  
  const text = typingText.textContent;
  typingText.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Start typing after a short delay
  setTimeout(typeWriter, 500);
}

// Project Filtering
function initProjectFiltering() {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter projects
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.classList.add('fade-in-up');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Scroll to Top Button
function initScrollToTop() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'flex';
      scrollTopBtn.classList.add('fade-in-up');
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
    scrollTopBtn.blur();
  });
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.about-content, .skill-category, .project-card, .testimonial-card, .contact-content'
  );
  
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

// Skill Level Animation
function initSkillAnimations() {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level');
        entry.target.style.setProperty('--level', level + '%');
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.5 });
  
  skillLevels.forEach(level => {
    skillObserver.observe(level);
  });
}

// Form Enhancement
function initFormEnhancement() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (remove this in production)
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      submitBtn.style.background = 'var(--primary-color)';
      
      // Reset after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        form.reset();
      }, 3000);
    }, 2000);
  });
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
  const hero = document.getElementById('hero');
  const floatingIcons = document.querySelectorAll('.floating-icon');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    floatingIcons.forEach((icon, index) => {
      const speed = (index + 1) * 0.1;
      icon.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Enhanced Navigation
function initEnhancedNavigation() {
  const navLinks = document.querySelectorAll('.nav-center a');
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Loading Animation
function initLoadingAnimation() {
  const loadingElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  
  loadingElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.1}s`;
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {
  // Scroll-based animations here
}, 10);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingAnimation();
  initProjectFiltering();
  initSmoothScrolling();
  initScrollToTop();
  initScrollAnimations();
  initSkillAnimations();
  initFormEnhancement();
  initParallaxEffect();
  initEnhancedNavigation();
  initLoadingAnimation();
  
  // Event Listeners
  themeToggle.addEventListener('click', toggleTheme);
  window.addEventListener('scroll', optimizedScrollHandler);
  
  // Add some interactive effects
  document.querySelectorAll('.btn, .project-card, .testimonial-card').forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.transform = this.style.transform + ' scale(1.02)';
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.transform = this.style.transform.replace(' scale(1.02)', '');
    });
  });
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Export functions for potential external use
window.PortfolioApp = {
  toggleTheme,
  initTypingAnimation,
  initProjectFiltering
};

