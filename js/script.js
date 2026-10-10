const menuButton = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const themeButton = document.getElementById('theme-toggle');

function closeMenu() {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton?.addEventListener('click', () => {
    const willOpen = mobileMenu.hidden;
    mobileMenu.hidden = !willOpen;
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
});

mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
});
window.matchMedia('(min-width: 821px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
});

themeButton?.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); } catch (error) { /* Storage is optional. */ }
    themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
});
themeButton?.setAttribute('aria-label', document.documentElement.classList.contains('dark') ? 'Switch to light theme' : 'Switch to dark theme');

const copyButton = document.querySelector('.copy-command');
let copyResetTimer;

copyButton?.addEventListener('click', async () => {
    const command = document.getElementById(copyButton.dataset.copyTarget);
    if (!command) return;
    const label = copyButton.querySelector('.copy-label');
    const value = command.textContent.trim();
    try {
        if (!window.isSecureContext || !navigator.clipboard?.writeText) {
            throw new Error('Secure clipboard unavailable');
        }
        await navigator.clipboard.writeText(value);
        label.textContent = 'Copied!';
        copyButton.dataset.copied = 'true';
        copyButton.setAttribute('aria-label', 'Install command copied');
    } catch (error) {
        label.textContent = 'Copy failed';
        delete copyButton.dataset.copied;
        copyButton.setAttribute('aria-label', 'Could not copy install command');
    }
    clearTimeout(copyResetTimer);
    copyResetTimer = setTimeout(() => {
        label.textContent = 'Copy';
        delete copyButton.dataset.copied;
        copyButton.setAttribute('aria-label', 'Copy install command');
    }, 2200);
});

const reveals = document.querySelectorAll('.reveal');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    reveals.forEach(element => element.classList.add('visible'));
} else {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(element => revealObserver.observe(element));
}

const navLinks = document.querySelectorAll('.desktop-nav a');
const sections = document.querySelectorAll('main > section[id]');
if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => {
                const active = link.getAttribute('href') === `#${entry.target.id}`;
                link.classList.toggle('active', active);
                if (active) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-25% 0px -60% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
}
