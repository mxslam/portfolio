async function translateDocument() {
  document.querySelector('#project_text') &&
    (document.querySelector('#project_text').textContent = Lang('Projets'));

  document.querySelector('#inspiration_text') &&
    (document.querySelector('#inspiration_text').textContent =
      Lang('Inspirations'));

  document.querySelector('#experience_text') &&
    (document.querySelector('#experience_text').textContent =
      Lang('Expérience'));

  document.querySelector('#contact_text') &&
    (document.querySelector('#contact_text').textContent =
      Lang('Contactez-moi'));

  document.querySelector('#modal_content') &&
    (document.querySelector('#modal_content').innerHTML = Lang(
      'Presentation Contenu'
    ));
}
