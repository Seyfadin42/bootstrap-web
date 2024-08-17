document.addEventListener('DOMContentLoaded', () => {
  const services = document.querySelectorAll('.service');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing after it has been revealed
      }
    });
  }, observerOptions);

  services.forEach(service => {
    observer.observe(service);
  });

  // Scroll event listener
  const cards = document.querySelectorAll('.gallery-card');

  const revealCards = () => {
    const windowHeight = window.innerHeight;
    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      if (cardRect.top < windowHeight && cardRect.bottom > 0) {
        card.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealCards);
  window.addEventListener('DOMContentLoaded', revealCards); // Check upon loading

  // Click event for gallery cards
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.gallery-img');
      const title = card.querySelector('.card-title').innerText;
      const description = card.querySelector('.gallery-description').innerText;

      // Toggle description display
      const descriptionElement = card.querySelector('.gallery-description');
      descriptionElement.classList.toggle('show');

      // Setup modal image and description
      const modalImg = document.getElementById('modalImage');
      const modalDescription = document.getElementById('modalDescription');
      const modalTitle = document.getElementById('imageModalLabel');

      modalImg.src = img.src;
      modalDescription.innerText = description;
      modalTitle.innerText = title;

      // Show the modal
      const modal = new bootstrap.Modal(document.getElementById('imageModal'));
      modal.show();
    });
  });
});