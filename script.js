
const languageSelect = document.querySelector("#lang");

function setLanguage(language) {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-en]").forEach((element) => {
    const translation = element.dataset[language];
    if (translation) element.innerHTML = translation;
  });
  if (languageSelect) languageSelect.value = language;
  try {
    localStorage.setItem("anno-language", language);
  } catch (error) {
    // The site still works when browser storage is unavailable.
  }
}

if (languageSelect) {
  languageSelect.addEventListener("change", (event) => setLanguage(event.target.value));
}

let preferredLanguage = "en";
try {
  preferredLanguage = localStorage.getItem("anno-language") || "en";
} catch (error) {
  // Use English as the default when browser storage is unavailable.
}
setLanguage(preferredLanguage);

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#nav");

function closeMenu() {
  if (!menuButton || !navigation) return;
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });
}
