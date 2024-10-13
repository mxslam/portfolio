let NavigatorLang = window.navigator.language.slice(0, 2);
let DataLang: { [key: string]: string } = {};
let defaultLang: { [key: string]: string } = {};

let url = `/js/lang/${NavigatorLang}.json?v=${versionning}`;

async function InitLang() {
  document.documentElement.lang = NavigatorLang;

  // Charge la langue par défaut anglaise, puis la langue choisie
  await loadLanguage('en'); // Charge en premier l'anglais comme langue par défaut
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
    // Charge la langue du navigateur ensuite
  }
}

// Fonction asynchrone pour charger la langue
async function loadLanguage(languageCode: string) {
  try {
    const response = await fetch(
      `/js/lang/${languageCode}.json?v=${versionning}`
    );
    if (response.ok) {
      const data = await response.json();

      // Si on charge l'anglais, on le garde en tant que `defaultLang`
      if (languageCode === 'en') {
        defaultLang = data;
      }

      // Merge des traductions : priorité à la langue courante, puis aux valeurs de `defaultLang`
      DataLang = { ...defaultLang, ...data };
      updateFonts(languageCode);
    }
  } catch (error) {
    console.error(
      `Erreur lors du chargement de la langue ${languageCode}:`,
      error
    );
  }
}

// Mise à jour des polices en fonction de la langue
function updateFonts(languageCode: string) {
  if (['ru', 'be'].includes(languageCode)) {
    document.documentElement.style.setProperty('--font-B', 'ComfortaaB');
    document.documentElement.style.setProperty('--font', 'Comfortaa');
    document.documentElement.style.setProperty('--font-M', 'ComfortaaM');
    document.documentElement.style.setProperty('--font-tchat', 'Comfortaa');
  }
}

// Fonction pour changer la langue dynamiquement via une liste de sélection
async function changeLanguage(selectedLang: string) {
  NavigatorLang = selectedLang;
  document.documentElement.lang = NavigatorLang;
  await loadLanguage(NavigatorLang);
  //@ts-ignore
  translateDocument();
}

// Fonction de traduction qui utilise la langue par défaut en cas de manque
function Lang(text: string): string {
  return DataLang[text] || defaultLang[text] || text; // Renvoie la valeur en anglais ou le texte original
}

// Initialisation de la langue au chargement de la page
InitLang();
