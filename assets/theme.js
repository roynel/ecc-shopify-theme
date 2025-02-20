document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('DOMContentLoaded', () => {
    // Search Animation Configuration
    let animationPaused = false;
    let animationFrame;
  
    function animate() {
      if (animationPaused) return;

      // Configuration
      const words = ["books", "boxes", "tiles", "chainmail", "spell kits", "bracelets"]; // Add words in desired order
      const animationSpeed = { type: 200, delete: 100, pause: 2000 };
      const animatedTextElements = document.querySelectorAll('.animated-text');
      const elements = {
        input: document.querySelector('.search-input'),
        placeholder: document.querySelector('.search-placeholder'),
        animatedText: document.querySelector('.animated-text')
      };

      let currentWordIndex = 0;
      let currentCharIndex = 0;
      let isDeleting = false;

      // Core animation logic
      function animate() {
        const currentWord = words[currentWordIndex];
        animatedTextElements.forEach(element => {
          element.textContent = currentWord.substring(0, currentCharIndex + (isDeleting ? -1 : 1));
        });
        
        if (!isDeleting) {
          // Typing forward
          elements.animatedText.textContent = currentWord.substring(0, currentCharIndex + 1);
          currentCharIndex++;
          
          if (currentCharIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(animate, animationSpeed.pause);
            return;
          }
        } else {
          // Deleting backward
          elements.animatedText.textContent = currentWord.substring(0, currentCharIndex - 1);
          currentCharIndex--;
          
          if (currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
          }
        }

        setTimeout(animate, isDeleting ? animationSpeed.delete : animationSpeed.type);
      }

      // Hide placeholder on interaction
      elements.input.addEventListener('focus', () => {
        elements.placeholder.style.opacity = '0';
      });

      elements.input.addEventListener('blur', () => {
        if (!elements.input.value) elements.placeholder.style.opacity = '1';
      });

      elements.input.addEventListener('input', () => {
        elements.placeholder.style.opacity = elements.input.value ? '0' : '1';
      });

      animationFrame = setTimeout(animate, isDeleting ? animationSpeed.delete : animationSpeed.type);
    }

    // Search Input Interaction
  elements.input.addEventListener('focus', () => {
    elements.placeholder.style.opacity = '0';
    animationPaused = true;
    clearTimeout(animationFrame);
  });

  elements.input.addEventListener('blur', () => {
    if (!elements.input.value) {
      elements.placeholder.style.opacity = '1';
      animationPaused = false;
      animate();
    }
  });

  elements.input.addEventListener('input', (e) => {
    if (e.target.value) {
      elements.placeholder.style.opacity = '0';
      animationPaused = true;
      clearTimeout(animationFrame);
    } else {
      elements.placeholder.style.opacity = '1';
      animationPaused = false;
      animate();
    }
  });

  // Initialize animation
  animate();

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflowY = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-header-top') && !e.target.closest('.mobile-menu')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflowY = 'auto';
    }
  });
});