import { initThemeToggle } from './theme';
import { initNavMenu } from './nav';
import { setupCopyButtons } from './copy-code';
import { setupTOC } from './toc';
import { setupShareButtons } from './share';
import { setupBackToTop } from './back-to-top';

export function initApp() {
  initThemeToggle();
  initNavMenu();
  setupCopyButtons();
  setupTOC();
  setupShareButtons();
  setupBackToTop();
}

// 统一监听首次加载与 Astro ClientRouter (View Transitions) 页面切换生命周期
document.addEventListener('astro:page-load', initApp);
