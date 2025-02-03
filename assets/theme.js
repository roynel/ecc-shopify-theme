document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const words = ["candles", "spells", "tarot cards"]; // Add words in desired order
    const animationSpeed = { type: 200, delete: 100, pause: 2000 };
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
  
    // Start animation
    animate();
  });