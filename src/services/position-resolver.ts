import { Injectable, ElementRef } from '@angular/core';
import { AxisResolver } from './axis-resolver';
import { ContainerRef, IPositionElements, IPositionStats, IResolver } from '../models';

@Injectable()
export class PositionResolver {

  create(options: IPositionElements): IResolver {
    const isWindow = this.isElementWindow(options.windowElement);
    const resolver: IResolver = {
      axis: options.axis,
      container: this.defineContainer(options.windowElement, isWindow),
      isWindow,
    };
    return resolver;
  }

  defineContainer(windowElement: ContainerRef, isContainerWindow: boolean) {
    const container = (isContainerWindow || !windowElement.nativeElement)
      ? windowElement
      : windowElement.nativeElement;
    return container;
  }

  isElementWindow(windowElement: ContainerRef): boolean {
    const isWindow = Object.prototype.toString.call(windowElement).includes('Window');
    return isWindow;
  }

  getDocumentElement(isContainerWindow: boolean, windowElement) {
    return isContainerWindow
      ? windowElement.document.documentElement
      : null;
  }

  calculatePoints (element: ElementRef, resolver: IResolver) {
    return resolver.isWindow
      ? this.calculatePointsForWindow(element, resolver)
      : this.calculatePointsForElement(element, resolver);
  }

  calculatePointsForWindow (element: ElementRef, resolver: IResolver): IPositionStats {
    const { axis, container, isWindow } = resolver;
    const offsetHeightKey = axis.offsetHeightKey();
    const clientHeightKey = axis.clientHeightKey();
    const topKey = axis.topKey();
    // container's height
    const height = this.height(container, isWindow, offsetHeightKey, clientHeightKey);
    // scrolled until now / current y point
    const scrolledUntilNow = height + this.pageYOffset(this.getDocumentElement(isWindow, container), axis, isWindow);
    // total height / most bottom y point
    const nativeElementHeight = this.height(element.nativeElement, isWindow, offsetHeightKey, clientHeightKey);
    const totalToScroll = this.offsetTop(element.nativeElement, axis, isWindow) + nativeElementHeight;
    return { height, scrolledUntilNow, totalToScroll };
  }

  calculatePointsForElement (element: ElementRef, resolver: IResolver) {
    const { axis, container, isWindow } = resolver;
    const offsetHeightKey = axis.offsetHeightKey();
    const clientHeightKey = axis.clientHeightKey();
    const scrollTop = axis.scrollTopKey();
    const scrollHeight = axis.scrollHeightKey();
    const topKey = axis.topKey();

    const height = this.height(container, isWindow, offsetHeightKey, clientHeightKey);
    // perhaps use this.container.offsetTop instead of 'scrollTop'
    const scrolledUntilNow = container[scrollTop];
    let containerTopOffset = 0;
    const offsetTop = this.offsetTop(container, axis, isWindow);
    if (offsetTop !== void 0) {
      containerTopOffset = offsetTop;
    }
    const totalToScroll = container[scrollHeight];
    return { height, scrolledUntilNow, totalToScroll };
  }

  private height (elem: any, isWindow: boolean, offsetHeightKey: string, clientHeightKey: string) {
    if (isNaN(elem[offsetHeightKey])) {
      return this.getDocumentElement(isWindow, elem)[clientHeightKey];
    } else {
      return elem[offsetHeightKey];
    }
  }

  private offsetTop (elem: ContainerRef, axis: AxisResolver, isWindow: boolean) {
    const topKey = axis.topKey();
    // elem = elem.nativeElement;
    if (!elem.getBoundingClientRect) { // || elem.css('none')) {
      return;
    }
    return elem.getBoundingClientRect()[topKey] + this.pageYOffset(elem, axis, isWindow);
  }

  private pageYOffset (elem: ContainerRef, axis: AxisResolver, isWindow: boolean) {
    const pageYOffset = axis.pageYOffsetKey();
    const scrollTop = axis.scrollTopKey();
    const offsetTop = axis.offsetTopKey();

    if (isNaN(window[pageYOffset])) {
      return this.getDocumentElement(isWindow, elem)[scrollTop];
    } else if (elem.ownerDocument) {
      return elem.ownerDocument.defaultView[pageYOffset];
    } else {
      return elem[offsetTop];
    }
  }
}
