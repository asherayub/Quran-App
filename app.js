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
    getQuranEnglish(e.target.id).then((english) => {
      document.querySelector(".english").innerHTML = english.data[0].ayahs
        .map((ayah) => {
          return `<p><span id="verse no">${ayah.number}</span>. ${ayah.text}</p>`;
        })
        .join("");
    });

    getQuranArabic(e.target.id).then((arabic) => {
      console.log(arabic);
      document.querySelector(".arabic").innerHTML = arabic.data.ayahs
        .map((ayah) => {
          return `<p><span id="verse no">${ayah.number}</span>. ${ayah.text}</p>`;
        })
        .join("");
    });
  });
});
