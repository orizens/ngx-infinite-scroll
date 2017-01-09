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
  const createInfiniteScroll = (mockedElement?: any) => {
    mockedElement = mockedElement || createMockElement();
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
    const expectedInputs: Object = {
      _distanceDown: 2,
      _distanceUp: 1.5,
      _throttle: 300,
      scrollWindow: true,
      _immediate: false,
      _horizontal: false,
      _alwaysCallback: false,
      _disabled: false,
      _container: null
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

  describe('resolving container', () => {
    let directive: InfiniteScroll;
    let mockedElement: ElementRef;
    const container = {
      height: 0,
      scrolledUntilNow: 0,
      totalToScroll: 0,
    };

    beforeEach(() => {
      mockedElement = createMockElement();
      directive = createInfiniteScroll(mockedElement);
      spyOn(positionFactoryMock, 'create').and.callThrough();
    });

    describe('when container input is defined', () => {
      describe('when css selector is used', () => {
        beforeEach(() => {
          spyOn(document, 'querySelector').and.returnValue(container);
          directive._container = '.test';
          directive.ngOnInit();
        });

        it('should find element in DOM', () => {
          expect(document.querySelector).toHaveBeenCalledWith('.test');
        });

        it('should return container', () => {
          expect(positionFactoryMock.create)
              .toHaveBeenCalledWith(jasmine.objectContaining({windowElement: container}));
        });
      });

      describe('when container is passed directly', () => {
        beforeEach(() => {
          directive._container = container;
          directive.ngOnInit();
        });

        it('should return container', () => {
          expect(positionFactoryMock.create)
              .toHaveBeenCalledWith(jasmine.objectContaining({windowElement: container}));
        });
      });
    });

    describe('when container input is not defined', () => {
      describe('when scrollWindow is true', () => {
        beforeEach(() => {
          directive.scrollWindow = true;
          directive.ngOnInit();
        });

        it('should return window', () => {
          expect(positionFactoryMock.create)
              .toHaveBeenCalledWith(jasmine.objectContaining({windowElement: window}));
        });
      });

      describe('when scrollWindow is false', () => {
        beforeEach(() => {
          directive.scrollWindow = false;
          directive.ngOnInit();
        });

        it('should return current element', () => {
          expect(positionFactoryMock.create)
              .toHaveBeenCalledWith(jasmine.objectContaining({windowElement: mockedElement}));
        });
      });
    });
  });
});
