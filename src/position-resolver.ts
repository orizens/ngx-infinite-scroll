import { Injectable, ElementRef } from '@angular/core';
import { AxisResolver, AxisResolverFactory } from './axis-resolver';
import { ContainerRef, PositionElements, PositionStats } from './models';

@Injectable()
export class PositionResolverFactory {

  constructor(private axisResolver: AxisResolverFactory) {
  }

  create (options: PositionElements) {
    return new PositionResolver(this.axisResolver.create(!options.horizontal), options);
  }
}

export class PositionResolver {
  private documentElement: ContainerRef;
  private isContainerWindow: boolean;
  public container: ContainerRef;

  constructor (private axis: AxisResolver, private options: PositionElements) {
    this.resolveContainer(this.options.windowElement);
    this.defineContainer(this.options.windowElement);
  }

  defineContainer(windowElement) {
    if (this.resolveContainer(windowElement)) {
      this.container = windowElement;
    } else {
      this.container = windowElement.nativeElement;
    }
    return this.container;
  }

  resolveContainer(windowElement: Window | ElementRef | any): boolean {
    const isContainerWindow = Object.prototype.toString.call(windowElement).includes('Window');
    this.isContainerWindow = isContainerWindow;
    return isContainerWindow;
  }

  getDocumentElement() {
    return this.isContainerWindow
      ? this.options.windowElement.document.documentElement
      : null;
  }

  calculatePoints (element: ElementRef) {
    return this.isContainerWindow
      ? this.calculatePointsForWindow(element)
      : this.calculatePointsForElement(element);
  }

  calculatePointsForWindow (element: ElementRef): PositionStats {
    // container's height
    const height = this.height(this.container);
    // scrolled until now / current y point
    const scrolledUntilNow = height + this.pageYOffset(this.getDocumentElement());
    // total height / most bottom y point
    const totalToScroll = this.offsetTop(element.nativeElement) + this.height(element.nativeElement);
    return { height, scrolledUntilNow, totalToScroll };
  }

  calculatePointsForElement (element: ElementRef) {
    let scrollTop    = this.axis.scrollTopKey();
    let scrollHeight = this.axis.scrollHeightKey();
    const container = this.container;

    const height = this.height(container);
    // perhaps use this.container.offsetTop instead of 'scrollTop'
    const scrolledUntilNow = container[scrollTop];
    let containerTopOffset = 0;
    const offsetTop = this.offsetTop(container);
    if (offsetTop !== void 0) {
      containerTopOffset = offsetTop;
    }
    const totalToScroll = container[scrollHeight];
    return { height, scrolledUntilNow, totalToScroll };
  }

  private height (elem: any) {
    let offsetHeight = this.axis.offsetHeightKey();
    let clientHeight = this.axis.clientHeightKey();

    // elem = elem.nativeElement;
    if (isNaN(elem[offsetHeight])) {
      return this.getDocumentElement()[clientHeight];
    } else {
      return elem[offsetHeight];
    }
  }

  private offsetTop (elem: any) {
    let top = this.axis.topKey();

    // elem = elem.nativeElement;
    if (!elem.getBoundingClientRect) { // || elem.css('none')) {
      return;
    }
    return elem.getBoundingClientRect()[top] + this.pageYOffset(elem);
  }

  pageYOffset (elem: any) {
    let pageYOffset = this.axis.pageYOffsetKey();
    let scrollTop   = this.axis.scrollTopKey();
    let offsetTop   = this.axis.offsetTopKey();

    // elem = elem.nativeElement;
    if (isNaN(window[pageYOffset])) {
      return this.getDocumentElement()[scrollTop];
    } else if (elem.ownerDocument) {
      return elem.ownerDocument.defaultView[pageYOffset];
    } else {
      return elem[offsetTop];
    }
  }
}
