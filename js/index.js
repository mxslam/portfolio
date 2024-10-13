"use strict";
document.addEventListener('DOMContentLoaded', async () => {
    await InitLang();
    InitDom();
    translateDocument();
});
function InitDom() {
    Route();
}
async function ImportComponent(name, dir = 'body', prepend = false) {
    try {
        let filePath = `/components/${name}/${name}.html`;
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Erreur: Impossible de charger le fichier ${filePath}`);
        }
        const htmlContent = await response.text();
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = htmlContent;
        const template = tempContainer.querySelector('template');
        const style = tempContainer.querySelector('style');
        const script = tempContainer.querySelector('script');
        if (template) {
            const directory = document.querySelector(dir);
            if (directory) {
                if (prepend) {
                    directory.insertBefore(template.content.cloneNode(true), directory.firstChild);
                }
                else {
                    directory.appendChild(template.content.cloneNode(true));
                }
            }
        }
        if (style) {
            document.head.appendChild(style.cloneNode(true));
        }
        if (script) {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript);
        }
    }
    catch (error) {
        console.error("Erreur lors de l'import du fichier HTML :", error);
    }
}
