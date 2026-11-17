function updateThemeButtonA11y(button: HTMLElement, isDark: boolean) {
  const label = isDark ? '当前为深色模式，点击切换为浅色模式' : '当前为浅色模式，点击切换为深色模式';
  button.setAttribute('aria-label', label);
  button.setAttribute('title', label);
  button.setAttribute('aria-pressed', String(isDark));
}

export function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const isCurrentDark = document.documentElement.classList.contains('dark');
  updateThemeButtonA11y(btn, isCurrentDark);

  if (btn.dataset.initialized) return;
  btn.dataset.initialized = 'true';

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButtonA11y(btn, isDark);
  });
}
