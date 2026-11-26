/* Eusyra — small progressive enhancements. No dependencies. */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  var reveals = document.querySelectorAll("[data-reveal]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  // Content must never stay hidden if the observer misses: a scroll sweep and a
  // print handler both force the reveal. Anything revealed is unobserved.
  function reveal(el) {
    el.classList.add("in");
    if (observer) observer.unobserve(el);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) reveal(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  function sweep() {
    var limit = window.scrollY + window.innerHeight + 240;
    reveals.forEach(function (el) {
      if (!el.classList.contains("in") && el.getBoundingClientRect().top + window.scrollY < limit) {
        reveal(el);
      }
    });
  }

  reveals.forEach(function (el) { observer.observe(el); });
  window.addEventListener("scroll", sweep, { passive: true });
  window.addEventListener("beforeprint", function () {
    reveals.forEach(reveal);
  });
  sweep();
})();
