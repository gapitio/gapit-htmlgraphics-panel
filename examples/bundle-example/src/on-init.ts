import formatSI from './components/format-si';

/**
 * Adds autofitpanels parameter to the url.
 * Which is used when going to a different grafana dashboard,
 * and the panels will scale to fit.
 */
const addAutofitpanelsParam = (url: string) => {
  if (!url.includes('?')) {
    url += '?autofitpanels';
  } else if (!url.includes('autofitpanels')) {
    url += '&autofitpanels';
  }

  return url;
};

/**
 * Handles the link click and hovering
 */
const linkHandler = (
  url: string,
  clickEltId: string,
  textEltId: string,
  fontWeights = ['200', '400']
) => {
  if (!url && codeData.showcase) {
    url = codeData.dummyUrl;
  }

  if (url) {
    if (codeData.autofitpanels) {
      url = addAutofitpanelsParam(url);
    }

    const clickElt = htmlNode.getElementById(clickEltId);
    const textElt = htmlNode.getElementById(textEltId);

    clickElt.onclick = (event) =>
      window.open(url, event.ctrlKey ? '_blank' : '_self');
    clickElt.onmouseenter = () => (textElt.style.fontWeight = fontWeights[1]);
    clickElt.onmouseleave = () => (textElt.style.fontWeight = fontWeights[0]);
    clickElt.style.cursor = 'pointer';
    clickElt.style.userSelect = 'none';
  }
};

/**
 * Handles the sidebar building link clicks
 */
const sidebarBuildingLinkHandler = () => {
  for (const building of codeData.buildings) {
    if (building.id !== codeData.currentBuilding) {
      linkHandler(
        building.url,
        `sidebar-building-${building.id}-click`,
        `sidebar-building-${building.id}-text`
      );
      // Hide the underline for the building it is not under
      htmlNode.getElementById(
        `selected-building-underline-${building.id}`
      ).style.display = 'none';
    }
  }
};

/**
 * Handles the sidebar link clicks
 */
const sidebarLinkHandler = () => {
  linkHandler(codeData.mapUrl, 'map-click', 'map-text');
  linkHandler(codeData.campusUrl, 'campus-click', 'campus-text');
  sidebarBuildingLinkHandler();
};

/**
 * Handles the data hall link clicks
 */
const dataHallLinkHandler = () => {
  for (const dataHall of codeData.dataHalls) {
    /*
      Since the font weight of the data hall text is 400,
      the font weight will go from 400 -> 600 (normal to semi bold).
    */
    linkHandler(dataHall.url, `${dataHall.id}-click`, `${dataHall.id}-text`, [
      '400',
      '600'
    ]);
  }
};

/**
 * Handles the pod link clicks
 */
const podLinkHandler = () => {
  for (const pod of codeData.pods) {
    linkHandler(pod.url, `${pod.id}-click`, `${pod.id}-text`, ['400', '600']);
  }
};

/**
 * Sets the load range
 */
const setLoadRange = () => {
  const loadRange = codeData.loadRange;

  const loadRangeMinSI = formatSI(loadRange[0]);
  const loadRangeMaxSI = formatSI(loadRange[1]);

  const loadRangeMinFormatted = `${loadRangeMinSI[0]} ${loadRangeMinSI[1]}`;
  const loadRangeMaxFormatted = `${loadRangeMaxSI[0]} ${loadRangeMaxSI[1]}`;

  htmlNode.getElementById(
    'load-bar-range-low'
  ).textContent = `< ${loadRangeMinFormatted}`;
  htmlNode.getElementById(
    'load-bar-range-mid'
  ).textContent = `${loadRangeMinFormatted} - ${loadRangeMaxFormatted}`;
  htmlNode.getElementById(
    'load-bar-range-high'
  ).textContent = `${loadRangeMaxFormatted} <`;
};

/**
 * Sets the color (fill/stroke) of the element
 */
const setElementColor = (
  elt: HTMLElement & SVGElement,
  fill: null | string = null,
  stroke: null | string = null
) => {
  if (fill !== null) elt.style.fill = fill;
  if (stroke !== null) elt.style.stroke = stroke;
};

/**
 * Sets the color (fill/stroke) of the element based on the id
 */
const setElementColorById = (
  eltId: string,
  fill: null | string = null,
  stroke: null | string = null
) => {
  const elt = htmlNode.getElementById(eltId) as HTMLElement & SVGElement;
  setElementColor(elt, fill, stroke);
};

/**
 * Sets the color (fill/stroke) of the elements in the group based on the id
 */
const setGroupElementColorById = (
  groupId: string,
  fill: null | string = null,
  stroke: null | string = null
) => {
  const groupElt = htmlNode.getElementById(groupId);
  [...groupElt.children].forEach((elt: HTMLElement & SVGElement) => {
    setElementColor(elt, fill, stroke);
  });
};

/**
 * Sets the color of the button based on the id
 */
const setButtonElementColorById = (buttonId: string) => {
  const elt = htmlNode.getElementById(buttonId) as HTMLElement & SVGElement;
  (elt.children[0] as HTMLElement & SVGElement).style.fill = '#fff';
  [...elt.children[1].children].forEach(
    (elt: HTMLElement & SVGElement) => (elt.style.stroke = '#fff')
  );
};

/**
 * Changes the theme to dark theme
 */
const darkTheme = () => {
  setGroupElementColorById('background', '#161719');

  setElementColorById('sidebar-background-top', '#0a0a0a');
  setElementColorById('sidebar-background-bottom', '#0f0f0f');
  setGroupElementColorById('title', '#fff');
  setGroupElementColorById('h1', '#fff');
  setGroupElementColorById('h2', '#77787d');
  setGroupElementColorById('data-text', '#fff');
  setGroupElementColorById('load-bar-range', '#77787d');

  setButtonElementColorById('map-button');
  setButtonElementColorById('campus-button');
  setGroupElementColorById('button-text', '#fff');

  setGroupElementColorById('floor', '#0f0f0f');
  setGroupElementColorById('other-rooms', '#2b2d30');
  setGroupElementColorById('generators', '#2b2d30');

  setGroupElementColorById('pod-title', '#fff');
  setGroupElementColorById('pod-text', '#fff');
  setGroupElementColorById('pods', '#0f7dcc');
};

const initialize = () => {
  if (theme.isDark) {
    darkTheme();
  }
  sidebarLinkHandler();
  dataHallLinkHandler();
  podLinkHandler();
  setLoadRange();
};

initialize();
