import { ElementRef } from '@angular/core';

import { ContainerRef, IPositionElements, IPositionStats, IResolver } from '../models';
import { AxisResolver } from './axis-resolver';

export function createResolver({
  windowElement,
  axis
}: IPositionElements): IResolver {
  return createResolverWithContainer(
    { axis, isWindow: isElementWindow(windowElement) },
    windowElement
  );
}

export function createResolverWithContainer(
  resolver,
  windowElement: ContainerRef
) {
  const container =
    resolver.isWindow || (windowElement && !windowElement.nativeElement)
      ? windowElement
      : windowElement.nativeElement;
  return { ...resolver, container };
}

export function isElementWindow(windowElement: ContainerRef): boolean {
  const isWindow = ['Window', 'global'].some((obj: string) =>
    Object.prototype.toString.call(windowElement).includes(obj)
  );
  return isWindow;
}

export function getDocumentElement(isContainerWindow: boolean, windowElement) {
  return isContainerWindow ? windowElement.document.documentElement : null;
}

export function calculatePoints(element: ElementRef, resolver: IResolver) {
  const height = extractHeightForElement(resolver);
  return resolver.isWindow
    ? calculatePointsForWindow(height, element, resolver)
    : calculatePointsForElement(height, element, resolver);
}

export function calculatePointsForWindow(
  height: number,
  element: ElementRef,
  resolver: IResolver
): IPositionStats {
  const { axis, container, isWindow } = resolver;
  const { offsetHeightKey, clientHeightKey } = extractHeightPropKeys(axis);
  // scrolled until now / current y point
  const scrolledUntilNow =
    height +
    getElementPageYOffset(
      getDocumentElement(isWindow, container),
      axis,
      isWindow
    );
  // total height / most bottom y point
  const nativeElementHeight = getElementHeight(
    element.nativeElement,
    isWindow,
    offsetHeightKey,
    clientHeightKey
  );
  const totalToScroll =
    getElementOffsetTop(element.nativeElement, axis, isWindow) +
    nativeElementHeight;
  return { height, scrolledUntilNow, totalToScroll };
}

export function calculatePointsForElement(
  height: number,
  element: ElementRef,
  resolver: IResolver
): IPositionStats {
  const { axis, container } = resolver;
  // perhaps use container.offsetTop instead of 'scrollTop'
  const scrolledUntilNow = container[axis.scrollTopKey()];
  const totalToScroll = container[axis.scrollHeightKey()];
  return { height, scrolledUntilNow, totalToScroll };
}

export function extractHeightPropKeys(axis: AxisResolver) {
  return {
    offsetHeightKey: axis.offsetHeightKey(),
    clientHeightKey: axis.clientHeightKey()
  };
}

export function extractHeightForElement({
  container,
  isWindow,
  axis
}: IResolver) {
  const { offsetHeightKey, clientHeightKey } = extractHeightPropKeys(axis);
  return getElementHeight(
    container,
    isWindow,
    offsetHeightKey,
    clientHeightKey
  );
}
export function getElementHeight(
  elem: any,
  isWindow: boolean,
  offsetHeightKey: string,
  clientHeightKey: string
) {
  if (isNaN(elem[offsetHeightKey])) {
    return getDocumentElement(isWindow, elem)[clientHeightKey];
  } else {
    return elem[offsetHeightKey];
  }
}

export function getElementOffsetTop(
  elem: ContainerRef,
  axis: AxisResolver,
  isWindow: boolean
) {
  const topKey = axis.topKey();
  // elem = elem.nativeElement;
  if (!elem.getBoundingClientRect) {
    // || elem.css('none')) {
    return;
  }
  return (
    elem.getBoundingClientRect()[topKey] +
    getElementPageYOffset(elem, axis, isWindow)
  );
}

export function getElementPageYOffset(
  elem: ContainerRef,
  axis: AxisResolver,
  isWindow: boolean
) {
  const pageYOffset = axis.pageYOffsetKey();
  const scrollTop = axis.scrollTopKey();
  const offsetTop = axis.offsetTopKey();

  if (isNaN(window[pageYOffset])) {
    return getDocumentElement(isWindow, elem)[scrollTop];
  } else if (elem.ownerDocument) {
    return elem.ownerDocument.defaultView[pageYOffset];
  } else {
    return elem[offsetTop];
  }
}
