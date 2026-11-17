export function setupBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  const scrollContainer = document.getElementById('main-scroll-container');
  const scrollTarget = scrollContainer || window;

  function getScrollTop() {
    if (scrollContainer) {
      return scrollContainer.scrollTop;
    }
    return window.scrollY || document.documentElement.scrollTop;
  }

  function checkScroll() {
    const currentScroll = getScrollTop();
    if (currentScroll > 250) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
      btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
      btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  }

  btn.onclick = () => {
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  scrollTarget.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

document.addEventListener('astro:page-load', setupBackToTop);
