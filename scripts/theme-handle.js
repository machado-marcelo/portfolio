function fillThemeOptions() {
  let activeThemeOption;

  if (!window.localStorage.getItem('theme')) {
    activeThemeOption = 'system';
  } else {
    activeThemeOption = window.localStorage.getItem('theme');
  }

  const themeOtions = ['light', 'dark', 'system'];
  const wrapper = document.getElementById('theme-dropdown-wrapper');

  wrapper.innerHTML = themeOtions
    .filter((themeOtion) => themeOtion !== activeThemeOption)
    .map((themeOtion) => {
      return `<div onclick="setTheme('${themeOtion}', true)" class="rounded-button theme-button">
      <object id="theme-switcher-icon" data="assets/theme-${themeOtion}-icon.svg"></object>
      </div>`;
    })
    .join('');
}

function changeThemeButtonIcon(menuState) {
  const themeSwitcherButtonIcon = document.getElementById('theme-switcher-icon');
  const themeStyleLink = document.getElementById('theme-style-link');

  if (menuState) {
    themeSwitcherButtonIcon.data = './assets/theme-system-icon.svg';
    return;
  } 
  
  themeSwitcherButtonIcon.data = themeStyleLink.href.includes('light')
  ? './assets/theme-light-icon.svg'
  : './assets/theme-dark-icon.svg';

}

function setTheme(state, save) {
  const isVisitorBrowserPreferenceDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeStyleLink = document.getElementById('theme-style-link');
  const themeSwitcherButtonIcon = document.getElementById('theme-switcher-icon');

  if (state === 'system') {
    themeStyleLink.href = isVisitorBrowserPreferenceDark
      ? './styles/dark.css'
      : './styles/light.css';
    themeSwitcherButtonIcon.data = isVisitorBrowserPreferenceDark
      ? './assets/theme-dark-icon.svg'
      : './assets/theme-light-icon.svg';
  }

  if (state === 'dark') {
    themeStyleLink.href = './styles/dark.css';
    themeSwitcherButtonIcon.data = './assets/theme-dark-icon.svg';
  }

  if (state === 'light') {
    themeStyleLink.href = './styles/light.css';
    themeSwitcherButtonIcon.data = './assets/theme-light-icon.svg';
  }

  if (save) {
    if (state === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', state);
    }
  }

  setMenuState('theme', false);
  fillThemeOptions();
}

function setDefaultThemeOptions() {
  const customThemePreference = window.localStorage.getItem('theme');

  if (!!customThemePreference) {
    setTheme(customThemePreference, true);
  } else {
    setTheme(
      window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)')
          .matches ? 'dark' : 'light'
    );
  }
}

function listenVisitorBrowserColorPreferenceChange() {
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      if (!window.localStorage.getItem('theme')) {
        setTheme(
          window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)')
              .matches ? 'dark' : 'light'
        );
      }
    });
}
