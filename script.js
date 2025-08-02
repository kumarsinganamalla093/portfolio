// Handle form submission
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('questionForm');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

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
        alert("Thank you for your message! We'll get back to you soon.");
        form.reset();
      } else {
        alert("Error: " + result);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("Sorry, something went wrong. Please try again later.");
    }
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Sticky header
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (header) {
    header.classList.toggle('sticky', window.scrollY > 0);
  }
});

// Mobile menu logic
document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  function closeMenu() {
    mobileNav.classList.remove('active');
    menuBtn.classList.remove('active');
    setTimeout(() => {
      mobileNav.style.display = 'none';
    }, 300);
  }

  function toggleMenu() {
    if (mobileNav.classList.contains('active')) {
      closeMenu();
    } else {
      mobileNav.style.display = 'flex';
      setTimeout(() => {
        mobileNav.classList.add('active');
        menuBtn.classList.add('active');
      }, 10);
    }
  }

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', toggleMenu);
    document.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.header-container') && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    });
  }
});
