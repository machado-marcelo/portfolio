
function setDefaultThemeOptions() {
 const isVisitorBrowserPreferenceDark =  window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeStyleLink = document.getElementById('theme-style-link');

  themeStyleLink.href = isVisitorBrowserPreferenceDark
      ? 'styles/dark.css'
      : 'styles/light.css';
}

function listenVisitorBrowserColorPreferenceChange() {
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      setDefaultThemeOptions()
    });
}