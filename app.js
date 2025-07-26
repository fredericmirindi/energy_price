// Energy Price Forecasting App JavaScript

// Data from the provided JSON
const appData = {
  statistics: {
    accuracy: "94.8",
    prediction_horizon: "24",
    data_points: "2",
    markets_covered: "15"
  },
  chartData: {
    predicted: [45, 48, 52, 58, 65, 72, 78, 75, 70, 62, 55, 50, 48, 47, 49, 53, 60, 68, 74, 77, 73, 66, 58, 51],
    actual: [44, 47, 53, 57, 64, 71, 79, 74, 69, 63, 54, 49, 47, 48, 50, 54, 59, 67, 75, 76, 72, 65, 57, 50],
    hours: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
  }
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupScrollAnimations();
  setupSmoothScrolling();
  setupStatisticsCounter();
  setupPriceChart();
  setupParticleAnimation();
  setupNavbarScrollEffect();
  setupInteractiveElements();
  setupCTAButtons();
  setupNewsletterForm();
}

// Fixed smooth scrolling for navigation links
function setupSmoothScrolling() {
  // Handle all navigation links including footer links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Setup CTA button functionality
function setupCTAButtons() {
  const viewDemoBtn = document.querySelector('.hero-actions .btn--primary');
  const technicalDetailsBtn = document.querySelector('.hero-actions .btn--outline');
  const getStartedBtn = document.querySelector('.nav-links .btn--primary');
  
  if (viewDemoBtn) {
    viewDemoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const dashboardSection = document.querySelector('#dashboard');
      if (dashboardSection) {
        const offsetTop = dashboardSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }
  
  if (technicalDetailsBtn) {
    technicalDetailsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const technicalSection = document.querySelector('.technical');
      if (technicalSection) {
        const offsetTop = technicalSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }
  
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const featuresSection = document.querySelector('#features');
      if (featuresSection) {
        const offsetTop = featuresSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }
}

// Enhanced interactive elements with proper hover effects
function setupInteractiveElements() {
  // Feature cards hover effects
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.02)';
      this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      this.style.zIndex = '10';
      this.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.zIndex = '1';
      this.style.boxShadow = '';
    });
  });
  
  // Algorithm cards interactions
  const algorithmCards = document.querySelectorAll('.algorithm-card');
  algorithmCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('click', function() {
      algorithmCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Result cards hover effects
  const resultCards = document.querySelectorAll('.result-card');
  resultCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.05)';
      this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      this.style.boxShadow = '0 25px 50px rgba(16, 185, 129, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '';
    });
  });
}

// Fixed newsletter form with proper feedback
function setupNewsletterForm() {
  const newsletterDiv = document.querySelector('.newsletter');
  if (newsletterDiv) {
    const emailInput = newsletterDiv.querySelector('input[type="email"]');
    const submitBtn = newsletterDiv.querySelector('.btn');
    
    if (submitBtn) {
      submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
          // Show success state
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Subscribed!';
          submitBtn.style.background = '#10B981';
          submitBtn.disabled = true;
          emailInput.value = '';
          emailInput.style.borderColor = '#10B981';
          
          // Reset after 3 seconds
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            emailInput.style.borderColor = '';
          }, 3000);
        } else {
          // Show error state
          emailInput.style.borderColor = '#ef4444';
          emailInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
          emailInput.placeholder = 'Please enter a valid email';
          
          setTimeout(() => {
            emailInput.style.borderColor = '';
            emailInput.style.boxShadow = '';
            emailInput.placeholder = 'Enter your email';
          }, 3000);
        }
      });
    }
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Animated statistics counter
function setupStatisticsCounter() {
  const statValues = document.querySelectorAll('.stat-value');
  let hasAnimated = false;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });
  
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    observer.observe(heroStats);
  }
  
  function animateCounters() {
    statValues.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        // Format the display value
        if (target >= 1000000) {
          stat.textContent = (current / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
          stat.textContent = (current / 1000).toFixed(1) + 'K';
        } else {
          stat.textContent = current.toFixed(1);
        }
      }, 20);
    });
  }
}

// Chart.js Price Prediction Chart
function setupPriceChart() {
  const chartCanvas = document.getElementById('priceChart');
  if (!chartCanvas) return;
  
  const ctx = chartCanvas.getContext('2d');
  
  // Create gradient for predicted line
  const predictedGradient = ctx.createLinearGradient(0, 0, 0, 300);
  predictedGradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
  predictedGradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
  
  // Create gradient for actual line
  const actualGradient = ctx.createLinearGradient(0, 0, 0, 300);
  actualGradient.addColorStop(0, 'rgba(52, 211, 153, 0.3)');
  actualGradient.addColorStop(1, 'rgba(52, 211, 153, 0.05)');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: appData.chartData.hours,
      datasets: [
        {
          label: 'Predicted Price',
          data: appData.chartData.predicted,
          borderColor: '#10B981',
          backgroundColor: predictedGradient,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#10B981',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Actual Price',
          data: appData.chartData.actual,
          borderColor: '#34D399',
          backgroundColor: actualGradient,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#34D399',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#f5f5f5',
            font: {
              family: 'Inter',
              size: 12
            },
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: '#10B981',
          bodyColor: '#f5f5f5',
          borderColor: '#10B981',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': €' + context.parsed.y.toFixed(2) + '/MWh';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#9ca3af',
            font: {
              family: 'Inter',
              size: 11
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#9ca3af',
            font: {
              family: 'Inter',
              size: 11
            },
            callback: function(value) {
              return '€' + value;
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    }
  });
}

// Enhanced particle animation
function setupParticleAnimation() {
  const particlesContainer = document.querySelector('.energy-particles');
  if (!particlesContainer) return;
  
  // Create floating particles
  for (let i = 0; i < 50; i++) {
    createParticle(particlesContainer, i);
  }
}

function createParticle(container, index) {
  const particle = document.createElement('div');
  particle.className = 'floating-particle';
  
  // Random properties
  const size = Math.random() * 4 + 1;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;
  
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, transparent 70%);
    border-radius: 50%;
    left: ${x}%;
    top: ${y}%;
    animation: floatParticle ${duration}s ${delay}s infinite ease-in-out;
    z-index: 1;
  `;
  
  container.appendChild(particle);
}

// Scroll-triggered animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Add fade-in class to elements that should animate
  const animatedElements = document.querySelectorAll(`
    .feature-card,
    .algorithm-card,
    .timeline-item,
    .result-card,
    .section-header,
    .dashboard-container,
    .tech-content > *
  `);
  
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// Navbar scroll effect
function setupNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.9)';
      navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 300) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
}

// Enhanced button interactions with ripple effects
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      if (this.classList.contains('btn--primary')) {
        this.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
      }
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
    
    btn.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes floatParticle {
    0%, 100% {
      transform: translateY(0px) translateX(0px) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-20px) translateX(10px) scale(1.1);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-40px) translateX(-5px) scale(0.9);
      opacity: 0.5;
    }
    75% {
      transform: translateY(-20px) translateX(-10px) scale(1.05);
      opacity: 0.7;
    }
  }
  
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .algorithm-card.active {
    border-color: #10B981 !important;
    background: rgba(16, 185, 129, 0.1) !important;
    transform: scale(1.02);
  }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c⚡ Energy Price Forecasting with AI', 'color: #10B981; font-size: 24px; font-weight: bold;');
console.log('%cAdvanced ML algorithms for electricity market predictions', 'color: #34D399; font-size: 14px;');
console.log('%cBuilt with modern web technologies and Chart.js', 'color: #9ca3af; font-size: 12px;');