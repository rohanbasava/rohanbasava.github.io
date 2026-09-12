/* Rohan Basava portfolio: shared behaviour.
 *
 * Vanilla JavaScript, no dependencies, ~6KB. Everything here is an
 * enhancement: with JavaScript unavailable the site still navigates, reads and
 * submits. Motion is skipped entirely when the visitor prefers reduced motion.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var prefersReducedMotion = function () { return reduceMotion.matches; };

  var on = function (el, type, handler, opts) {
    if (el) el.addEventListener(type, handler, opts);
  };

  /* ---------------------------------------------------------------- Page in */
  /* The fade-in is a CSS animation, so nothing needs doing here on load.
     Returning via the back button must never land on a faded-out page. */
  on(window, "pageshow", function () {
    document.body.classList.remove("is-leaving");
  });

  /* --------------------------------------------------- Soft page transitions */
  /* Fade out before same-origin navigations so pages hand off rather than snap.
     Anything the browser should handle natively is left alone. */
  on(document, "click", function (e) {
    if (prefersReducedMotion()) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var link = e.target.closest("a");
    if (!link) return;
    if (link.target && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;

    var href = link.getAttribute("href") || "";
    if (!href || href.charAt(0) === "#") return;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return;

    var url;
    try { url = new URL(link.href, window.location.href); } catch (err) { return; }
    if (url.origin !== window.location.origin) return;
    /* Same page, different hash: let the smooth-scroll path handle it. */
    if (url.pathname === window.location.pathname && url.hash) return;
    /* Non-HTML assets (the resume PDF, images) open normally. */
    if (/\.(pdf|jpe?g|png|webp|svg|xml|txt|zip)$/i.test(url.pathname)) return;

    e.preventDefault();
    document.body.classList.add("is-leaving");
    var go = function () { window.location.href = link.href; };
    var done = false;
    var once = function () { if (!done) { done = true; go(); } };
    on(document.body, "transitionend", once);
    window.setTimeout(once, 220);
  });

  /* ---------------------------------------------------------- Mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("primary-nav");
  var header = document.querySelector("[data-site-header]");

  if (toggle && navList) {
    var setOpen = function (open) {
      navList.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    on(toggle, "click", function () {
      setOpen(!navList.classList.contains("is-open"));
    });

    on(document, "keydown", function (e) {
      if (e.key === "Escape" && navList.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    /* Tabbing past the last item, or clicking away, closes the menu. */
    on(document, "focusin", function (e) {
      if (!navList.classList.contains("is-open")) return;
      if (!header.contains(e.target)) setOpen(false);
    });
    on(document, "click", function (e) {
      if (!navList.classList.contains("is-open")) return;
      if (!header.contains(e.target)) setOpen(false);
    });
    on(navList, "click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    /* Resizing to desktop must not leave the menu in an open state. */
    var desktop = window.matchMedia("(min-width: 821px)");
    var syncViewport = function () { if (desktop.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", syncViewport);
    else if (desktop.addListener) desktop.addListener(syncViewport);
  }

  /* -------------------------------------------------------- Header scroll state */
  if (header) {
    var syncHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    on(window, "scroll", syncHeader, { passive: true });
    syncHeader();
  }

  /* ------------------------------------------------------------ Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal, .stagger");
  var showAll = function () {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add("is-visible"); });
  };

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    showAll();
  } else if (revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    Array.prototype.forEach.call(revealEls, function (el) { revealObserver.observe(el); });
  }

  /* ------------------------------------------------------------ Counting statistics */
  var counters = document.querySelectorAll("[data-count-to]");
  var runCounter = function (el) {
    var target = parseFloat(el.getAttribute("data-count-to"));
    if (isNaN(target)) return;
    var suffix = el.getAttribute("data-count-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-count-decimals") || "0", 10);
    var duration = 900;
    var started = null;

    var frame = function (now) {
      if (started === null) started = now;
      var progress = Math.min((now - started) / duration, 1);
      /* Ease out: fast start, gentle settle. */
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) window.requestAnimationFrame(frame);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    window.requestAnimationFrame(frame);
  };

  if (counters.length && !prefersReducedMotion() && "IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    Array.prototype.forEach.call(counters, function (el) { countObserver.observe(el); });
  }

  /* ------------------------------------------------------------------ Back to top */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    var syncToTop = function () {
      var show = window.scrollY > 600;
      toTop.hidden = !show;
      toTop.classList.toggle("is-visible", show);
    };
    on(window, "scroll", syncToTop, { passive: true });
    syncToTop();

    on(toTop, "click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      var heading = document.querySelector("main h1");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    });
  }

  /* ------------------------------------------- Case study contents: scrollspy */
  var tocLinks = document.querySelectorAll(".case-toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var sections = [];
    Array.prototype.forEach.call(tocLinks, function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) sections.push({ link: link, section: section });
    });

    var setActive = function (activeSection) {
      sections.forEach(function (pair) {
        pair.link.classList.toggle("is-active", pair.section === activeSection);
      });
    };

    var visible = [];
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var index = visible.indexOf(entry.target);
          if (entry.isIntersecting && index === -1) visible.push(entry.target);
          else if (!entry.isIntersecting && index > -1) visible.splice(index, 1);
        });
        if (visible.length) {
          /* Highest section currently on screen wins. */
          var top = visible.slice().sort(function (a, b) {
            return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
          })[0];
          setActive(top);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (pair) { spy.observe(pair.section); });
  }

  /* Smooth in-page jumps that still move keyboard focus to the destination. */
  on(document, "click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href");
    if (!id || id === "#") return;
    var target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (window.history && window.history.pushState) window.history.pushState(null, "", id);
  });

  /* ------------------------------------------------------------------ Footer year */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------------------------------------------------------------- Contact form */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var submitButton = form.querySelector(".btn-submit");
    var buttonText = submitButton ? submitButton.querySelector(".btn-text") : null;
    var endpoint = (form.getAttribute("action") || "").trim();
    var thankYou = form.getAttribute("data-thank-you") || "/thank-you/";
    var mailto = form.getAttribute("data-mailto") || "";
    var submitting = false;

    var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var setStatus = function (message, kind) {
      if (!status) return;
      status.textContent = message || "";
      status.className = "form-status" + (kind ? " is-" + kind : "");
    };

    var setFieldError = function (field, message) {
      var wrap = field.closest(".field");
      if (!wrap) return;
      var error = wrap.querySelector(".error");
      if (message) {
        wrap.classList.add("has-error");
        field.setAttribute("aria-invalid", "true");
        if (error) error.textContent = message;
      } else {
        wrap.classList.remove("has-error");
        field.removeAttribute("aria-invalid");
        if (error) error.textContent = "";
      }
    };

    var messageFor = function (field) {
      var value = field.value.trim();
      if (!value) {
        return field.id === "email"
          ? "Please enter your email address so I can reply."
          : "This field is required.";
      }
      if (field.type === "email" && !EMAIL_PATTERN.test(value)) {
        return "Please enter a valid email address, for example name@example.com.";
      }
      if (field.tagName === "TEXTAREA" && value.length < 10) {
        return "Please add a little more detail (at least 10 characters).";
      }
      return "";
    };

    var required = form.querySelectorAll("[required]");

    var validate = function () {
      var firstInvalid = null;
      Array.prototype.forEach.call(required, function (field) {
        var message = messageFor(field);
        setFieldError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        setStatus("Please fix the highlighted fields and try again.", "error");
      }
      return !firstInvalid;
    };

    /* Clear an error as soon as the visitor fixes it; validate on blur. */
    Array.prototype.forEach.call(required, function (field) {
      on(field, "input", function () {
        if (field.closest(".field").classList.contains("has-error")) {
          setFieldError(field, messageFor(field));
        }
      });
      /* Validate when the visitor leaves a field, except when they are on their
         way to the submit button: showing an error there would push the button
         down and their click would land under it. The submit handler validates
         everything a moment later anyway. */
      on(field, "blur", function (event) {
        if (event.relatedTarget && event.relatedTarget.closest(".btn-submit")) return;
        if (field.value.trim()) setFieldError(field, messageFor(field));
      });
    });

    var setLoading = function (loading) {
      submitting = loading;
      if (!submitButton) return;
      submitButton.disabled = loading;
      submitButton.classList.toggle("is-loading", loading);
      submitButton.setAttribute("aria-busy", loading ? "true" : "false");
      if (buttonText) buttonText.textContent = loading ? "Sending…" : submitButton.getAttribute("data-label");
    };

    on(form, "submit", function (e) {
      /* Guard against a double submit from an impatient second click or Enter. */
      if (submitting) {
        e.preventDefault();
        return;
      }
      if (!validate()) {
        e.preventDefault();
        return;
      }

      /* No endpoint configured: compose the message in the visitor's own mail
         client and say plainly that it is a draft, not a sent message. */
      if (!endpoint) {
        e.preventDefault();
        var data = new FormData(form);
        var subject = "Portfolio inquiry from " + (data.get("name") || "");
        var body =
          "Name: " + (data.get("name") || "") + "\n" +
          "Email: " + (data.get("email") || "") + "\n" +
          "Subject: " + (data.get("subject") || "") + "\n\n" +
          (data.get("message") || "");
        window.location.href =
          "mailto:" + mailto +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);
        setStatus(
          "Your email app should have opened with this message ready to go. It is a draft until you press send there. If nothing opened, email " + mailto + " directly.",
          "info"
        );
        return;
      }

      /* With fetch available, submit in the background so the page can show
         loading, success and error states. Without it, the native POST to the
         form service runs instead and the service redirects to the thank-you page. */
      if (!window.fetch) {
        setLoading(true);
        return;
      }

      e.preventDefault();
      setLoading(true);
      setStatus("Sending your message…", "info");

      window
        .fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        })
        .then(function (response) {
          if (!response.ok) throw new Error("Request failed with status " + response.status);
          setStatus("Message sent. Taking you to the confirmation page…", "success");
          window.location.href = thankYou;
        })
        .catch(function () {
          setLoading(false);
          setStatus(
            "Something went wrong sending your message. Please try again, or email " + mailto + " directly.",
            "error"
          );
          if (submitButton) submitButton.focus();
        });
    });
  }
})();
