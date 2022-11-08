import surahId from "./surahNameId.js";
const surahSelfDiv = document.querySelector(".surah__self");
const allSurahDiv = document.querySelector(".surah__names");
const surahToggleBtn = document.querySelector(".show__surah__toggle");

allSurahDiv.innerHTML = `
  ${surahId.map((surah) => {
    return `<button id="${surah.id}" class="${surah.name} surah__name__btn">${surah.id}. ${surah.name}</button>`;
  })}
`;

surahToggleBtn.addEventListener("click", () => {
  document.querySelector(".surah__names").classList.toggle("active");
});

async function getQuranEnglish(id) {
  // http://api.alquran.cloud/v1/surah/1/editions/en.asad
  const response = await fetch(
    `https://api.alquran.cloud/v1/surah/${id}/editions/en.asad`
  );
  const englishData = await response.json();
  return englishData;
}

async function getQuranArabic(id) {
  const response = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
  const arabicData = await response.json();
  return arabicData;
}

// getting surah names id
document.querySelectorAll(".surah__name__btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelector(".surah__names").classList.toggle("active");
    getQuranEnglish(e.target.id).then((english) => {
      document.querySelector(
        ".surah__name .english__name"
      ).innerHTML = `<h1>${english.data[0].englishName}</h1>`;
      document.querySelector(".english").innerHTML = english.data[0].ayahs
        .map((ayah) => {
          return `<p>${ayah.text}</p>`;
        })
        .join("");
    });

    getQuranArabic(e.target.id).then((arabic) => {
      document.querySelector(
        ".surah__name .arabic__name"
      ).innerHTML = `<h1>${arabic.data.name}</h1>`;
      document.querySelector(".arabic").innerHTML = arabic.data.ayahs
        .map((ayah) => {
          return `<p>${ayah.text}</p>`;
        })
        .join("");
    });
  });
});
