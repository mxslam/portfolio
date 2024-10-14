let modalTitle = document.getElementById('title_modal');
let modalContent = document.getElementById('modal_content');

function updateModalContent(first = false) {
  const page = getRoute();
  if (currentPage === page) return;

  currentPage = page;
  if (!first) {
    modalTitle.classList.add('fade-out');
    modalContent.classList.add('fade-out');

    modalTitle.addEventListener('animationend', handleFadeOutEnd, {
      once: true,
    });
  } else {
    updateContent(page);
  }
}

function handleFadeOutEnd() {
  modalTitle.classList.remove('fade-out');
  modalContent.classList.remove('fade-out');

  updateContent(currentPage);

  modalTitle.classList.add('fade-in');
  modalContent.classList.add('fade-in');

  modalTitle.addEventListener(
    'animationend',
    () => {
      modalTitle.classList.remove('fade-in');
      modalContent.classList.remove('fade-in');
    },
    { once: true }
  );
}

function updateContent(page) {
  translateDocument();

  switch (page) {
    case 'accueil':
    default:
      modalTitle.textContent = 'Bienvenue';
      modalContent.innerHTML = 'Ceci est une briève présentation ';
      break;
    case 'presentation':
      modalTitle.textContent = 'Présentation';
      break;
    case 'projets':
      modalTitle.textContent = 'Projets';
      modalContent.textContent = 'Détails du projet sélectionné.';
      break;
  }
}

// Premier appel sans animation de sortie
updateModalContent(true);

// Gérer les mises à jour du contenu avec les événements
document.addEventListener('click', () => updateModalContent());
window.addEventListener('popstate', () => updateModalContent());
