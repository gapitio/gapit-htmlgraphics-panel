import { HTMLNodeElement } from 'types';

export const panelwillunmountEvent = new CustomEvent('panelwillunmount');

export function triggerPanelwillunmount(shadowElt: HTMLDivElement | null) {
  const htmlNode = shadowElt?.shadowRoot as HTMLNodeElement;
  if (htmlNode && htmlNode.onpanelwillunmount) {
    htmlNode.onpanelwillunmount();
    htmlNode.dispatchEvent(panelwillunmountEvent);
  }
}
