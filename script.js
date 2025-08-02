
// Handle form submission
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('questionForm');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Add loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(form);
        const urlEncoded = new URLSearchParams(formData).toString();

        const response = await fetch('https://script.google.com/macros/s/AKfycby0GjGcP4ax48nW4JLWgyZgtPEW7H_lSJVJgCkWx_is2qcaY1TyEg4l8OdDutRWR79pwA/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: urlEncoded
        });

        const result = await response.text();

        if (result === "Success") {
          // Success animation
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          submitBtn.style.background = '#28a745';
          
          setTimeout(() => {
            alert("Thank you for your message! We'll get back to you soon.");
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 1500);
        } else {
          throw new Error(result);
        }
      } catch (error) {
        console.error('Submission error:', error);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        submitBtn.style.background = '#dc3545';
        
        setTimeout(() => {
          alert("Sorry, something went wrong. Please try again later.");
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 2000);
      }
    });
  }
});

// Enhanced smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Enhanced sticky header with scroll effects
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (header) {
    const scrolled = window.scrollY > 50;
    header.classList.toggle('scrolled', scrolled);
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero && window.scrollY < hero.offsetHeight) {
      const scrollPercent = window.scrollY / hero.offsetHeight;
      hero.style.transform = `translateY(${scrollPercent * 50}px)`;
    }
  }
});

// Enhanced mobile menu with smooth animations
document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.mobile-nav a');

  function closeMenu() {
    if (mobileNav && menuBtn) {
      mobileNav.classList.remove('active');
      menuBtn.classList.remove('active');
      document.body.style.overflow = '';
      
      setTimeout(() => {
        mobileNav.style.display = 'none';
      }, 400);
    }
  }

  function openMenu() {
    if (mobileNav && menuBtn) {
      mobileNav.style.display = 'flex';
      
      // Trigger reflow to ensure display change is processed
      mobileNav.offsetHeight;
      
      mobileNav.classList.add('active');
      menuBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function toggleMenu() {
    if (mobileNav && mobileNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('header') && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    });
  }
});

// Enhanced project carousel with touch support
document.addEventListener('DOMContentLoaded', function() {
  const projectScroller = document.querySelector('.project-scroller');
  const leftBtn = document.querySelector('.scroll-btn.left');
  const rightBtn = document.querySelector('.scroll-btn.right');

  if (projectScroller && leftBtn && rightBtn) {
    const scrollAmount = 350;
    let isScrolling = false;

    function updateButtonVisibility() {
      const isAtStart = projectScroller.scrollLeft <= 10;
      const isAtEnd = projectScroller.scrollLeft >= 
        (projectScroller.scrollWidth - projectScroller.clientWidth - 10);
      
      leftBtn.style.display = isAtStart ? 'none' : 'flex';
      rightBtn.style.display = isAtEnd ? 'none' : 'flex';
    }

    function smoothScroll(direction) {
      if (isScrolling) return;
      isScrolling = true;

      const targetScroll = direction === 'left' 
        ? projectScroller.scrollLeft - scrollAmount
        : projectScroller.scrollLeft + scrollAmount;

      projectScroller.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrolling = false;
        updateButtonVisibility();
      }, 300);
    }

    leftBtn.addEventListener('click', () => smoothScroll('left'));
    rightBtn.addEventListener('click', () => smoothScroll('right'));

    // Touch support for mobile
    let startX = 0;
    let scrollStart = 0;

    projectScroller.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      scrollStart = projectScroller.scrollLeft;
    });

    projectScroller.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      projectScroller.scrollLeft = scrollStart + diffX;
    });

    projectScroller.addEventListener('touchend', updateButtonVisibility);
    projectScroller.addEventListener('scroll', updateButtonVisibility);

    // Initial button state
    updateButtonVisibility();
  }
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animate-in');
        
        // Stagger animation for cards
        if (entry.target.classList.contains('about-card') || 
            entry.target.classList.contains('certification-tab') ||
            entry.target.classList.contains('project-card')) {
          const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
          entry.target.style.transitionDelay = `${delay}ms`;
        }
        
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(`
    .about-card, 
    .certification-tab, 
    .project-card, 
    .timeline-content,
    .contact .card
  `);

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Enhanced gallery modal (if exists on project pages)
document.addEventListener('DOMContentLoaded', function() {
  const workSamples = document.querySelectorAll('.work-sample');
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal-image');
  const closeBtn = document.querySelector('.close');

  if (workSamples.length > 0 && modal && modalImg && closeBtn) {
    let currentImageIndex = 0;
    const images = Array.from(workSamples).map(sample => sample.querySelector('img'));

    function openModal(index) {
      currentImageIndex = index;
      modal.style.display = 'block';
      modalImg.src = images[index].src;
      modalImg.alt = images[index].alt;
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      modalImg.src = images[currentImageIndex].src;
    }

    function prevImage() {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      modalImg.src = images[currentImageIndex].src;
    }

    // Event listeners
    workSamples.forEach((sample, index) => {
      sample.addEventListener('click', () => openModal(index));
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (modal.style.display === 'block') {
        switch(e.key) {
          case 'Escape':
            closeModal();
            break;
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
        }
      }
    });

    // Arrow buttons if they exist
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
  }
});

// Add loading animation for images and scroll progress
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      img.classList.add('loading');
      
      img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.classList.remove('loading');
      });
      
      img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.classList.remove('loading');
      });
    }
  });

  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = Math.min(scrolled, 100) + '%';
  });
});

// Performance optimization: Lazy loading for non-critical images
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
});
