import { ErrorObj, HTMLNodeElement, OptionsInterface } from 'types';
import { SVGBaseFix } from './polyfill';

export function addHtml(shadowContainer: HTMLDivElement | null, options: OptionsInterface) {
  const htmlNode = shadowContainer?.firstElementChild?.shadowRoot as HTMLNodeElement;
  const errorObj: ErrorObj = {
    scope: 'html',
    isError: false,
  };

  if (shadowContainer && htmlNode) {
    try {
      // Create a new variable to not mutate/override the current html code
      const htmlCode = options.SVGBaseFix && options.html ? SVGBaseFix(options.html) : options.html;
      const CSSCode = options.css;
      const rootCSSCode = options.rootCSS;

      const rootCSS = document.createElement('style');
      rootCSS.textContent = rootCSSCode ?? '';
      shadowContainer.appendChild(rootCSS);

      htmlNode.innerHTML = `<style>${CSSCode ?? ''}</style>${htmlCode ?? '<div></div>'}`;

      const htmlDocument = htmlNode.children[1] as HTMLElement | (HTMLElement & SVGElement) | undefined;

      if (options.overflow && htmlDocument) {
        htmlDocument.style.overflow = options.overflow;
      }

      if (options.add100Percentage && htmlDocument) {
        htmlDocument.setAttribute('height', '100%');
        htmlDocument.setAttribute('width', '100%');
        htmlDocument.style.height = '100%';
        htmlDocument.style.width = '100%';
      }
    } catch (e) {
      errorObj.isError = true;
      errorObj.error = e;
      console.error(`htmlNode:`, e);
    }
  }

  return errorObj;
}
