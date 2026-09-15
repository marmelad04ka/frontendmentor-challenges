import { switcherContainerDom, moveCircleSwitcherContainerDom } from "../constants/dom-elements.js";

const THEMES = {
    dark:   { 
        switcher: 'align-start',  
        html: 'theme-dark',   
        opposite: ['theme-light', 'theme-custom'], 
        label: 'Dark theme',
        next: 'light', },
    light:  { 
        switcher: 'align-center', 
        html: 'theme-light',  
        opposite: ['theme-dark', 'theme-custom'], 
        label: 'Light theme',
        next: 'custom', },
    custom: { 
        switcher: 'align-end',    
        html: 'theme-custom', 
        opposite: ['theme-light', 'theme-dark'], 
        label: 'Custom theme',
        next: 'dark', },
};

export function setTheme(theme) {
    const config = THEMES[theme];

    switcherContainerDom.classList.remove(...Object.values(THEMES).map(t => t.switcher));
    switcherContainerDom.classList.add(config.switcher);

    document.documentElement.classList.remove(...config.opposite);
    document.documentElement.classList.add(config.html);

    localStorage.setItem('theme', theme);

    updateSwitcherAria(theme);
}

function updateSwitcherAria(theme) {
  const current = THEMES[theme];
  const next = THEMES[current.next];

  moveCircleSwitcherContainerDom.setAttribute( 'aria-label', `${current.label}. Switch to ${next.label.toLowerCase()}` );
}