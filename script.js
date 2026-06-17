const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

const closeMenu = () => {
  if (!navToggle || !navMenu) return;

  navToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

const openMenu = () => {
  if (!navToggle || !navMenu) return;

  navToggle.setAttribute("aria-expanded", "true");
  navMenu.classList.add("is-open");
  document.body.classList.add("nav-open");
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1024px)").matches) closeMenu();
  });
}

document.querySelectorAll("a[href]").forEach((link) => {
  link.setAttribute("target", "_blank");
  const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
  rel.add("noopener");
  rel.add("noreferrer");
  link.setAttribute("rel", [...rel].join(" "));
});

const serviceDetails = {
  ginecologia: {
    title: "Ginecología",
    description: "Atención orientada a la salud femenina, controles preventivos y seguimiento oportuno según cada etapa.",
    points: ["Valoración médica y orientación clara.", "Controles preventivos y seguimiento.", "Coordinación con ecografía o laboratorio si se requiere."],
    imageAlt: "Consulta ginecológica y diagnóstico en centro médico",
  },
  nutricion: {
    title: "Nutrición",
    description: "Acompañamiento nutricional para mejorar hábitos, controlar objetivos de salud y tomar decisiones sostenibles.",
    points: ["Evaluación de hábitos y necesidades.", "Plan de alimentación personalizado.", "Seguimiento para ajustar avances."],
    imageAlt: "Orientación nutricional personalizada",
  },
  cardiologia: {
    title: "Cardiología",
    description: "Valoración cardiovascular para pacientes que buscan prevención, control y revisión de síntomas o antecedentes.",
    points: ["Consulta y evaluación clínica.", "Orientación sobre factores de riesgo.", "Derivación a exámenes complementarios si aplica."],
    imageAlt: "Atención cardiológica en consulta médica",
  },
  urologia: {
    title: "Urología",
    description: "Atención especializada para molestias urinarias, controles preventivos y seguimiento de salud urológica.",
    points: ["Evaluación de síntomas y antecedentes.", "Orientación diagnóstica.", "Seguimiento según indicación médica."],
    imageAlt: "Consulta de urología en centro médico",
  },
  medicina: {
    title: "Medicina General",
    description: "Primer punto de atención para evaluar síntomas, resolver dudas y definir el siguiente paso de cuidado.",
    points: ["Valoración inicial integral.", "Tratamiento u orientación médica.", "Referencia a especialidad si se necesita."],
    imageAlt: "Consulta de medicina general",
  },
  ecografia: {
    title: "Ecografía",
    description: "Imagen diagnóstica no invasiva para apoyar la valoración médica con información clara y oportuna.",
    points: ["Estudios por indicación médica.", "Apoyo diagnóstico para especialistas.", "Atención coordinada con consulta."],
    imageAlt: "Ecografía e imagen diagnóstica",
  },
  psicologia: {
    title: "Psicología",
    description: "Espacio profesional para acompañar bienestar emocional, procesos personales y necesidades de orientación.",
    points: ["Escucha profesional y confidencial.", "Orientación según el motivo de consulta.", "Seguimiento terapéutico cuando corresponde."],
    imageAlt: "Atención psicológica profesional",
  },
  laboratorio: {
    title: "Laboratorio Clínico",
    description: "Pruebas clínicas para complementar diagnósticos, controles y seguimiento médico con resultados útiles.",
    points: ["Exámenes de apoyo diagnóstico.", "Coordinación con consulta médica.", "Resultados para decisiones oportunas."],
    imageAlt: "Laboratorio clínico y toma de muestras",
  },
  odontologia: {
    title: "Odontología",
    description: "Atención dental para prevención, revisión, tratamiento y cuidado de la salud oral de la familia.",
    points: ["Evaluación odontológica.", "Prevención y tratamiento dental.", "Orientación para mantener salud oral."],
    imageAlt: "Atención odontológica en clínica",
  },
};

const serviceCards = document.querySelectorAll(".service-card");
const serviceList = document.querySelector(".service-list");
const serviceDetail = document.querySelector("#service-detail");
const serviceTitle = document.querySelector("#service-detail-title");
const serviceDescription = document.querySelector("#service-detail-description");
const servicePoints = document.querySelector("#service-detail-points");
const serviceImage = document.querySelector("#service-detail-image");

const placeServiceDetail = (card) => {
  if (!serviceList || !serviceDetail) return;

  const cards = [...serviceCards];
  const cardIndex = cards.indexOf(card);
  const columnCount = getComputedStyle(serviceList)
    .gridTemplateColumns
    .split(" ")
    .filter(Boolean).length || 1;
  const rowEndIndex = Math.min(cards.length - 1, Math.floor(cardIndex / columnCount) * columnCount + columnCount - 1);
  cards[rowEndIndex].after(serviceDetail);
};

const setActiveService = (card) => {
  if (!serviceDetail || !serviceTitle || !serviceDescription || !servicePoints || !serviceImage) return;

  const serviceId = card.dataset.service;
  const detail = serviceDetails[serviceId];
  if (!detail) return;

  const isOpen = card.classList.contains("is-active");
  serviceCards.forEach((item) => {
    item.classList.remove("is-active");
    item.setAttribute("aria-expanded", "false");
  });

  if (isOpen) {
    serviceDetail.hidden = true;
    return;
  }

  serviceTitle.textContent = detail.title;
  serviceDescription.textContent = detail.description;
  serviceImage.alt = detail.imageAlt;
  servicePoints.replaceChildren(
    ...detail.points.map((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      return item;
    })
  );

  placeServiceDetail(card);
  card.classList.add("is-active");
  card.setAttribute("aria-expanded", "true");
  serviceDetail.hidden = false;
};

serviceCards.forEach((card) => {
  card.addEventListener("click", () => setActiveService(card));
});

const pushDataLayerEvent = (eventName, params = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
};

const trackLeadEvent = (eventName, params = {}) => {
  pushDataLayerEvent(eventName, params);

  // Meta Pixel: conectar aquí fbq("track", "Lead") o fbq("trackCustom", eventName, params).
  // Google Ads: conectar aquí gtag("event", "conversion", { send_to: "AW-XXXX/CONVERSION_LABEL" }).
  // Google Analytics / GTM: dataLayer.push({ event: eventName }) ya queda preparado arriba.
  // Importante: no enviar datos personales sensibles en eventos.
};

const trackedEvents = {
  whatsapp_click: "whatsapp_click",
  phone_click: "phone_click",
  maps_click: "maps_click",
  social_click: "social_click",
  lead_submit: "lead_submit",
};

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => {
    const eventName = element.getAttribute("data-track");
    if (!eventName || !trackedEvents[eventName]) return;

    trackLeadEvent(eventName, {
      link_text: element.textContent.trim().replace(/\s+/g, " ").slice(0, 80),
      link_url: element.getAttribute("href") || "",
    });
  });
});

document.querySelectorAll("form[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", () => {
    trackLeadEvent("lead_submit", {
      form_id: form.id || "lead_form",
    });
  });
});
