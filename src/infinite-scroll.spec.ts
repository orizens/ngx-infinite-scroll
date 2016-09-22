import {
  async,
  inject
} from '@angular/core/testing';
import { InfiniteScroll } from './infinite-scroll';
import { AxisResolver } from './axis-resolver';

import { ElementRef, NgZone, SimpleChanges, SimpleChange } from '@angular/core';

describe('Infinite Scroll Directive', () => {
  // const zone = new NgZone({ enableLongStackTrace: false });
  const zone = jasmine.createSpyObj('zone', ['run']);
  const createMockElement = () => {
    const mockedElement: ElementRef = new ElementRef(document.createElement('div'));
    return mockedElement;
  };

  const createInfiniteScroll = () => {
    const mockedElement = createMockElement();
    const axis: AxisResolver = new AxisResolver();
    return new InfiniteScroll(mockedElement, zone, axis);
  };

  beforeEach(() =>{
    spyOn(AxisResolver, 'constructor').and.callFake(() => {});
  });

  it('should create an instance of the directive', () => {
    const actual = createInfiniteScroll();
    expect(actual).toBeDefined();
  });

  it('should have default @Input properties values', () => {
    const directive = createInfiniteScroll();
    const expectedInputs = {
      _distanceDown: 2,
      _distanceUp: 1.5,
      _throttle: 300,
      scrollWindow: true,
      _immediate: false,
      _horizontal: false,
      _alwaysCallback: false,
      _disabled: false
    };

    Object.keys(expectedInputs).forEach(input =>
      expect(directive[input]).toEqual(expectedInputs[input]));
  });

  it('should trigger the onScrollDown event when scroll has passed _distandDown', () => {
    const directive = createInfiniteScroll();
    spyOn(directive, 'onScrollDown');
    directive.ngOnInit();
    spyOn(directive.scroller, 'calculatePoints').and.callFake(() => {
      return { height: 150, scrolledUntilNow: 75, totalToScroll: 150 };
    });
    directive.scroller.handler();
    expect(directive.scroller.calculatePoints).toHaveBeenCalled();
    expect(directive.onScrollDown).toHaveBeenCalled();
  });

  it('should trigger the onScrollUp event when scroll has passed _distanceUp', () => {
    const directive = createInfiniteScroll();
    spyOn(directive, 'onScrollUp');
    directive.ngOnInit();
    spyOn(directive.scroller, 'calculatePoints').and.callFake(() => {
      return { height: 150, scrolledUntilNow: 30, totalToScroll: 150 };
    });
    directive.scroller.lastScrollPosition = 50;
    directive.scroller.handler();
    expect(directive.scroller.calculatePoints).toHaveBeenCalled();
    expect(directive.onScrollUp).toHaveBeenCalled();
  });

  it('should disable the scroller', () => {
    const directive = createInfiniteScroll();
    const changes: SimpleChanges = {
      '_disabled': new SimpleChange(false, true)
    };
    // spyOn(directive, 'onScrollUp');
    directive.ngOnInit();
    directive.ngOnChanges(changes);
    const expected = false;
    const actual = directive.scroller.scrollEnabled;
    expect(actual).toBe(expected);
  })
})
