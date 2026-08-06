/* RTP Intelligence — interactions */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* nav scrolled state */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* scroll reveals */
  var revealed = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealed.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("in"); });
  }

  /* year stamp */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ticker: clone content until each half spans the viewport (halves must stay
     identical for the -50% translate loop) */
  var track = document.querySelector(".ticker-track");
  if (track) {
    var baseHTML = track.innerHTML;
    var guard = 0;
    while (track.scrollWidth < window.innerWidth * 2 && guard < 6) {
      track.innerHTML += baseHTML;
      guard++;
    }
  }

  /* contact form */
  var form = document.getElementById("contact-form");
  if (form) {
    var card = form.closest(".form-card");
    var errorBox = document.getElementById("form-error");
    var submitBtn = form.querySelector("button[type=submit]");
    var btnLabel = submitBtn.querySelector(".label");

    /* returning from native-POST fallback */
    if (new URLSearchParams(window.location.search).get("sent") === "1") {
      card.classList.add("sent");
    }

    /* keep the fallback redirect pointed at this page, wherever it's hosted */
    var next = form.querySelector("input[name=_next]");
    if (next) {
      next.value =
        window.location.origin +
        window.location.pathname +
        "?sent=1";
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.reportValidity()) return;
      if (form.querySelector("input[name=_honey]").value) return; /* bot */

      errorBox.classList.remove("show");
      submitBtn.disabled = true;
      btnLabel.textContent = "Transmitting…";

      var endpoint = form.getAttribute("action").replace(
        "formsubmit.co/",
        "formsubmit.co/ajax/"
      );

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (!res.ok) throw new Error("status " + res.status);
          return res.json();
        })
        .then(function () {
          card.classList.add("sent");
          var head = card.querySelector(".form-success h2");
          if (head) head.focus();
        })
        .catch(function () {
          /* AJAX blocked — fall back to native POST (redirects back with ?sent=1).
             form.submit() bypasses this listener by design. */
          try {
            form.submit();
          } catch (e) {
            submitBtn.disabled = false;
            btnLabel.textContent = "Send message";
            errorBox.classList.add("show");
          }
        });
    });
  }
})();
