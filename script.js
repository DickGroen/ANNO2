(() => {
  const language = document.getElementById('lang');
  const menu = document.getElementById('menu');
  const nav = document.getElementById('nav');

  function setLanguage(value) {
    document.documentElement.lang = value;
    document.querySelectorAll('[data-' + value + ']').forEach((element) => {
      element.innerHTML = element.getAttribute('data-' + value);
    });
    try { localStorage.setItem('anno-language', value); } catch (error) {}
  }

  if (language) {
    let saved = 'en';
    try { saved = localStorage.getItem('anno-language') || 'en'; } catch (error) {}
    language.value = saved;
    setLanguage(saved);
    language.addEventListener('change', () => setLanguage(language.value));
  }

  function closeMenu() {
    if (!nav || !menu) return;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
  }

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
