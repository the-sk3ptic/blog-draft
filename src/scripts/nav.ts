export function initNavMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  if (toggle.dataset.initialized) return;
  toggle.dataset.initialized = 'true';

  toggle.addEventListener('click', () => {
    const willExpand = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(willExpand));
    const label = willExpand ? '收起导航菜单' : '展开导航菜单';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    menu.classList.toggle('open');
  });
}
