"use strict";
let NavigatorLang = window.navigator.language.slice(0, 2);
let DataLang = {};
let defaultLang = {};
let url = `/js/lang/${NavigatorLang}.json?v=${versionning}`;
async function InitLang() {
    document.documentElement.lang = NavigatorLang;
    await loadLanguage('en');
    if (NavigatorLang !== 'en') {
        switch (NavigatorLang) {
            case 'fr':
            case 'en':
            case 'jp':
            case 'zh':
            case 'ru':
                await loadLanguage(NavigatorLang);
                break;
            default:
                break;
        }
    }
}
async function loadLanguage(languageCode) {
    try {
        const response = await fetch(`/js/lang/${languageCode}.json?v=${versionning}`);
        if (response.ok) {
            const data = await response.json();
            if (languageCode === 'en') {
                defaultLang = data;
            }
            DataLang = { ...defaultLang, ...data };
            updateFonts(languageCode);
        }
    }
    catch (error) {
        console.error(`Erreur lors du chargement de la langue ${languageCode}:`, error);
    }
}
function updateFonts(languageCode) {
    if (['ru', 'be'].includes(languageCode)) {
        document.documentElement.style.setProperty('--font-B', 'ComfortaaB');
        document.documentElement.style.setProperty('--font', 'Comfortaa');
        document.documentElement.style.setProperty('--font-M', 'ComfortaaM');
        document.documentElement.style.setProperty('--font-tchat', 'Comfortaa');
    }
}
async function changeLanguage(selectedLang) {
    NavigatorLang = selectedLang;
    document.documentElement.lang = NavigatorLang;
    await loadLanguage(NavigatorLang);
    translateDocument();
}
function Lang(text) {
    return DataLang[text] || defaultLang[text] || text;
}
InitLang();
