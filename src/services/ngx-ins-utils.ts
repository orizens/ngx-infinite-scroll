import { ElementRef, SimpleChange } from '@angular/core';

export function resolveContainerElement(
  selector: string | any,
  scrollWindow,
  defaultElement,
  fromRoot: boolean
): any {
  const hasWindow = window && !!window.document;
  const containerIsString =
    selector && hasWindow && typeof selector === 'string';
  let container = hasWindow && scrollWindow ? window : defaultElement;
  if (containerIsString) {
    container = containerIsString
      ? findElement(selector, defaultElement.nativeElement, fromRoot)
      : selector;
  }
  return container;
}

export function findElement(
  selector: string | any,
  customRoot: ElementRef | any,
  fromRoot: boolean
) {
  const rootEl = fromRoot ? window.document : customRoot;
  return rootEl.querySelector(selector);
}

export function inputPropChanged(prop: SimpleChange): boolean {
  return prop && !prop.firstChange;
}

export function hasWindowDefined(): boolean {
  return typeof window !== 'undefined';
}
