/* Eusyra — World Studio Pro setup page. Shows the post-checkout banner. No dependencies. */
(function () {
  "use strict";

  var banner = document.getElementById("checkout-banner");
  if (!banner) return;

  var params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch (e) {
    return;
  }

  if (params.get("checkout") === "success") {
    banner.hidden = false;
    document.title = "World Studio Pro activated — Setup | Eusyra";
  }
})();
