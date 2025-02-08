document.addEventListener('DOMContentLoaded', () => {
  // Search Animation
  function initSearchAnimation(selector) {
    const animatedText = document.querySelector(`${selector} .animated-text`);
    const placeholder = document.querySelector(`${selector} .search-placeholder`);
    const input = document.querySelector(`${selector} .search-input`);
    const words = ["books", "boxes", "tiles", "chainmail", "spell kits", "bracelets"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      const typedText = isDeleting ? 
        currentWord.substring(0, charIndex - 1) : 
        currentWord.substring(0, charIndex + 1);

      animatedText.textContent = typedText;

      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => isDeleting = true, 2000);
      } else if (isDeleting && typedText === "") {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      setTimeout(type, isDeleting ? 100 : 200);
    }

    // Hide/show placeholder
    input.addEventListener('focus', () => placeholder.style.opacity = '0');
    input.addEventListener('blur', () => {
      if (!input.value) placeholder.style.opacity = '1';
    });
    input.addEventListener('input', () => {
      placeholder.style.opacity = input.value ? '0' : '1';
    });

    type();
  }

  // Initialize for both search bars
  initSearchAnimation('.search-bar');
  initSearchAnimation('.mobile-search-bar');

  // Mobile Menu
  const hamburger = document.querySelector('.hamburger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu') && !e.target.closest('.hamburger-menu')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});