/* Google Analytics 4 (GA4) loader for Roots
   ------------------------------------------------------------------
   1. Create a GA4 property at https://analytics.google.com
   2. Copy your Measurement ID (looks like "G-ABCD1234EF")
   3. Paste it below, replacing G-XXXXXXXXXX
   Until a real ID is set, this file does nothing — no tracking,
   no cookies (so local previews stay clean).                       */
(function () {
  var GA_ID = "G-XXXXXXXXXX"; // <-- replace with your GA4 Measurement ID

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
