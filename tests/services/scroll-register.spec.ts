import * as Models from '../../src/models';
import { Observable } from 'rxjs/Observable';
import {
  async,
  inject
} from '@angular/core/testing';
import * as ScrollRegister from '../../src/services/scroll-register';
import * as ScrollResolver from '../../src/services/scroll-resolver';
import * as EventTrigger from '../../src/services/event-trigger';
import { ElementRef } from '@angular/core';

describe('Scroll Regsiter', () => {
  let mockedElement: ElementRef;
  let mockedContainer: ElementRef;

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

  // beforeEach(() => {

  // });

  it('should create a Observable of scroll observable', () => {
    const mockDom = createMockDom();
    const scrollConfig: Models.IScrollRegisterConfig = {
      container: mockDom.container.nativeElement,
      throttle: 300,

    };
    const scroller$: Observable<{}> = ScrollRegister.attachScrollEvent(scrollConfig);
    const actual = scroller$;
    expect(actual).toBeDefined();
  });

  it('should create a scroll params object', () => {
    const lastScrollPosition = 0;
    const positionStats = {} as Models.IPositionStats;
    const distance = {
      down: 2,
      up: 3,
    } as Models.IScrollerDistance;
    const scrollStats = {
      isScrollingDown: true,
      shouldFireScrollEvent: true
    };
    spyOn(ScrollResolver, 'getScrollStats').and.returnValue(scrollStats);
    const actual = ScrollRegister.toInfiniteScrollParams(lastScrollPosition, positionStats, distance);
    const expected = 3;
    expect(Object.keys(actual).length).toEqual(expected);
  });

  describe('toInfiniteScrollAction', () => {
    let response;

    beforeEach(() => {
      response = {
        stats: {
          scrolled: 100
        }
      } as Models.IScrollParams;
    });

    [
      {
        it: 'should trigger down event when scrolling down',
        params: {
          scrollDown: true
        },
        expected: ScrollRegister.InfiniteScrollActions.DOWN
      },
      {
        it: 'should trigger up event when scrolling up',
        params: {
          scrollDown: false
        },
        expected: ScrollRegister.InfiniteScrollActions.UP
      }
    ].forEach((spec) => {
      it(spec.it, () => {
        const params = { ...response, ...spec.params };
        const actual = ScrollRegister.toInfiniteScrollAction(params);
        expect(actual.type).toBe(spec.expected);
      });
    });
  });
});
