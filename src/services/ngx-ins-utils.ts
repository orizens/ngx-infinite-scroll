export function resolveContainerElement(selector: string | any, scrollWindow, defaultElement): any {
  const hasWindow = window && window.hasOwnProperty('document');
  const containerIsString = selector && hasWindow && typeof(selector) === 'string';
  let container = containerIsString
    ? window.document.querySelector(selector)
    : selector;
  if (!selector) {
    container = scrollWindow ? window : defaultElement;
  }
  return container;
}
