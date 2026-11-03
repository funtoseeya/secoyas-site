/* Las Secoyas — site script. No dependencies. */
(function () {
  "use strict";

  var CONFIG = {
    whatsapp: "56968345841",
    email: "infosecoyaseventos@gmail.com",
    // Google Analytics 4 measurement ID. Leave the placeholder until the property exists.
    gaId: "G-BZDMFP6P27"
  };

  var PAGE_NAMES = {
    "": "Inicio",
    "matrimonios": "Matrimonios",
    "eventos-empresa": "Eventos de empresa",
    "celebraciones": "Celebraciones",
    "espacios": "Espacios",
    "galeria": "Galería",
    "cotizar": "Cotizar"
  };

  function store(kind) {
    try { return window[kind]; } catch (e) { return null; }
  }
  function get(kind, key) {
    var s = store(kind);
    try { return s ? s.getItem(key) : null; } catch (e) { return null; }
  }
  function set(kind, key, value) {
    var s = store(kind);
    try { if (s) s.setItem(key, value); } catch (e) { /* storage blocked */ }
  }

  function pageSlug(pathname) {
    return (pathname || location.pathname).replace(/^\/+|\/+$/g, "").split("/")[0].replace(/\.html$/, "").replace(/^index$/, "");
  }

  /* ---------- Where did this visitor come from? ---------- */
  // Remembered for the browser session so a quote request can say
  // "llegó por Google a la página Matrimonios", even after browsing other pages.
  (function rememberOrigin() {
    if (get("sessionStorage", "sec_origen")) return;
    var params = new URLSearchParams(location.search);
    var source = params.get("utm_source");
    if (!source && document.referrer) {
      try {
        var host = new URL(document.referrer).hostname.replace(/^www\./, "");
        if (host !== location.hostname.replace(/^www\./, "")) source = host;
      } catch (e) { /* ignore */ }
    }
    var friendly = {
      "google": "Google", "bing": "Bing", "chatgpt.com": "ChatGPT", "chat.openai.com": "ChatGPT",
      "perplexity.ai": "Perplexity", "instagram.com": "Instagram", "l.instagram.com": "Instagram",
      "facebook.com": "Facebook", "m.facebook.com": "Facebook", "l.facebook.com": "Facebook",
      "gemini.google.com": "Gemini", "copilot.microsoft.com": "Copilot", "invitalo.cl": "Invítalo",
      "inmejorableinversiongastronomica.com": ""
    };
    var label = "";
    if (source) {
      var key = source.toLowerCase();
      if (/^google\./.test(key) || key === "google") key = "google";
      if (/^bing\./.test(key)) key = "bing";
      label = friendly.hasOwnProperty(key) ? friendly[key] : source;
    }
    set("sessionStorage", "sec_origen", JSON.stringify({
      page: pageSlug(),
      source: label || "visita directa"
    }));
  })();

  function originText() {
    var o = null;
    try { o = JSON.parse(get("sessionStorage", "sec_origen") || "null"); } catch (e) { /* ignore */ }
    var current = PAGE_NAMES[pageSlug()] || "Cotizar";
    var params = new URLSearchParams(location.search);
    var from = params.get("desde");
    var fromName = from && PAGE_NAMES.hasOwnProperty(from) ? PAGE_NAMES[from] : current;
    var source = o ? o.source : "visita directa";
    return "Enviado desde la página «" + fromName + "» · llegó por " + source;
  }

  /* ---------- Analytics (only after consent) ---------- */
  var gaLoaded = false;
  function loadAnalytics() {
    if (gaLoaded || !/^G-[A-Z0-9]+$/.test(CONFIG.gaId) || /X{6,}/.test(CONFIG.gaId)) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", CONFIG.gaId);
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + CONFIG.gaId;
    document.head.appendChild(s);
  }
  function track(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
  }

  /* ---------- Cookie notice ---------- */
  var banner = document.querySelector(".cookie");
  var consent = get("localStorage", "sec_cookies");
  if (consent === "si") loadAnalytics();
  else if (!consent && banner) banner.classList.add("show");

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-cookies]");
    if (!t) return;
    var choice = t.getAttribute("data-cookies");
    if (choice === "abrir") { if (banner) banner.classList.add("show"); return; }
    set("localStorage", "sec_cookies", choice);
    if (banner) banner.classList.remove("show");
    if (choice === "si") loadAnalytics();
  });

  /* ---------- Contact click tracking ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    if (/^https:\/\/wa\.me\//.test(href)) track("contact_whatsapp", { page: pageSlug() || "inicio" });
    else if (/^tel:/.test(href)) track("contact_phone", { page: pageSlug() || "inicio" });
    else if (/^mailto:/.test(href)) track("contact_email", { page: pageSlug() || "inicio" });
  });

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbCap = lightbox.querySelector("p");
    var lastFocus = null;
    document.querySelectorAll(".gallery button[data-full]").forEach(function (b) {
      b.addEventListener("click", function () {
        lastFocus = b;
        lbImg.src = b.getAttribute("data-full");
        lbImg.alt = b.querySelector("img").alt;
        lbCap.textContent = b.querySelector("img").alt;
        lightbox.classList.add("open");
        lightbox.querySelector(".lightbox-close").focus();
      });
    });
    function close() {
      lightbox.classList.remove("open");
      lbImg.removeAttribute("src");
      if (lastFocus) lastFocus.focus();
    }
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox || e.target.closest(".lightbox-close")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && lightbox.classList.contains("open")) close(); });
  }

  /* ---------- Quote form → WhatsApp / email ---------- */
  var form = document.getElementById("cotizador");
  if (form) {
    var params = new URLSearchParams(location.search);
    var tipo = params.get("tipo");
    if (tipo) {
      var radio = form.querySelector('input[name="tipo"][value="' + tipo.replace(/"/g, "") + '"]');
      if (radio) radio.checked = true;
    }
    var dateInput = form.querySelector("#fecha");
    if (dateInput) {
      var today = new Date();
      dateInput.min = today.toISOString().slice(0, 10);
    }

    function formatDate(value) {
      if (!value) return "Aún no tengo fecha";
      var p = value.split("-");
      var d = new Date(+p[0], +p[1] - 1, +p[2]);
      var txt = d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      return txt.charAt(0).toUpperCase() + txt.slice(1);
    }

    function buildMessage() {
      var data = new FormData(form);
      var tipoSel = form.querySelector('input[name="tipo"]:checked');
      var lines = [
        "Hola, quiero cotizar un evento en Las Secoyas.",
        "",
        "• Tipo de evento: " + (tipoSel ? tipoSel.getAttribute("data-label") : "Por definir"),
        "• Fecha: " + formatDate(data.get("fecha")) + (data.get("flexible") ? " (fecha flexible)" : ""),
        "• Invitados: " + (data.get("invitados") || "Por definir"),
        "• Nombre: " + (data.get("nombre") || "").trim()
      ];
      var tel = (data.get("telefono") || "").trim();
      if (tel) lines.push("• Teléfono: " + tel);
      var msg = (data.get("mensaje") || "").trim();
      if (msg) lines.push("• Comentario: " + msg);
      lines.push("", "(" + originText() + ")");
      return lines.join("\n");
    }

    function valid() {
      var err = form.querySelector(".form-error");
      var nombre = form.querySelector("#nombre");
      var ok = form.querySelector('input[name="tipo"]:checked') && nombre.value.trim().length > 1;
      err.classList.toggle("show", !ok);
      if (!ok) {
        err.textContent = !form.querySelector('input[name="tipo"]:checked')
          ? "Elige el tipo de evento para continuar."
          : "Escribe tu nombre para continuar.";
      }
      return ok;
    }

    function leadParams(method) {
      var tipoSel = form.querySelector('input[name="tipo"]:checked');
      return {
        method: method,
        event_type: tipoSel ? tipoSel.value : "",
        guests: form.querySelector("#invitados").value || "",
        page: params.get("desde") || pageSlug() || "cotizar"
      };
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!valid()) return;
      track("generate_lead", leadParams("whatsapp"));
      window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(buildMessage()), "_blank", "noopener");
    });

    var emailBtn = form.querySelector("[data-send-email]");
    if (emailBtn) {
      emailBtn.addEventListener("click", function () {
        if (!valid()) return;
        track("generate_lead", leadParams("email"));
        var tipoSel = form.querySelector('input[name="tipo"]:checked');
        var subject = "Cotización: " + tipoSel.getAttribute("data-label") + " en Las Secoyas";
        location.href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(buildMessage());
      });
    }
  }
})();
