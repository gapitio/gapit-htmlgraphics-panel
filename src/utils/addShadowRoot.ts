import { HTMLNodeElement } from 'types';
import { addOnFunctionEvents } from './addOnFunctionEvents';

function getShadowElt({ centerAlignContent = false } = {}) {
  const shadowElt = document.createElement('div');
  shadowElt.attachShadow({ mode: 'open' });

  shadowElt.style.width = `100%`;
  shadowElt.style.height = `100%`;
  shadowElt.style.position = 'absolute';

  if (centerAlignContent) {
    shadowElt.style.display = 'flex';
    shadowElt.style.justifyContent = 'center';
    shadowElt.style.alignItems = 'center';
  }

  return shadowElt;
}

export function addShadowRoot(targetElt: HTMLDivElement | null, { centerAlignContent = false } = {}) {
  if (!targetElt) return null;

  // Remove previous shadow root
  while (targetElt.firstChild) {
    targetElt.firstChild.remove();
  }

  const shadowElt = getShadowElt({ centerAlignContent });
  targetElt.appendChild(shadowElt);

  addOnFunctionEvents(shadowElt.shadowRoot as HTMLNodeElement);

  return shadowElt;
}
