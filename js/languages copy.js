
// const flagsElement = document.getElementById("flags");
// const textsToChange = document.querySelectorAll("[data-section]");

// const changeLanguage = async (language) => {
//   const requestJson = await fetch(`js/${language}.json`);
//   const texts = await requestJson.json();

//   for (const textToChange of textsToChange) {
//     const section = textToChange.dataset.section;
//     const value = textToChange.dataset.value;
//     textToChange.innerHTML = texts[section][value];
//   }

//   // Almacena el idioma seleccionado en el almacenamiento local del navegador
//   localStorage.setItem("selectedLanguage", language);
// };

// const loadLanguage = () => {
//   // Obtiene el idioma seleccionado almacenado en el almacenamiento local del navegador
//   const selectedLanguage = localStorage.getItem("selectedLanguage");

//   if (selectedLanguage) {
//     changeLanguage(selectedLanguage);
//   } else {
//     // Establece un idioma predeterminado si no se ha seleccionado ninguno
//     changeLanguage("default");
//   }
// };

// flagsElement.addEventListener("click", (e) => {
//   changeLanguage(e.target.parentElement.dataset.language);
// });

// // Carga el idioma al cargar la página
// loadLanguage();

// // const loadLanguage = async () => {
// //   // Verificar si el idioma seleccionado ya está almacenado en el almacenamiento local del navegador
// //   const selectedLanguage = localStorage.getItem("selectedLanguage");

// //   if (selectedLanguage) {
// //     changeLanguage(selectedLanguage);
// //   } else {
// //     // Cargar el archivo "es.json" y almacenar su contenido en el almacenamiento local
// //     const response = await fetch("es.json");
// //     const languageData = await response.json();
// //     localStorage.setItem("selectedLanguage", JSON.stringify(languageData));
// //     changeLanguage(languageData);
// //   }
// // };

// // flagsElement.addEventListener("click", (e) => {
// //   changeLanguage(e.target.parentElement.dataset.language);
// // });

// // // Cargar el idioma al cargar la página
// // loadLanguage();




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
      if (flag.dataset.language !== currentLanguage) {
        img.style.filter = "grayscale(100%)";
      }
    });
  });

  flagsElement.addEventListener("click", (e) => {
    const flagItem = e.target.closest(".flags_items");
    if (flagItem) changeLanguage(flagItem.dataset.language);
  });

  changeLanguage(currentLanguage);

});