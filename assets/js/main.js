(function () {
  "use strict";

  const config = window.TAILOR_CONFIG;

  function selectAll(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function encode(value) {
    return encodeURIComponent(value);
  }

  function buildLinks() {
    const phoneHref = "tel:" + config.contact.phoneRaw;
    const whatsappBase = "https://wa.me/" + config.contact.whatsappRaw;
    const whatsappMessage = config.contact.whatsappMessageGeneral;
    const whatsappMessageLink = whatsappBase + "?text=" + encode(whatsappMessage);
    const mapEmbed = config.location.mapEmbedUrlOverride
      ? config.location.mapEmbedUrlOverride
      : "https://www.google.com/maps?q=" + encode(config.location.mapSearchAddress) + "&output=embed";
    const mapDirections = config.location.mapDirectionsUrlOverride
      ? config.location.mapDirectionsUrlOverride
      : "https://www.google.com/maps/dir/?api=1&destination=" + encode(config.location.mapSearchAddress);

    return {
      phoneHref,
      whatsappBase,
      whatsappMessageLink,
      mapEmbed,
      mapDirections
    };
  }

  function getCanonicalUrl() {
    if (config.seo.canonicalUrl) {
      return config.seo.canonicalUrl;
    }

    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.href;
  }

  function hydrateBusinessData() {
    const links = buildLinks();

    selectAll("[data-business-name]").forEach((el) => {
      el.textContent = config.brand.name;
    });

    selectAll("[data-owner-name]").forEach((el) => {
      el.textContent = config.brand.owner;
    });

    selectAll("[data-phone-display]").forEach((el) => {
      el.textContent = config.contact.phoneDisplay;
    });

    selectAll("[data-address-full]").forEach((el) => {
      el.textContent = config.location.address;
    });

    selectAll(".js-phone-link").forEach((el) => {
      el.setAttribute("href", links.phoneHref);
      el.setAttribute("aria-label", "Call " + config.brand.name);
    });

    selectAll(".js-whatsapp-link").forEach((el) => {
      el.setAttribute("href", links.whatsappBase);
      el.setAttribute("aria-label", "Open WhatsApp chat with " + config.brand.name);
    });

    selectAll(".js-whatsapp-message-link").forEach((el) => {
      el.setAttribute("href", links.whatsappMessageLink);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });

    selectAll(".js-instagram-link").forEach((el) => {
      el.setAttribute("href", config.contact.instagramUrl);
      if (el.textContent.trim().length === 0 || el.textContent === "Instagram") {
        el.textContent = "@" + config.contact.instagramUsername;
      }
    });

    const emailDisplay = document.querySelector("[data-email-display]");
    if (emailDisplay) {
      emailDisplay.textContent = config.contact.emailProvided;
    }

    const mapFrame = document.getElementById("googleMapFrame");
    if (mapFrame) {
      mapFrame.setAttribute("src", links.mapEmbed);
    }

    const mapLink = document.getElementById("mapDirectionsLink");
    if (mapLink) {
      mapLink.setAttribute("href", links.mapDirections);
    }

    const canonical = document.getElementById("canonical-url");
    const canonicalUrl = getCanonicalUrl();
    if (canonical) {
      canonical.setAttribute("href", canonicalUrl);
    }

    const ogUrl = document.getElementById("og-url");
    if (ogUrl) {
      ogUrl.setAttribute("content", canonicalUrl);
    }

    const ogImage = document.getElementById("og-image");
    if (ogImage && config.seo.ogImage) {
      ogImage.setAttribute("content", new URL(config.seo.ogImage, window.location.href).href);
    }

    const year = document.getElementById("currentYear");
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  }

  function setupNavbarState() {
    const navbar = document.getElementById("mainNavbar");
    const backToTop = document.getElementById("backToTop");
    if (!navbar) {
      return;
    }

    const applyScrolledState = () => {
      if (window.scrollY > 40) {
        navbar.classList.add("navbar-scrolled");
        if (backToTop) {
          backToTop.classList.add("show");
        }
      } else {
        navbar.classList.remove("navbar-scrolled");
        if (backToTop) {
          backToTop.classList.remove("show");
        }
      }
    };

    applyScrolledState();
    window.addEventListener("scroll", applyScrolledState, { passive: true });
  }

  function setupActiveNav() {
    const links = selectAll(".navbar .nav-link");
    const sections = links
      .map((link) => {
        const id = link.getAttribute("href");
        if (!id || !id.startsWith("#")) {
          return null;
        }
        const section = document.querySelector(id);
        if (!section) {
          return null;
        }
        return { link, section };
      })
      .filter(Boolean);

    if (sections.length === 0) {
      return;
    }

    const onScroll = () => {
      const y = window.scrollY + 140;
      sections.forEach(({ link, section }) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (y >= top && y < bottom) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupSmoothScrollAndMenuClose() {
    const navLinks = selectAll("a[href^='#']");
    const menuElement = document.getElementById("navbarMenu");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId.length < 2) {
          return;
        }
        const target = document.querySelector(targetId);
        if (!target) {
          return;
        }

        event.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start"
        });

        if (menuElement && menuElement.classList.contains("show") && window.bootstrap) {
          const collapse = window.bootstrap.Collapse.getOrCreateInstance(menuElement);
          collapse.hide();
        }
      });
    });

    if (menuElement) {
      menuElement.addEventListener("click", (event) => {
        const link = event.target.closest("a.nav-link");
        if (!link || !window.bootstrap) {
          return;
        }

        window.bootstrap.Collapse.getOrCreateInstance(menuElement).hide();
      });
    }
  }

  function setupAnimations() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add("reduced-motion");
      return;
    }

    if (window.AOS) {
      window.AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 30
      });
    }
  }

  function setStructuredData() {
    const dataEl = document.getElementById("localbusiness-json");
    if (!dataEl) {
      return;
    }

    const links = buildLinks();
    const schema = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "Tailor"],
      "name": config.brand.name,
      "description": "Shree Shakti Tailor has been serving customers since 2001 with 25+ years of owner's tailoring experience.",
      "foundingDate": "2001",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "B-1, Samrath Complex, NR. National Handloom 132Ft. Ring Road, Bhavsar Hostel, New Vadaj",
        "addressLocality": "Ahmedabad",
        "postalCode": "380013",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      },
      "telephone": config.contact.phoneRaw,
      "url": getCanonicalUrl(),
      "image": new URL("assets/images/logo/shakti-tailor-logo-transparent.png", window.location.href).href,
      "sameAs": [config.contact.instagramUrl, links.whatsappBase]
    };

    dataEl.textContent = JSON.stringify(schema);
  }

  document.addEventListener("DOMContentLoaded", function () {
    hydrateBusinessData();
    setupNavbarState();
    setupActiveNav();
    setupSmoothScrollAndMenuClose();
    setupAnimations();
    setStructuredData();
  });
})();
