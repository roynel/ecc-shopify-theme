function searchBarAnimation() {
    const searchPlaceholder = document.querySelector('.search-placeholder .animated-text');
    const words = ["candles", "tarot cards", "spells"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    function type() {
      const currentWord = words[wordIndex];
      const typedText = isDeleting
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);
  
      searchPlaceholder.textContent = typedText;
      searchPlaceholder.style.width = `${typedText.length}ch`; // Ensure text stays in one line
  
      if (!isDeleting && typedText === currentWord) {
        // Pause at the end of typing
        setTimeout(() => (isDeleting = true), 2000);
      } else if (isDeleting && typedText === "") {
        // Move to the next word after deleting
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Cycle through all words
      }
  
      // Speed of typing/backspacing
      const speed = isDeleting ? 100 : 200;
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
  
      setTimeout(type, speed);
    }
  
    // Start the animation
    type();
  }
  
  // Initialize the animation when the page loads
  document.addEventListener('DOMContentLoaded', searchBarAnimation);