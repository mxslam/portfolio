async function LoadHomePage() {
  ClearContent('header');
  ChangeURL(page);
  await ImportComponent('selectLang', 'main');
  await ImportComponent('mainView', 'main', false);

  //@ts-ignore
  translateDocument();
}
