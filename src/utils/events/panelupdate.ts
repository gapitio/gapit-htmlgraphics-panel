import { HTMLNodeElement } from 'types';

export const panelupdateEvent = new CustomEvent('panelupdate');

export function triggerPanelupdate(shadowElt: HTMLDivElement | null) {
  const htmlNode = shadowElt?.shadowRoot as HTMLNodeElement;
  if (htmlNode && htmlNode.onpanelupdate) {
    htmlNode.onpanelupdate();
    htmlNode.dispatchEvent(panelupdateEvent);
  }
}
