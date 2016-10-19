import {
  async,
  inject
} from '@angular/core/testing';
import { InfiniteScroll } from './infinite-scroll';
import { AxisResolverFactory } from './axis-resolver';
import { PositionResolverFactory } from './position-resolver';

import { ElementRef, NgZone, SimpleChanges, SimpleChange } from '@angular/core';

describe('Infinite Scroll Directive', () => {
  // const zone = new NgZone({ enableLongStackTrace: false });
  const zone = jasmine.createSpyObj('zone', ['run']);
  const createMockElement = () => {
    const mockedElement: ElementRef = new ElementRef(document.createElement('div'));
    return mockedElement;
  };
  let positionResolver: PositionResolverFactory;
  const createInfiniteScroll = () => {
    const mockedElement = createMockElement();
    const axis: AxisResolverFactory = new AxisResolverFactory();
    positionResolver = new PositionResolverFactory(axis);
    return new InfiniteScroll(mockedElement, zone, positionResolver);
  };

  beforeEach(() =>{
    
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
    directive.scroller.handler();
    expect(directive.onScrollDown).toHaveBeenCalled();
  });

  it('should trigger the onScrollUp event when scroll has passed _distanceUp', () => {
    const directive = createInfiniteScroll();
    spyOn(directive, 'onScrollUp');
    directive.ngOnInit();
    directive.scroller.lastScrollPosition = 350;
    directive.scroller.handler();
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
