function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    const open = document.getElementById("icon-open");
    const close = document.getElementById("icon-close");
    const isOpen = menu.classList.toggle("open");
    open.style.display = isOpen ? "none" : "block";
    close.style.display = isOpen ? "block" : "none";
}

function closeMenu() {
    document.getElementById("mobile-menu").classList.remove("open");
    document.getElementById("icon-open").style.display = "block";
    document.getElementById("icon-close").style.display = "none";
}

const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
).matches;
const reveals = document.querySelectorAll(".reveal");

if (prefersReduced) {
    reveals.forEach((el) => el.classList.add("visible"));
} else {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const siblings = entry.target.parentElement
                    ? Array.from(
                        entry.target.parentElement.children,
                    ).filter((c) =>
                        c.classList.contains("reveal"),
                    )
                    : [];
                const idx = siblings.indexOf(entry.target);
                const delay = idx > 0 ? idx * 70 : 0;
                setTimeout(
                    () => entry.target.classList.add("visible"),
                    delay,
                );
                io.unobserve(entry.target);
            });
        },
        {threshold: 0.08, rootMargin: "0px 0px -36px 0px"},
    );
    reveals.forEach((el) => io.observe(el));
}

const navLinks = document.querySelectorAll(
    'nav a[href^="#"], .bottom-nav a[href^="#"]',
);
const sections = document.querySelectorAll("section[id]");

const sio = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;

            navLinks.forEach((link) => {
                const href = link.getAttribute("href");
                if (!href) return;
                const targetId = href.replace("#", "");
                const isActive = targetId === id;

                if (!link.classList.contains("btn")) {
                    link.style.color = isActive
                        ? "var(--text)"
                        : "var(--muted)";
                }

                if (link.classList.contains("bottom-nav-item")) {
                    link.classList.toggle("active", isActive);
                }
            });
        });
    },
    {threshold: 0.35},
);

sections.forEach((s) => sio.observe(s));

document.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
        document
            .querySelectorAll(".bottom-nav-item")
            .forEach((el) => {
                const target = el.getAttribute("data-target");
                el.classList.toggle("active", target === hash);
            });
    }
});