export function setupTOC() {
  const links = document.querySelectorAll('.toc-link');
  if (!links.length) return;

  const scrollContainer = document.getElementById('main-scroll-container');

  // Mobile fixed floating TOC toggle
  const mobileToggle = document.getElementById('toc-mobile-toggle');
  const mobilePanel = document.getElementById('toc-mobile-panel');
  const mobileClose = document.getElementById('toc-mobile-close');

  if (mobileToggle && mobilePanel) {
    mobileToggle.onclick = () => {
      const isHidden = mobilePanel.classList.toggle('hidden');
      mobileToggle.setAttribute('aria-expanded', String(!isHidden));
    };
  }

  if (mobileClose && mobilePanel && mobileToggle) {
    mobileClose.onclick = () => {
      mobilePanel.classList.add('hidden');
      mobileToggle.setAttribute('aria-expanded', 'false');
    };
  }

  // Smooth scroll inside #main-scroll-container with uniform top gap below navbar
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const slug = link.getAttribute('data-slug');
      if (!slug) return;
      const targetEl = document.getElementById(slug);
      if (!targetEl) return;

      e.preventDefault();
      if (scrollContainer) {
        const containerTop = scrollContainer.getBoundingClientRect().top;
        const targetTop = targetEl.getBoundingClientRect().top;
        const offset = scrollContainer.scrollTop + (targetTop - containerTop) - 20;
        scrollContainer.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      history.replaceState(history.state, '', `#${slug}`);

      if (mobilePanel && mobileToggle && link.classList.contains('toc-mobile-item')) {
        mobilePanel.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Collect unique heading elements in document order
  const seenSlugs = new Set<string>();
  const headingElements: HTMLElement[] = [];
  links.forEach((link) => {
    const slug = link.getAttribute('data-slug');
    if (slug && !seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      const el = document.getElementById(slug);
      if (el) headingElements.push(el);
    }
  });

  if (!headingElements.length) return;

  function onScroll() {
    const containerTop = scrollContainer
      ? scrollContainer.getBoundingClientRect().top
      : 0;
    const offsetThreshold = containerTop + 40;
    let currentActiveSlug = headingElements[0].id;

    for (let i = 0; i < headingElements.length; i++) {
      const heading = headingElements[i];
      if (heading.getBoundingClientRect().top <= offsetThreshold) {
        currentActiveSlug = heading.id;
      } else {
        break;
      }
    }

    links.forEach((link) => {
      if (link.getAttribute('data-slug') === currentActiveSlug) {
        link.classList.add(
          'text-[var(--color-primary-600)]',
          'font-medium',
          'border-[var(--color-primary-600)]',
          'bg-[var(--color-primary-50)]/40',
          'dark:bg-[var(--color-primary-950)]/30'
        );
      } else {
        link.classList.remove(
          'text-[var(--color-primary-600)]',
          'font-medium',
          'border-[var(--color-primary-600)]',
          'bg-[var(--color-primary-50)]/40',
          'dark:bg-[var(--color-primary-950)]/30'
        );
      }
    });
  }

  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
