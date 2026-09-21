/* Creator Works — site interactions */
(function () {
  "use strict";

  /* ---- always open a page at the top ----
     Browsers restore the previous scroll position on back/forward and some
     embedded viewers keep it across navigations; an in-page anchor still wins. */
  if ("scrollRestoration" in history) {
    try { history.scrollRestoration = "manual"; } catch (e) { /* ignore */ }
  }

  function toTop() {
    var root = document.documentElement;
    var hash = window.location.hash;
    if (hash.length > 1) {
      var target = null;
      try { target = document.querySelector(hash); } catch (e) { /* invalid selector */ }
      if (target) { target.scrollIntoView(); return; }
    }
    var behaviour = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = behaviour;
  }

  toTop();
  window.addEventListener("load", toTop);
  window.addEventListener("pageshow", function (e) { if (e.persisted) toTop(); });

  /* ---- mobile nav ---- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll(".nav__links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- header: lift off at the top, hide going down, return going up ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var lastY = window.scrollY;
    var travel = 0;          /* how far the current gesture has run, one direction */
    var hidden = false;
    var ticking = false;
    var HIDE_AFTER = 160;    /* stay put near the top of the page */
    var HIDE_TRAVEL = 90;    /* commit to hiding only after a real downward scroll */
    var SHOW_TRAVEL = 40;    /* come back sooner than it leaves */

    var setHidden = function (next) {
      if (next === hidden) return;
      hidden = next;
      header.classList.toggle("is-tucked", next);
    };

    var update = function () {
      ticking = false;
      var y = window.scrollY;
      var delta = y - lastY;
      lastY = y;

      header.classList.toggle("is-stuck", y > 10);

      /* a change of direction starts the measurement again, so momentum
         wobble in the other direction cannot flip the header */
      if ((delta > 0) !== (travel > 0)) travel = 0;
      travel += delta;

      if (y <= HIDE_AFTER || (nav && nav.classList.contains("is-open"))) {
        setHidden(false);
        travel = 0;
        return;
      }
      if (travel > HIDE_TRAVEL) { setHidden(true); travel = 0; }
      else if (travel < -SHOW_TRAVEL) { setHidden(false); travel = 0; }
    };

    update();
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
  }

  /* ---- reveal on scroll ---- */
  var revealables = document.querySelectorAll(".reveal");
  if (revealables.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px" }
      );
      revealables.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i % 4, 3) * 80 + "ms";
        io.observe(el);
      });
    } else {
      revealables.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  /* ---- hero word rotator ---- */
  var rotator = document.querySelector("[data-rotator]");
  if (rotator) {
    var words = rotator.querySelectorAll("span");
    var idx = 0;
    words[0].classList.add("is-active");
    setInterval(function () {
      words[idx].classList.remove("is-active");
      idx = (idx + 1) % words.length;
      words[idx].classList.add("is-active");
    }, 2200);
  }

  /* ---- counting stats ---- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          countObserver.unobserve(el);
          var target = parseFloat(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var start = performance.now();
          var dur = 1400;
          var tick = function (now) {
            var p = Math.min((now - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var value = target * eased;
            el.textContent = (target % 1 ? value.toFixed(1) : Math.round(value)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---- project filters ---- */
  var filters = document.querySelectorAll("[data-filter]");
  if (filters.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var value = btn.getAttribute("data-filter");
        filters.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        document.querySelectorAll("[data-category]").forEach(function (item) {
          var match = value === "all" || item.getAttribute("data-category") === value;
          item.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__item");
      var answer = item.querySelector(".faq__a");
      var open = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", String(open));
      answer.style.maxHeight = open ? answer.scrollHeight + "px" : 0;
    });
  });

  /* ---- project brief form (front-end only) ---- */
  var form = document.querySelector("[data-brief-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = form.querySelector(".form__success");
      var name = (form.querySelector("#name") || {}).value || "creator";
      if (success) {
        success.textContent =
          "Thanks, " + name.split(" ")[0] + " — brief received. We map your product and reply within 48 hours.";
        success.classList.add("is-visible");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  }

  /* ---- current year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
