/*

*/

import svgData from './Design/svg-data-inkscape.svg';
import codeData from './code-data.json';

// Creates global variables used in on-init and on-render
const globalDefs = () => {
  window.svgData = svgData;
  window.codeData = codeData;
  window.data = {
    series: []
  };
  window.options = {};
  window.theme = {
    isDark: false,
    isLight: true
  };

  window.htmlNode = document
    .getElementById('shadow-container')
    .attachShadow({ mode: 'open' });
};

const addSvgData = () => {
  htmlNode.innerHTML = `<style></style><div>${svgData}</div>`;
};

const themeHandler = () => {
  const url = new URL(window.location.href);
  const currentTheme = url.searchParams.get('theme');

  const lightThemeButton = document.getElementById('light-theme-button');
  const darkThemeButton = document.getElementById('dark-theme-button');

  lightThemeButton.onclick = () => {
    url.searchParams.delete('theme');
    url.searchParams.append('theme', 'light');
    window.location.href = url.href;
  };

  darkThemeButton.onclick = () => {
    url.searchParams.delete('theme');
    url.searchParams.append('theme', 'dark');
    window.location.href = url.href;
  };

  if (currentTheme == 'dark') {
    theme.isDark = true;
    theme.isLight = false;

    document.body.style.background = '#0b0c0e';
    document.body.style.color = '#d8d9da';
  }
};

// Loads on-render and executes it each time the refresh button is pressed
const metricHandler = () => {
  let onRender: Function | null;
  const onRenderPath = './build/on-render.js';

  const client = new XMLHttpRequest();
  client.open('GET', onRenderPath);
  client.onreadystatechange = function () {
    if (client.readyState == 4 && client.status == 200) {
      /*
        If the generated code is being evaluated as a string with the eval() function or via new Function(),
        then the source origin will be the page’s origin.

        https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit
      */
      const SOURCE_MAP_PATH = onRenderPath + '.map';
      onRender = new Function(
        `${client.responseText}\n//# sourceMappingURL=${SOURCE_MAP_PATH}`
      );
    }
  };
  client.send();

  document.getElementById('refresh-button').onclick = function () {
    onRender();
  };
};

const initialize = () => {
  globalDefs();
  addSvgData();
  metricHandler();
  themeHandler();
};

initialize();
