function fillLanguageOptions(activeLanguageOption) {

  const availableLanguages = ['pt-br', 'en-us'];
  const wrapper = document.getElementById('language-dropdown-wrapper');

  wrapper.innerHTML = availableLanguages.filter((lang) => lang !== activeLanguageOption)
    .map((lang) => {
      return `<div onclick="setLanguage('${lang}')" class="rounded-button flag-button">
        <img class="flag-img" src="./languages/${lang}/flag.svg"/>
      </div>`;
    })
    .join('');
}


async function setLanguage(state) {
  
  const langData = await (await fetch(`languages/${state}/data.json`)).json()

  if (!!langData) {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      
      const key = element.getAttribute('data-i18n') || '';
      
      if (element.tagName === 'IMG' && key === 'flag_url') {
        element.src = `./languages/${state}/flag.svg`;
      }

      if (element.tagName === 'A' && key === 'resume_url') {
        element.href = langData[key];
      } else {
        element.textContent = langData[key];
      }
    });

    setMenuState('language', false);
    fillLanguageOptions(state);
  }
}

function setDefaultLanguageOptions() { 
  
  const visitorLanguagePrefence = navigator.language;

  if (visitorLanguagePrefence.startsWith('pt')) {
    setLanguage('pt-br');
    return;
  } 
 
  setLanguage('en-us');  
  
}