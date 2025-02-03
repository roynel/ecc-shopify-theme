function searchBarAnimation() {
    const searchInput = document.querySelector('.search-input');
    const animatedText = document.querySelector('.animated-text');
    const placeholder = document.querySelector('.search-placeholder');
    const words = ["books", "boxes", "tiles", "spellkits", "bracelets"]; // Add more words here!
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    function type() {
      const currentWord = words[wordIndex];
      const typedText = isDeleting
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);
  
      // Update animated text
      animatedText.textContent = typedText;
  
      // Handle word transitions
      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => (isDeleting = true), 2000); // Pause after typing
      } else if (isDeleting && typedText === "") {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Cycle to next word
        charIndex = 0; // Reset for the new word
      } else {
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      }
  
      setTimeout(type, isDeleting ? 100 : 200); // Speed control
    }
  
    // Hide placeholder on interaction
    searchInput.addEventListener('focus', () => {
      placeholder.style.opacity = '0';
    });
  
    searchInput.addEventListener('blur', () => {
      if (!searchInput.value) placeholder.style.opacity = '1';
    });
  
    searchInput.addEventListener('input', () => {
      placeholder.style.opacity = searchInput.value ? '0' : '1';
    });
  
    type(); // Start animation
  }
  
  document.addEventListener('DOMContentLoaded', searchBarAnimation);