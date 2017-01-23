import {
  async,
  inject
} from '@angular/core/testing';
import { InfiniteScroll } from './infinite-scroll';
import { AxisResolverFactory } from './axis-resolver';
import { PositionResolverFactory } from './position-resolver';
import { ScrollRegister } from './scroll-register';
import { ScrollResolver } from './scroll-resolver';

import { ElementRef, NgZone, SimpleChanges, SimpleChange } from '@angular/core';

describe('Infinite Scroll Directive', () => {
  // const zone = new NgZone({ enableLongStackTrace: false });
  let isScrollingDown = true;
  let zoneSpy: any, scrollResolverSpy: any, scrollRegisterSpy: any, positionResolverSpy: any;
  const positionFactoryMock: any =  {
    create: () => positionResolverSpy
  };
  const createMockElement = () => {
    const mockedElement: ElementRef = new ElementRef(document.createElement('div'));
    return mockedElement;
  };
  const createInfiniteScroll = () => {
    const mockedElement = createMockElement();
    return new InfiniteScroll(
      mockedElement,
      zoneSpy,
      positionFactoryMock,
      scrollRegisterSpy,
      scrollResolverSpy
    );
  };

  beforeEach(() =>{
    zoneSpy = jasmine.createSpyObj('zone', ['run']);
    scrollResolverSpy = {
      getScrollStats: () => {
        return { shouldScroll: true, isScrollingDown };
      }
    };
    scrollRegisterSpy = jasmine.createSpyObj('register', ['attachEvent'])
    positionResolverSpy = jasmine.createSpyObj('pos', ['create', 'container']);
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

  it('should trigger the onScrollDown event when scroll has passed _distancedDown', () => {
    const directive = createInfiniteScroll();
    const container = {
      height: 0,
      scrolledUntilNow: 0,
      totalToScroll: 0,
    }
    spyOn(directive, 'onScrollDown');
    directive.ngOnInit();
    directive.handleOnScroll(container)
    const actual = directive.onScrollDown;
    expect(actual).toHaveBeenCalled();
  });

  it('should trigger the onScrollUp event when scroll has passed _distanceUp', () => {
    const directive = createInfiniteScroll();
    const container = {
      height: 0,
      scrolledUntilNow: 0,
      totalToScroll: 0,
    };
    spyOn(directive, 'onScrollUp');
    directive.ngOnInit();
    isScrollingDown = false;
    directive.handleOnScroll(container);
    const actual = directive.onScrollUp;
    expect(actual).toHaveBeenCalled();
  });

  it('should disable the scroller', () => {
    const directive = createInfiniteScroll();
    const container = {
      height: 0,
      scrolledUntilNow: 0,
      totalToScroll: 0,
    }
    spyOn(directive, 'onScrollDown');
    directive.ngOnInit();
    directive._disabled = true;
    directive.handleOnScroll(container);
    const actual = directive.onScrollDown;
    expect(actual).not.toHaveBeenCalled();
  });
})
