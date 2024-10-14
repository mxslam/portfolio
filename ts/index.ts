document.addEventListener('DOMContentLoaded', async () => {
  await InitLang();
  InitDom();
  //@ts-ignore
  translateDocument();
});
function InitDom() {
  Route();
}

async function ImportComponent(
  name: string,
  dir: string = 'body',
  prepend: boolean = false
): Promise<void> {
  try {
    // Utilise fetch pour obtenir le fichier HTML
    let filePath = `/components/${name}/${name}.html`;
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Erreur: Impossible de charger le fichier ${filePath}`);
    }

    // Récupère le contenu HTML sous forme de texte
    const htmlContent = await response.text();

    // Crée un conteneur temporaire pour parser le contenu HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlContent;

    // Récupère le template, le style, et le script
    const template = tempContainer.querySelector('template');
    const style = tempContainer.querySelector('style');
    const script = tempContainer.querySelector('script');

    // Ajoute le contenu du template dans le DOM
    if (template) {
      const directory = document.querySelector(dir);
      if (directory) {
        if (prepend) {
          directory.insertBefore(
            template.content.cloneNode(true),
            directory.firstChild
          );
        } else {
          directory.appendChild(template.content.cloneNode(true));
        }
      }
    }

    // Injecte les styles dans le head de la page
    if (style) {
      document.head.appendChild(style.cloneNode(true));
    }

    // Si un script est présent, recrée le script pour qu'il soit exécuté
    if (script) {
      const newScript = document.createElement('script');
      if (script.src) {
        // Si le script a un attribut src, utilise-le pour garantir l'exécution
        newScript.src = script.src;
      } else {
        // Sinon, copie le contenu du script
        newScript.textContent = script.textContent;
      }
      document.body.appendChild(newScript);
    }
  } catch (error) {
    console.error("Erreur lors de l'import du fichier HTML :", error);
  }
}
