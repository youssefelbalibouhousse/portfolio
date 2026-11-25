/* Portfolio — interactions */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  /* ── Révélation au défilement ───────────────────────────────────────── */
  const revealables = document.querySelectorAll("[data-reveal]");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-in"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach((el) => observer.observe(el));
  }

  /* ── En-tête compact au défilement ──────────────────────────────────── */
  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── Menu mobile ────────────────────────────────────────────────────── */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  if (burger && menu && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    };

    burger.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        burger.focus();
      }
    });

    window.matchMedia("(min-width: 941px)").addEventListener("change", (event) => {
      if (event.matches) setOpen(false);
    });
  }

  /* ── Spotlight suivant le pointeur ──────────────────────────────────── */
  if (finePointer.matches && !reduceMotion.matches) {
    document.querySelectorAll("[data-spotlight]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    });
  }

  /* ── Accordéon FAQ : une seule réponse ouverte ──────────────────────── */
  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ── Année du pied de page ──────────────────────────────────────────── */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── Visionneuse de captures ────────────────────────────────────────── */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  if (lightbox && lightboxImg && typeof lightbox.showModal === "function") {
    document.querySelectorAll("[data-zoom]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const source = trigger.querySelector("img");
        lightboxImg.src = trigger.dataset.zoom;
        lightboxImg.alt = source ? source.alt : "";
        lightbox.showModal();
        lightboxClose?.focus();
      });
    });

    lightboxClose?.addEventListener("click", () => lightbox.close());

    // Escape explicite : le `cancel` natif n'est pas déclenché dans tous les moteurs
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.open) lightbox.close();
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }
})();
