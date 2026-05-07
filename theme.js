/**
 * HelpOut Theme Toggle
 * Reads/writes theme preference to localStorage.
 * Works across all pages that include this script.
 */
(function () {
  const STORAGE_KEY = 'ho_theme';

  // Apply theme immediately (before paint) to avoid flash
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  // Create the toggle button once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.title = 'Toggle light / dark mode';
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.textContent = saved === 'light' ? '🌙' : '☀️';

    btn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
      btn.textContent = next === 'light' ? '🌙' : '☀️';
    });

    document.body.appendChild(btn);
  });
})();
