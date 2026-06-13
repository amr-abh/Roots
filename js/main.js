/* Roots — shared scripts */

/* ---- mobile nav toggle ---- */
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
})();

/* ---- booking form -> WhatsApp message ----
   No backend needed: we build a pre-filled WhatsApp message and open it.
   >>> Replace BOOKING_WHATSAPP with your real number (international format,
       digits only, e.g. Lebanon +961 71 234 567 -> "96171234567").       */
const BOOKING_WHATSAPP = "9610000000"; // TODO: replace with Roots' real number

(function () {
  const form = document.querySelector("#booking-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const get = (k) => (data.get(k) || "").toString().trim();

    const msg =
      `New booking request — Roots Tropical Cocktails%0A` +
      `--------------------------------%0A` +
      `Name: ${get("name")}%0A` +
      `Event: ${get("eventType")}%0A` +
      `Date: ${get("date")}%0A` +
      `Guests: ${get("guests")}%0A` +
      `Phone: ${get("phone")}%0A` +
      `Details: ${get("message")}`;

    window.open(`https://wa.me/${BOOKING_WHATSAPP}?text=${msg}`, "_blank");
  });
})();

/* ---- footer year ---- */
(function () {
  const y = document.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();
})();

/* ===========================================================
   REVAMP — scroll reveals + parallax (Apple-style)
   =========================================================== */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- reveal-on-scroll ---- */
(function () {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
})();

/* ---- parallax floating fruit ----
   Position-relative parallax: each piece drifts based on where its
   resting position sits relative to the viewport center, so fruit
   anywhere on the page parallax naturally (not just near the top).
   data-speed = drift strength, data-spin = degrees of rotation.     */
(function () {
  if (reduceMotion) return;
  const nodes = Array.from(document.querySelectorAll(".float-fruit"));
  if (!nodes.length) return;

  let items = [];
  const measure = () => {
    items = nodes.map((el) => {
      const prev = el.style.transform;
      el.style.transform = "none";
      const r = el.getBoundingClientRect();
      el.style.transform = prev;
      return {
        el,
        baseCenter: r.top + window.scrollY + r.height / 2,
        speed: parseFloat(el.dataset.speed || "0.15"),
        spin: parseFloat(el.dataset.spin || "0"),
      };
    });
  };

  let ticking = false;
  const update = () => {
    const viewCenter = window.scrollY + window.innerHeight / 2;
    items.forEach((it) => {
      const delta = it.baseCenter - viewCenter;  // +below / -above center
      const drift = -delta * it.speed;
      const rot = (delta / window.innerHeight) * it.spin;
      it.el.style.transform = `translate3d(0, ${drift.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
    });
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  };

  measure();
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { measure(); update(); }, { passive: true });
  window.addEventListener("load", () => { measure(); update(); });
})();

/* ---- pointer glow on cards ---- */
(function () {
  if (reduceMotion) return;
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
})();

/* ---- shrink header on scroll ---- */
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
