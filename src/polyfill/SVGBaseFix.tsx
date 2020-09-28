/*
  Fixes references to inline SVG elements when the <base> tag is in use.
  Firefox can't find the refrenced link in xlink:href

  For example, when using gradients, the gradients can't be found,
  which then causes the element to be invisible

  More info:
  - https://gist.github.com/leonderijke/c5cf7c5b2e424c0061d2
  - https://stackoverflow.com/a/18265336
  - https://www.w3.org/TR/SVG/linking.html
*/

const SVGBaseFix = (html: string) => {
  // Current URL, without the hash
  const BASE_URL = window.location.href.replace(window.location.hash, '');

  // Adds the BASE_URL between (xlink:href=") and (#")
  // xlink:href="#gradient" -> xlink:href="https://random.site/d/SoMeThInG/dashboard?orgId=1#gradient"
  html = html.replace(/(xlink:href=")(#[^"]*)/g, `$1${BASE_URL}$2`);

  // Returns the edited html string
  return html;
};

export { SVGBaseFix };
