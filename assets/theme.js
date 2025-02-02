function searchBarAnimation() {
    const searchInput = document.querySelector('.search-input');
    const animatedText = document.querySelector('.animated-text');
    const placeholder = document.querySelector('.search-placeholder');
    const words = ["candles", "spells", "tarot cards"]; // Fixed order
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    function type() {
      const currentWord = words[wordIndex];
      
      // Update animated text
      animatedText.textContent = isDeleting 
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);
  
      // Handle word transitions
      if (!isDeleting && animatedText.textContent === currentWord) {
        setTimeout(() => (isDeleting = true), 2000);
      } else if (isDeleting && animatedText.textContent === "") {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Cycle through all words
        charIndex = 0;
      } else {
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      }
  
      setTimeout(type, isDeleting ? 100 : 200);
    }
  
    // Hide placeholder when user interacts
    searchInput.addEventListener('focus', () => {
      placeholder.style.opacity = '0';
    });
  
    searchInput.addEventListener('blur', () => {
      if (!searchInput.value) placeholder.style.opacity = '1';
    });
  
    searchInput.addEventListener('input', () => {
      placeholder.style.opacity = searchInput.value ? '0' : '1';
    });
  
    // Start animation
    type();
  }
  
  document.addEventListener('DOMContentLoaded', searchBarAnimation);