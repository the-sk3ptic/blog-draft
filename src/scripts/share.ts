export function setupShareButtons() {
  const copyBtn = document.getElementById('share-copy-link-btn');
  const copyText = document.getElementById('share-copy-text');
  const nativeBtn = document.getElementById('share-native-btn');

  if (copyBtn && copyText) {
    copyBtn.onclick = async () => {
      const shareUrl = copyBtn.getAttribute('data-share-url') || window.location.href;
      try {
        await navigator.clipboard.writeText(shareUrl);
        copyText.textContent = '已复制链接';
        copyBtn.setAttribute('title', '文章链接已成功复制到剪贴板');
        copyBtn.setAttribute('aria-label', '文章链接已成功复制到剪贴板');
        copyBtn.classList.add('text-emerald-600', 'dark:text-emerald-400', 'border-emerald-500/50');
        setTimeout(() => {
          copyText.textContent = '复制链接';
          copyBtn.setAttribute('title', '复制文章链接到剪贴板');
          copyBtn.setAttribute('aria-label', '复制文章链接到剪贴板');
          copyBtn.classList.remove('text-emerald-600', 'dark:text-emerald-400', 'border-emerald-500/50');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    };
  }

  if (nativeBtn && typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    nativeBtn.classList.remove('hidden');
    nativeBtn.classList.add('inline-flex');
    nativeBtn.onclick = async () => {
      const title = nativeBtn.getAttribute('data-share-title') || document.title;
      const text = nativeBtn.getAttribute('data-share-desc') || '';
      const url = nativeBtn.getAttribute('data-share-url') || window.location.href;
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        // User cancelled or share failed
      }
    };
  }
}
