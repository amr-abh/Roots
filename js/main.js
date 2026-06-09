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
