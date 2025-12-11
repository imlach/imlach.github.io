const initIntersectionObserver = (): void => {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (!portfolioItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
    }
  );

  portfolioItems.forEach((item) => {
    item.classList.add('fade-in');
    observer.observe(item);
  });
};

const initScrollToTop = (): void => {
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'fixed bottom-8 right-8 bg-white text-black w-12 h-12 rounded-full opacity-0 pointer-events-none transition-opacity duration-300 hover:bg-gray-200 z-50';
  scrollBtn.innerHTML = '↑';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollBtn);

  const toggleScrollBtn = (): void => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
    } else {
      scrollBtn.classList.add('opacity-0', 'pointer-events-none');
    }
  };

  window.addEventListener('scroll', toggleScrollBtn);
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

const init = (): void => {
  initIntersectionObserver();
  initScrollToTop();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
