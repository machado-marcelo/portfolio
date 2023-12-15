fillThemeOptions();
setDefaultThemeOptions();
listenClickAndCloseOpenedMenus();
listenVisitorBrowserColorPreferenceChange();

function listenClickAndCloseOpenedMenus() {
  document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('theme-button') && document.getElementById('theme-switcher-container').classList.contains('active-rounded-button')) {
      setMenuState('theme', false);
    }
  });    
}

function toogleMenu(menuCode) {
  const wrapper = document.getElementById(`${menuCode}-dropdown-wrapper`);
  setMenuState(menuCode,!wrapper.classList.contains('dropdown-content-visible'));
}

function setMenuState(menuCode, newState) {
  
  const button = document.getElementById(`${menuCode}-switcher-container`);
  const wrapper = document.getElementById(`${menuCode}-dropdown-wrapper`);

  if(menuCode === 'theme' && !window.localStorage.getItem('theme')) {
    changeThemeButtonIcon(newState);
  }

  if (newState) {
    button.classList = 'dropdown active-rounded-button';
    wrapper.classList = ['dropdown-content-visible'];
    return;
  } 
  
  button.classList = 'dropdown rounded-button';
  wrapper.classList = ['dropdown-content-hidden'];
  
}