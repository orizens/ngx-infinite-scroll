import { Subscription } from 'rxjs/Rx';
import {
  async,
  inject
} from '@angular/core/testing';
import { ScrollRegister, ScrollRegisterConfig } from './scroll-register';
import { ElementRef } from '@angular/core';

describe('Scroll Regsiter', () => {
  let mockedElement: ElementRef;
  let mockedContainer: ElementRef;
  let scrollRegister: ScrollRegister;

  const createMockDom = () => {
    const container = document.createElement('section');
    container.setAttribute('style', 'height: 500px; overflow-y: scroll');
    const el = document.createElement('div');
    el.setAttribute('style', 'height: 1000px;');
    container.appendChild(el);
    mockedElement = new ElementRef(el);
    mockedContainer = new ElementRef(container);
    return { element: mockedElement, container: mockedContainer };
  };

  beforeEach(() =>{
    scrollRegister = new ScrollRegister();
  });

  it('should create a Subscription of scroll observable', () => {
    const mockDom = createMockDom();
    const scrollConfig: ScrollRegisterConfig = {
      container: mockDom.container.nativeElement,
      filterBefore: () => true,
      mergeMap: (e: any) => e,
      scrollHandler: (ev: any) => ev,
      throttleDuration: 300,
      throttleType: 'throttle'

    };
    const scroller$: Subscription = scrollRegister.attachEvent(scrollConfig);
    const actual = scroller$;
    expect(actual).toBeDefined();
  });
});
