/* ============================================================
   Camila Ávila — Landing · interacciones
   ============================================================ */

// --- Configuración de enlaces ---
const CONFIG = {
  whatsapp: "https://wa.link/5i9q44",
  calendly: "https://calendly.com/avilacamila/consulta-legal"
};

(function () {
  // WhatsApp links
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = CONFIG.whatsapp;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Calendly links
  document.querySelectorAll('[data-calendly]').forEach(a => {
    a.href = CONFIG.calendly;
    a.target = "_blank";
    a.rel = "noopener";
  });
  // "Reservar consulta" anchors that scroll to #agenda are left as-is.

  // Year
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Header scrolled state + FAB
  const header = document.getElementById('siteHeader');
  const fab = document.querySelector('.fab');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 12);
    if (fab) fab.classList.toggle('show', y > 520);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal on scroll — only hide & animate elements below the fold,
  // so above-the-fold content is always visible (no flicker / no blank page).
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove('pending');
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top > vh * 0.9) {           // below the fold → hide then animate
        el.classList.add('pending');
        // stagger siblings slightly
        const sibs = Array.from(el.parentElement.querySelectorAll(':scope > .reveal'));
        el.style.transitionDelay = (Math.max(0, sibs.indexOf(el)) * 60) + 'ms';
        io.observe(el);
      }
      // above the fold → leave visible as-is
    });
  }

  // Smooth-close other FAQ items (single-open accordion feel, optional)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(o => { if (o !== item) o.open = false; });
      }
    });
  });
})();
