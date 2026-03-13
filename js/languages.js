document.addEventListener("DOMContentLoaded", () => {
  const flagsElement = document.getElementById("flags");
  const textsToChange = document.querySelectorAll("[data-section]");
  let currentLanguage = localStorage.getItem("selectedLanguage") || "es";

  const setActiveFlag = (language) => {
    document.querySelectorAll(".flags_items").forEach((flag) => {
      const img = flag.querySelector("img");
      img.style.filter = flag.dataset.language === language
        ? "grayscale(0%)"
        : "grayscale(100%)";
    });
  };

  const changeLanguage = async (language) => {
    currentLanguage = language;
    localStorage.setItem("selectedLanguage", language);
    setActiveFlag(language);

    const requestJson = await fetch(`js/${language}.json`);
    const texts = await requestJson.json();

    for (const textToChange of textsToChange) {
      const section = textToChange.dataset.section;
      const value = textToChange.dataset.value;
      textToChange.innerHTML = texts[section][value];
    }
  };

  document.querySelectorAll(".flags_items").forEach((flag) => {
    const img = flag.querySelector("img");

    flag.addEventListener("mouseenter", () => {
      img.style.filter = "grayscale(0%)";
    });

    flag.addEventListener("mouseleave", () => {
      // Solo vuelve a gris si NO es el idioma actual
      if (flag.dataset.language !== currentLanguage) {
        img.style.filter = "grayscale(100%)";
      }
    });
  });

  flagsElement.addEventListener("click", (e) => {
    const flagItem = e.target.closest(".flags_items");
    if (flagItem) {
      changeLanguage(flagItem.dataset.language);
    }
  });

  // Inicializa con el idioma guardado
  changeLanguage(currentLanguage);
});