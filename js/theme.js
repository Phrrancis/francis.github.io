// Theme handling. Runs synchronously in <head> to avoid a flash of the wrong theme.
(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function systemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function effective() {
    var s = stored();
    if (s === 'dark' || s === 'light') return s;
    return systemDark() ? 'dark' : 'light';
  }

  // Apply stored preference immediately.
  var s = stored();
  if (s === 'dark' || s === 'light') root.setAttribute('data-theme', s);

  function updateToggle(btn) {
    var isDark = effective() === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    updateToggle(btn);
    btn.addEventListener('click', function () {
      var next = effective() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      updateToggle(btn);
    });
  });
})();
