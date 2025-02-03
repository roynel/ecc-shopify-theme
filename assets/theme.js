function searchBarAnimation() {
    const searchInput = document.querySelector('.search-input');
    const animatedText = document.querySelector('.animated-text');
    const placeholder = document.querySelector('.search-placeholder');
    const words = ["books", "boxes", "tiles", "chokers"]; // Add words here in order
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    function type() {
      const currentWord = words[wordIndex];
      const typedText = isDeleting
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);
  
      animatedText.textContent = typedText;
  
      // Debugging: Uncomment to see word transitions in console
      // console.log(`Current word: ${currentWord}, Index: ${wordIndex}`);
  
      // Transition to next word after deleting
      if (isDeleting && typedText === "") {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Strict order
        charIndex = 0;
      } 
  
      // Start deleting after typing completes
      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => (isDeleting = true), 2000);
      } else {
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      }
  
      setTimeout(type, isDeleting ? 100 : 200);
    }
  
    // Hide placeholder on interaction
    searchInput.addEventListener('focus', () => (placeholder.style.opacity = '0'));
    searchInput.addEventListener('blur', () => {
      if (!searchInput.value) placeholder.style.opacity = '1';
    });
    searchInput.addEventListener('input', () => {
      placeholder.style.opacity = searchInput.value ? '0' : '1';
    });
  
    type(); // Start animation
  }
  
  document.addEventListener('DOMContentLoaded', searchBarAnimation);