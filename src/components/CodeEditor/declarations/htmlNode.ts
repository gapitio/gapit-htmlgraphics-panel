export default `
interface HTMLNode extends ShadowRoot {
  onpanelupdate: () => void;
}

/**
 * The HTML node from the HTML/SVG code.
 *
 * It's a shadow root https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM.
 */
declare const htmlNode: HTMLNode;
`;
