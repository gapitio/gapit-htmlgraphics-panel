const UNIT_PREFIXES = {
  24: 'Y',
  21: 'Z',
  18: 'E',
  15: 'P',
  12: 'T',
  9: 'G',
  6: 'M',
  3: 'k',
  0: '',
  '-3': 'm',
  '-6': 'µ',
  '-9': 'n',
  '-12': 'p',
  '-15': 'f',
  '-18': 'a',
  '-21': 'z',
  '-24': 'y',
};

/**
 * Formats num into SI metric prefixes
 * https://en.wikipedia.org/wiki/Metric_prefix
 *
 * @param {*} num - The number that will be formatted as SI metric prefix
 * @param {number} [digits=1] - Amount of digits
 * @param {string} [unit=codeData.unit] - The unit which will be returned before the unit prefix
 * @param {boolean} [precision=false] - Use toExponential (true) or toFixed (false)
 * @return {Array<string, string>} [value, unit]
 */

const formatSI = (num, digits = 1, unit = codeData.unit, precision = false) => {
  if ([0, '0'].includes(num)) {
    return ['0', unit];
  } else if (num == 'No data' || !num) {
    return ['No data', ''];
  }

  let sig = Math.abs(num); // Significant figure
  let exponent = 0;

  while (sig >= 1000 && exponent < 24) {
    sig /= 1000;
    exponent += 3;
  }
  while (sig < 1 && exponent > -24) {
    sig *= 1000;
    exponent -= 3;
  }

  const signPrefix = num < 0 ? '-' : '';

  // If the Significant figure is more than 1000 Y (10^27)
  if (sig > 1000) {
    return [signPrefix + sig.toExponential(1), UNIT_PREFIXES[exponent] + unit];
  }

  const formattedSig = precision ? sig.toPrecision(digits) : sig.toFixed(digits);
  return [signPrefix + formattedSig, UNIT_PREFIXES[exponent] + unit];
};

/**
 * Adds autofitpanels parameter to the url.
 * Which is used when going to a different grafana dashboard,
 * and the panels will scale to fit.
 *
 * @param {string} url
 * @return {string} url with autofitpanels parameter
 */
const addAutofitpanelsParam = (url) => {
  if (!url.includes('?')) {
    url += '?autofitpanels';
  } else if (!url.includes('autofitpanels')) {
    url += '&autofitpanels';
  }

  return url;
};

/**
 * Handles the link click and hovering
 *
 * @param {string} url - URL to be redirected to when clicked
 * @param {string} clickEltId - ID of the click element
 * @param {string} textEltId - ID of the text element
 * @param {Array<number, number>} [fontWeights=[200, 400]] - Font weight to scale from when hovering
 */
const linkHandler = (url, clickEltId, textEltId, fontWeights = [200, 400]) => {
  if (!url && codeData.showcase) {
    url = codeData.dummyUrl;
  }

  if (url) {
    if (codeData.autofitpanels) {
      url = addAutofitpanelsParam(url);
    }

    const clickElt = htmlNode.getElementById(clickEltId);
    const textElt = htmlNode.getElementById(textEltId);

    clickElt.onclick = (event) => window.open(url, event.ctrlKey ? '_blank' : '_self');
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
      linkHandler(building.url, `sidebar-building-${building.id}-click`, `sidebar-building-${building.id}-text`);
      // Hide the underline for the building it is not under
      htmlNode.getElementById(`selected-building-underline-${building.id}`).style.display = 'none';
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
    linkHandler(dataHall.url, `${dataHall.id}-click`, `${dataHall.id}-text`, [400, 600]);
  }
};

/**
 * Handles the pod link clicks
 */
const podLinkHandler = () => {
  for (const pod of codeData.pods) {
    linkHandler(pod.url, `${pod.id}-click`, `${pod.id}-text`, [400, 600]);
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

  htmlNode.getElementById('load-bar-range-low').textContent = `< ${loadRangeMinFormatted}`;
  htmlNode.getElementById('load-bar-range-mid').textContent = `${loadRangeMinFormatted} - ${loadRangeMaxFormatted}`;
  htmlNode.getElementById('load-bar-range-high').textContent = `${loadRangeMaxFormatted} <`;
};

/**
 * Sets the color (fill/stroke) of the element
 *
 * @param {SVGElement} elt
 * @param {boolean} [fill=false]
 * @param {boolean} [stroke=false]
 */
const setElementColor = (elt, fill = false, stroke = false) => {
  if (fill !== false) elt.style.fill = fill;
  if (stroke !== false) elt.style.stroke = stroke;
};

/**
 * Sets the color (fill/stroke) of the element based on the id
 *
 * @param {string} eltId
 * @param {boolean} [fill=false]
 * @param {boolean} [stroke=false]
 */
const setElementColorById = (eltId, fill = false, stroke = false) => {
  const elt = htmlNode.getElementById(eltId);
  setElementColor(elt, fill, stroke);
};

/**
 * Sets the color (fill/stroke) of the elements in the group based on the id
 *
 * @param {string} groupId
 * @param {boolean} [fill=false]
 * @param {boolean} [stroke=false]
 */
const setGroupElementColorById = (groupId, fill = false, stroke = false) => {
  const groupElt = htmlNode.getElementById(groupId);
  [...groupElt.children].forEach((elt) => {
    setElementColor(elt, fill, stroke);
  });
};

/**
 * Sets the color of the button based on the id
 *
 * @param {string} buttonId
 */
const setButtonElementColorById = (buttonId) => {
  const elt = htmlNode.getElementById(buttonId);
  elt.children[0].style.fill = '#fff';
  elt.children[1].children.forEach((elt) => (elt.style.stroke = '#fff'));
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
