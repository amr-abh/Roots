/* Google Analytics 4 (GA4) loader for Roots
   ------------------------------------------------------------------
   GA_ID is the GA4 Measurement ID for the roots-cocktails.com property.
   To point at a different property, swap the value below.
   If the ID is ever cleared or left as a placeholder, this file does
   nothing — no tracking, no cookies.                                 */
(function () {
  var GA_ID = "G-QZJWJMY7BB"; // GA4 Measurement ID for roots-cocktails.com

  if (!GA_ID || GA_ID.indexOf("XXXX") !== -1) return; // not configured yet

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
})();
