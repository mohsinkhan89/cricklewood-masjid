const slides = Array.from(document.querySelectorAll(".hero-slide"));
const hero = document.querySelector(".hero");
const dotsWrap = document.querySelector(".slider-dots");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const menuToggle = document.querySelector(".menu-toggle");
const mainMenu = document.querySelector(".mobile-menu-panel");
const menuClose = document.querySelector(".menu-close");
const menuBackdrop = document.querySelector(".mobile-menu-backdrop");
const hasMultipleSlides = slides.length > 1;
let currentSlide = 0;
let timer;
let lockedScrollY = 0;
const PRAYER_TIMES_MONTH = {
  year: 2026,
  month: 8,
  rows: {
    1: ["04:38", "05:15", "06:10", "13:06", "13:30", "17:41", "18:00", "19:50", "19:55", "21:01", "21:45"],
    2: ["04:40", "05:15", "06:12", "13:05", "13:30", "17:39", "18:00", "19:48", "19:53", "20:59", "21:45"],
    3: ["04:41", "05:15", "06:13", "13:05", "13:30", "17:37", "18:00", "19:46", "19:51", "20:57", "21:45"],
    4: ["04:43", "05:15", "06:15", "13:05", "13:30", "17:35", "18:00", "19:43", "19:48", "20:55", "21:45"],
    5: ["04:45", "05:15", "06:17", "13:04", "13:30", "17:34", "18:00", "19:41", "19:46", "20:53", "21:45"],
    6: ["04:46", "05:15", "06:18", "13:04", "13:30", "17:32", "18:00", "19:39", "19:44", "20:51", "21:45"],
    7: ["04:48", "05:30", "06:20", "13:04", "13:30", "17:30", "17:45", "19:37", "19:42", "20:50", "21:30"],
    8: ["04:49", "05:30", "06:21", "13:03", "13:30", "17:28", "17:45", "19:34", "19:39", "20:47", "21:30"],
    9: ["04:51", "05:30", "06:23", "13:03", "13:30", "17:26", "17:45", "19:32", "19:37", "20:45", "21:30"],
    10: ["04:52", "05:30", "06:24", "13:03", "13:30", "17:25", "17:45", "19:30", "19:35", "20:43", "21:30"],
    11: ["04:54", "05:30", "06:26", "13:02", "13:30", "17:23", "17:45", "19:28", "19:33", "20:42", "21:30"],
    12: ["04:56", "05:30", "06:28", "13:02", "13:30", "17:21", "17:45", "19:25", "19:30", "20:39", "21:30"],
    13: ["04:57", "05:30", "06:29", "13:02", "13:30", "17:19", "17:45", "19:23", "19:28", "20:37", "21:30"],
    14: ["04:59", "05:45", "06:31", "13:01", "13:30", "17:17", "17:30", "19:21", "19:26", "20:35", "21:15"],
    15: ["05:00", "05:45", "06:32", "13:01", "13:30", "17:15", "17:30", "19:18", "19:23", "20:33", "21:15"],
    16: ["05:03", "05:45", "06:34", "13:01", "13:30", "17:13", "17:30", "19:16", "19:21", "20:31", "21:15"],
    17: ["05:05", "05:45", "06:36", "13:00", "13:30", "17:11", "17:30", "19:14", "19:19", "20:29", "21:15"],
    18: ["05:06", "05:45", "06:37", "13:00", "13:30", "17:09", "17:30", "19:11", "19:16", "20:26", "21:15"],
    19: ["05:09", "05:45", "06:39", "12:59", "13:30", "17:07", "17:30", "19:09", "19:14", "20:24", "21:15"],
    20: ["05:10", "05:45", "06:40", "12:59", "13:30", "17:06", "17:30", "19:07", "19:12", "20:22", "21:15"],
    21: ["05:12", "06:00", "06:42", "12:59", "13:30", "17:04", "17:30", "19:04", "19:09", "20:20", "21:00"],
    22: ["05:15", "06:00", "06:44", "12:58", "13:30", "17:02", "17:30", "19:02", "19:07", "20:18", "21:00"],
    23: ["05:16", "06:00", "06:45", "12:58", "13:30", "17:00", "17:30", "19:00", "19:05", "20:16", "21:00"],
    24: ["05:18", "06:00", "06:47", "12:58", "13:30", "16:58", "17:30", "18:58", "19:03", "20:14", "21:00"],
    25: ["05:20", "06:00", "06:48", "12:57", "13:30", "16:56", "17:30", "18:55", "19:00", "20:12", "21:00"],
    26: ["05:22", "06:00", "06:50", "12:57", "13:30", "16:54", "17:30", "18:53", "18:58", "20:10", "21:00"],
    27: ["05:24", "06:00", "06:52", "12:57", "13:30", "16:52", "17:30", "18:51", "18:56", "20:08", "21:00"],
    28: ["05:26", "06:00", "06:53", "12:56", "13:30", "16:50", "17:15", "18:48", "18:53", "20:05", "20:45"],
    29: ["05:28", "06:00", "06:55", "12:56", "13:30", "16:48", "17:15", "18:46", "18:51", "20:03", "20:45"],
    30: ["05:30", "06:00", "06:57", "12:56", "13:30", "16:46", "17:15", "18:44", "18:49", "20:01", "20:45"]
  }
};

const PRAYER_COLUMNS = ["fajrBegins", "fajrJamah", "sunrise", "zuhrBegins", "zuhrJamah", "asrBegins", "asrJamah", "maghribBegins", "maghribJamah", "ishaBegins", "ishaJamah"];
const PRAYER_DISPLAY = [
  { key: "fajr", label: "Fajr", begins: "fajrBegins", jamah: "fajrJamah" },
  { key: "zuhr", label: "Zuhr", begins: "zuhrBegins", jamah: "zuhrJamah" },
  { key: "asr", label: "Asr", begins: "asrBegins", jamah: "asrJamah" },
  { key: "maghrib", label: "Maghrib", begins: "maghribBegins", jamah: "maghribJamah" },
  { key: "isha", label: "Isha", begins: "ishaBegins", jamah: "ishaJamah" }
];
const LONDON_TIME_ZONE = "Europe/London";
function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  document.querySelectorAll(".slider-dots button").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentSlide);
  });
}

function startSlider() {
  if (!hasMultipleSlides) return;
  clearInterval(timer);
  timer = setInterval(() => showSlide(currentSlide + 1), 6000);
}

function hideSliderControls() {
  hero?.classList.add("single-slide");
  [prevBtn, nextBtn, dotsWrap].forEach((control) => {
    if (!control) return;
    control.hidden = true;
    control.setAttribute("aria-hidden", "true");
  });
}

if (dotsWrap && hasMultipleSlides) {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => {
      showSlide(index);
      startSlider();
    });
    dotsWrap.appendChild(dot);
  });
} else {
  hideSliderControls();
}

if (hasMultipleSlides) {
  prevBtn?.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    startSlider();
  });

  nextBtn?.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    startSlider();
  });
}

function lockPageScroll() {
  lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  document.documentElement.classList.add("menu-open");
  document.body.classList.add("menu-open");
  document.body.style.top = `-${lockedScrollY}px`;
}

function unlockPageScroll({ restoreScroll = true } = {}) {
  document.documentElement.classList.remove("menu-open");
  document.body.classList.remove("menu-open");
  document.body.style.top = "";

  if (restoreScroll) {
    window.scrollTo(0, lockedScrollY);
  }
}

function setMenuOpen(isOpen, options = {}) {
  if (!mainMenu) return;

  mainMenu.classList.toggle("open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));

  if (menuBackdrop) {
    menuBackdrop.hidden = !isOpen;
    menuBackdrop.classList.toggle("show", isOpen);
  }

  if (isOpen) {
    lockPageScroll();
  } else {
    unlockPageScroll(options);
  }
}

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!mainMenu?.classList.contains("open"));
});

menuClose?.addEventListener("click", () => setMenuOpen(false));
menuBackdrop?.addEventListener("click", () => setMenuOpen(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});
function getPrayerTime(row, column) {
  return row[PRAYER_COLUMNS.indexOf(column)];
}

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getLondonNowParts() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date());
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const hour = Number(lookup.hour) % 24;

  return {
    year: Number(lookup.year),
    month: Number(lookup.month) - 1,
    day: Number(lookup.day),
    minutes: hour * 60 + Number(lookup.minute)
  };
}

function getPrayerDate(nowParts) {
  return new Date(Date.UTC(nowParts.year, nowParts.month, nowParts.day));
}

function formatGregorianDate(nowParts) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(getPrayerDate(nowParts));
}

function getOrdinalDay(day) {
  if (day > 3 && day < 21) return `${day}th`;

  const suffixes = { 1: "st", 2: "nd", 3: "rd" };
  return `${day}${suffixes[day % 10] || "th"}`;
}

function formatLondonClockTime(nowParts) {
  const hours = Math.floor(nowParts.minutes / 60);
  const minutes = nowParts.minutes % 60;
  const period = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;

  return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
}

function formatHijriDate(nowParts) {
  const parts = new Intl.DateTimeFormat("en-GB-u-ca-islamic-umalqura", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).formatToParts(getPrayerDate(nowParts));
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const month = (lookup.month || "")
    .replace(/Rabi.? II/i, "Rabi' Al-Thani")
    .replace(/Rabi.? I/i, "Rabi' Al-Awwal")
    .replace(/Jumada II/i, "Jumada Al-Thani")
    .replace(/Jumada I/i, "Jumada Al-Awwal");

  return `${lookup.day} ${month} ${lookup.year} AH`;
}

function formatPrayerDateLabel(nowParts) {
  return `${formatGregorianDate(nowParts)} <span aria-hidden="true">&bull;</span> ${formatHijriDate(nowParts)}`;
}

function formatHeaderPrayerDateLabel(nowParts) {
  const month = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    month: "long"
  }).format(getPrayerDate(nowParts));
  const dateTime = `${getOrdinalDay(nowParts.day)} ${month} ${nowParts.year} | ${formatLondonClockTime(nowParts)}`;

  return `<span class="header-date-line">${dateTime}</span><span class="header-hijri-line">${formatHijriDate(nowParts)}</span>`;
}

function getPrayerDay(nowParts) {
  const monthStart = new Date(Date.UTC(PRAYER_TIMES_MONTH.year, PRAYER_TIMES_MONTH.month, 1));
  const today = new Date(Date.UTC(nowParts.year, nowParts.month, nowParts.day));

  if (nowParts.year === PRAYER_TIMES_MONTH.year && nowParts.month === PRAYER_TIMES_MONTH.month) {
    return { day: nowParts.day, isCurrentDate: true };
  }

  return { day: today < monthStart ? 1 : 30, isCurrentDate: false };
}

function getNextPrayer(row, nowMinutes) {
  return PRAYER_DISPLAY.find((prayer) => nowMinutes < toMinutes(getPrayerTime(row, prayer.jamah))) || PRAYER_DISPLAY[0];
}

function renderHeaderNextPrayerWidget(widget, row, dateLabel, activePrayer) {
  const dateTarget = widget.querySelector("[data-prayer-date]");
  const listTarget = widget.querySelector("[data-prayer-list]");

  if (dateTarget) dateTarget.innerHTML = dateLabel;
  if (!listTarget) return;

  listTarget.innerHTML = `
    <a class="header-next-prayer active" href="#prayer-times" aria-label="View today's prayer times">
      <span class="header-next-name">
        <small>Next Namaz</small>
        <b>${activePrayer.label}</b>
      </span>
      <span class="header-next-main">
        <strong>${getPrayerTime(row, activePrayer.jamah)}</strong>
        <em>Jama'ah</em>
      </span>
      <span class="header-next-begins">
        <small>Begins</small>
        <b>${getPrayerTime(row, activePrayer.begins)}</b>
      </span>
    </a>
  `;
}

function renderPrayerTimetable(widget, row, dateLabel, activeKey) {
  const dateTarget = widget.querySelector("[data-prayer-date]");
  const listTarget = widget.querySelector("[data-prayer-list]");

  if (dateTarget) dateTarget.innerHTML = dateLabel;
  if (!listTarget) return;

  const prayerColumns = PRAYER_DISPLAY.map((prayer) => {
    const isActive = prayer.key === activeKey;
    return `
      <div class="prayer-table-column${isActive ? " active" : ""}" data-prayer="${prayer.key}">
        <span class="prayer-name">${prayer.label}</span>
        <strong class="prayer-begins"><span>Begins</span>${getPrayerTime(row, prayer.begins)}</strong>
        <strong class="prayer-jamah"><span>Jama'ah</span>${getPrayerTime(row, prayer.jamah)}</strong>
        ${isActive ? "<em>Next</em>" : ""}
      </div>
    `;
  }).join("");

  listTarget.innerHTML = `
    <a class="prayer-calendar-link" href="#prayer-times">Full Timetable<br>&amp; Calendar</a>
    <div class="prayer-row-labels" aria-hidden="true"><span></span><span>Begins</span><span>Jama'ah</span></div>
    ${prayerColumns}
  `;
}

function renderDailyPrayerSection(row, dateLabel, activeKey) {
  document.querySelectorAll("[data-prayer-section-date]").forEach((target) => {
    target.innerHTML = dateLabel;
  });

  document.querySelectorAll("[data-prayer-full-list]").forEach((target) => {
    const cards = PRAYER_DISPLAY.map((prayer, index) => {
      const isActive = prayer.key === activeKey;
      return `
        <article class="daily-prayer-card${isActive ? " active" : ""}" style="--prayer-delay: ${index * 70}ms">
          <div class="daily-prayer-card-head">
            <span>${isActive ? "Next Prayer" : "Prayer"}</span>
            <h3>${prayer.label}</h3>
          </div>
          <div class="daily-prayer-times">
            <div><span>Begins</span><strong>${getPrayerTime(row, prayer.begins)}</strong></div>
            <div><span>Jama'ah</span><strong>${getPrayerTime(row, prayer.jamah)}</strong></div>
          </div>
        </article>
      `;
    }).join("");

    target.innerHTML = `
      ${cards}
      <article class="daily-prayer-card sunrise-card" style="--prayer-delay: ${PRAYER_DISPLAY.length * 70}ms">
        <div class="daily-prayer-card-head">
          <span>Sunrise</span>
          <h3>Sunrise</h3>
        </div>
        <div class="daily-prayer-times single">
          <div><span>Time</span><strong>${getPrayerTime(row, "sunrise")}</strong></div>
        </div>
      </article>
    `;
  });
}

function updatePrayerWidgets() {
  const nowParts = getLondonNowParts();
  const { day, isCurrentDate } = getPrayerDay(nowParts);
  const row = PRAYER_TIMES_MONTH.rows[day];
  if (!row) return;

  const activePrayer = getNextPrayer(row, nowParts.minutes);
  const activeKey = activePrayer.key;
  const dateLabel = formatPrayerDateLabel(nowParts);
  const headerDateLabel = formatHeaderPrayerDateLabel(nowParts);

  document.querySelectorAll("[data-header-date]").forEach((target) => {
    target.innerHTML = headerDateLabel;
  });

  document.querySelectorAll("[data-prayer-widget]").forEach((widget) => {
    if (widget.dataset.prayerMode === "next") {
      renderHeaderNextPrayerWidget(widget, row, headerDateLabel, activePrayer);
      return;
    }

    renderPrayerTimetable(widget, row, dateLabel, activeKey);
  });

  renderDailyPrayerSection(row, dateLabel, activeKey);
}
document.querySelectorAll(".amount-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".amount-grid button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

const revealTargets = document.querySelectorAll(
  ".section-title, .daily-prayers-head, .daily-prayer-card, .feature-card, .news-card, .event-item, .services article, .donation-box, .newsletter-box, .visit, .quick-panels a, .contact-copy, .contact-detail-list a, .contact-form, .footer-modern > *, .footer-bottom"
);

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

updatePrayerWidgets();
setInterval(updatePrayerWidgets, 60000);
showSlide(0);
startSlider();


function playLordIcon(icon) {
  if (!icon) return;

  if (typeof icon.playFromBeginning === "function") {
    icon.playFromBeginning();
    return;
  }

  if (typeof icon.play === "function") {
    icon.play();
    return;
  }

  icon.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true, view: window }));
  icon.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, view: window }));
}

function stopLordIcon(icon) {
  if (!icon) return;

  if (typeof icon.stop === "function") {
    icon.stop();
    return;
  }

  icon.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true, view: window }));
  icon.dispatchEvent(new MouseEvent("mouseout", { bubbles: true, view: window }));
}

function enableParentLordIconHover() {
  const hoverParents = document.querySelectorAll(
    ".btn-modern, .services article, .quick-panels a, .footer-contact-card, .footer-socials a"
  );

  hoverParents.forEach((parent) => {
    const icons = parent.querySelectorAll("lord-icon");
    if (!icons.length) return;

    parent.addEventListener("mouseenter", () => icons.forEach(playLordIcon));
    parent.addEventListener("focusin", () => icons.forEach(playLordIcon));
    parent.addEventListener("mouseleave", () => icons.forEach(stopLordIcon));
  });
}


function initFacilitiesSwiper() {
  const slider = document.querySelector("[data-facilities-swiper]");
  if (!slider || typeof Swiper === "undefined") return;

  new Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 14,
    loop: true,
    speed: 650,
    grabCursor: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: slider.querySelector(".facilities-pagination"),
      clickable: true
    },
    breakpoints: {
      641: {
        slidesPerView: 2,
        spaceBetween: 22
      },
      981: {
        slidesPerView: 3,
        spaceBetween: 22
      }
    }
  });
}
initFacilitiesSwiper();
enableParentLordIconHover();

const header = document.querySelector(".site-header");
const backToTop = document.querySelector(".back-to-top");
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const navLinks = Array.from(document.querySelectorAll(".main-menu a[href^='#']"));
const sectionIds = ["home", "prayer-times", "news", "events", "services", "support", "visit", "contact"];
const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

function getHeaderOffset() {
  return (header?.offsetHeight || 0) + 12;
}

function scrollToSection(target) {
  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top, behavior: "smooth" });
}

anchorLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || href === "#" || href.length < 2) return;

  const target = document.querySelector(href);
  if (!target) return;

  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (mainMenu?.classList.contains("open")) {
      setMenuOpen(false, { restoreScroll: false });
      requestAnimationFrame(() => scrollToSection(target));
      return;
    }

    scrollToSection(target);
  });
});

function updateActiveNav() {
  const offset = getHeaderOffset() + 80;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= window.scrollY + offset) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });

  backToTop?.classList.toggle("show", window.scrollY > 520);
}

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
updateActiveNav();
