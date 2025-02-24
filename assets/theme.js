// Search animation
document.addEventListener('DOMContentLoaded', () => {
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

  // Start animation
  animate();
});



// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
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



// Horizontal scroll functionality for icon-columns.liquid
function initIconColumnsScroll() {
  const containers = document.querySelectorAll('.icon-col-wrapper');
  
  containers.forEach(container => {
    const arrows = container.closest('.cc-icon-columns').querySelectorAll('.scroll-arrow');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Arrow click handlers
    arrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        const scrollAmount = container.clientWidth * 0.8;
        container.scrollBy({
          left: arrow.classList.contains('left') ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      });
    });

    // Touch/swipe handlers
    container.addEventListener('scroll', () => {
      arrows[0].style.display = container.scrollLeft > 0 ? 'block' : 'none';
      arrows[1].style.display = container.scrollLeft + container.clientWidth < container.scrollWidth ? 'block' : 'none';
    });

    // Mouse drag handlers
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => { isDown = false; });
    container.addEventListener('mouseup', () => { isDown = false; });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
  });
}

// Initialize on load and resize
document.addEventListener('DOMContentLoaded', initIconColumnsScroll);
window.addEventListener('resize', initIconColumnsScroll);



// SVG Color Handler
function updateIconColors() {
  document.querySelectorAll('.icon-col-item').forEach(item => {
    const textColor = getComputedStyle(item).color;
    const img = item.querySelector('img');
    
    // Convert text color to filter values
    const hexColor = textColor.startsWith('#') ? textColor : '#000000';
    const invertValue = hexColor === '#000000' ? 1 : 0;
    item.style.setProperty('--icon-invert', invertValue);
    
    // Advanced color replacement for colored SVGs
    if (img && img.src.endsWith('.svg')) {
      fetch(img.src)
        .then(res => res.text())
        .then(svgText => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
          const svgElement = svgDoc.documentElement;
          
          // Remove existing fill attributes
          svgElement.querySelectorAll('[fill]').forEach(el => {
            el.removeAttribute('fill');
          });
          
          // Create new SVG element
          const newSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          newSVG.innerHTML = svgElement.innerHTML;
          Array.from(svgElement.attributes).forEach(attr => {
            newSVG.setAttribute(attr.name, attr.value);
          });
          newSVG.style.fill = textColor;
          
          // Replace image with SVG
          img.parentNode.replaceChild(newSVG, img);
        });
    }
  });
}

// Initialize on load and color changes
document.addEventListener('DOMContentLoaded', updateIconColors);
window.addEventListener('resize', updateIconColors);