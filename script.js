/* =====================================================
   SYEDRIFAT PORTFOLIO — SCRIPT
   Handles: icons, sticky navbar, mobile menu, active link
   highlighting, scroll-reveal animation, and contact form
   validation.
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. RENDER LUCIDE ICONS
  --------------------------------------------------- */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ---------------------------------------------------
     2. STICKY / SOLID NAVBAR ON SCROLL
  --------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ---------------------------------------------------
     3. MOBILE HAMBURGER MENU
  --------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile menu after clicking a link
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------
     4. ACTIVE NAV LINK HIGHLIGHTING (on scroll)
  --------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id], main[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const highlightActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinkEls.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  highlightActiveLink();
  window.addEventListener('scroll', highlightActiveLink, { passive: true });

  /* ---------------------------------------------------
     5. SCROLL-REVEAL ANIMATIONS
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback for very old browsers
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------
     6. CONTACT FORM VALIDATION
     (Frontend-only — see form note in the UI. No message
     is actually sent until a backend/email service is
     connected. EDIT HERE to wire up real submission.)
  --------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm) {
    const fields = {
      name: contactForm.querySelector('#name'),
      email: contactForm.querySelector('#email'),
      message: contactForm.querySelector('#message'),
    };

    const showError = (fieldName, message) => {
      const group = fields[fieldName].closest('.form-group');
      const errorEl = contactForm.querySelector(`[data-error-for="${fieldName}"]`);
      group.classList.add('has-error');
      errorEl.textContent = message;
    };

    const clearError = (fieldName) => {
      const group = fields[fieldName].closest('.form-group');
      const errorEl = contactForm.querySelector(`[data-error-for="${fieldName}"]`);
      group.classList.remove('has-error');
      errorEl.textContent = '';
    };

    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const validateForm = () => {
      let isValid = true;

      if (fields.name.value.trim().length < 2) {
        showError('name', 'Please enter your name.');
        isValid = false;
      } else {
        clearError('name');
      }

      if (!isValidEmail(fields.email.value.trim())) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError('email');
      }

      if (fields.message.value.trim().length < 10) {
        showError('message', 'Message should be at least 10 characters.');
        isValid = false;
      } else {
        clearError('message');
      }

      return isValid;
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm()) {
        formNote.textContent = 'Please fix the highlighted fields.';
        formNote.classList.remove('is-success');
        return;
      }

      // EDIT HERE: Connect to an email service (e.g. Formspree, EmailJS)
      // or your own backend endpoint to actually deliver this message.
      formNote.textContent = 'Form is ready for email-service/backend integration.';
      formNote.classList.remove('is-success');
    });

    // Clear individual field errors as the user types
    Object.keys(fields).forEach((key) => {
      fields[key].addEventListener('input', () => clearError(key));
    });
  }

});
