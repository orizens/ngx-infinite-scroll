import { Subscription } from 'rxjs/Rx';
import {
  async,
  inject
} from '@angular/core/testing';
import * as ScrollRegister from '../../src/services/scroll-register';
import { ElementRef } from '@angular/core';

describe('Scroll Regsiter', () => {
  let mockedElement: ElementRef;
  let mockedContainer: ElementRef;
  // let scrollRegister: ScrollRegister;

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

  beforeEach(() => {
    // scrollRegister = new ScrollRegister();
  });

  it('should create a Subscription of scroll observable', () => {
    const mockDom = createMockDom();
    const scrollConfig: ScrollRegister.IScrollRegisterConfig = {
      container: mockDom.container.nativeElement,
      mergeMap: (e: any) => e,
      scrollHandler: (ev: any) => ev,
      throttleDuration: 300,

    };
    const scroller$: Subscription = ScrollRegister.attachScrollEvent(scrollConfig);
    const actual = scroller$;
    expect(actual).toBeDefined();
  });

  // describe('Manage Scroll State', () => {
  //   it('should backup old Total and update the new one', () => {
  //     const state = {
  //       totalToScroll: 10,
  //       lastTotalToScroll: 0
  //     } as any;
  //     const newTotal = 20;
  //     ScrollRegister.updateTotalToScroll(newTotal, state);
  //     const actual = state.totalToScroll;
  //     const expected = newTotal;
  //     expect(actual).toEqual(expected);
  //   });

  //   it('should return false when total != lastTotal', () => {
  //     const state = {
  //       totalToScroll: 10,
  //       lastTotalToScroll: 0
  //     } as any;
  //     const actual = ScrollRegister.isSameTotalToScroll(state);
  //     expect(actual).toBeFalsy();
  //   });

  //   it('should return true total = lastTotal', () => {
  //     const state = {
  //       totalToScroll: 10,
  //       lastTotalToScroll: 10
  //     } as any;
  //     const actual = ScrollRegister.isSameTotalToScroll(state);
  //     expect(actual).toBeTruthy();
  //   });

  //   it('should set the isTriggeredTotal', () => {
  //     const state = {
  //       isTriggeredTotal: false
  //     } as any;
  //     ScrollRegister.updateTriggeredFlag(state, true);
  //     const actual = state.isTriggeredTotal;
  //     expect(actual).toBeTruthy();
  //   });
  // });
});
