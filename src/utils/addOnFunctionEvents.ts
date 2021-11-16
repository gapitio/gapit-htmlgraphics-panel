import { HTMLNodeElement } from 'types';

export function addOnFunctionEvents(htmlNode: HTMLNodeElement) {
  htmlNode.onpanelupdate = () => {};
  htmlNode.onpanelwillunmount = () => {};
}
