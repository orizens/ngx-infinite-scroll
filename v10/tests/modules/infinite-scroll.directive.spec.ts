/*
import {
  async,
  inject
} from '@angular/core/testing';
import { InfiniteScrollDirective } from '../../src/modules/infinite-scroll.directive';
import { ScrollRegister } from '../../src/services/scroll-register';
import { ScrollResolver } from '../../src/services/scroll-resolver';

import { ElementRef, NgZone, SimpleChanges, SimpleChange } from '@angular/core';

describe('Infinite Scroll Directive', () => {
  // const zone = new NgZone({ enableLongStackTrace: false });
  let isScrollingDown = true;
  let zoneSpy: any, scrollResolverSpy: any, scrollRegisterSpy: any, positionResolverSpy: any;
  let directive: InfiniteScrollDirective;
  const positionFactoryMock: any =  {
    create: () => positionResolverSpy
  };
  const createMockElement = () => {
    const mockedElement: ElementRef = new ElementRef(document.createElement('div'));
    return mockedElement;
  };
  const createInfiniteScroll = (mockedElement?: any) => {
    mockedElement = mockedElement || createMockElement();
    return new InfiniteScrollDirective(
      mockedElement,
      zoneSpy,
      positionFactoryMock,
      scrollRegisterSpy,
      scrollResolverSpy
    );
  };

  beforeEach(() =>{
    zoneSpy = jasmine.createSpyObj('zone', ['run']);
    zoneSpy.runOutsideAngular = (fn) => fn();
    scrollResolverSpy = {
      getScrollStats: () => {
        return { shouldScroll: true, isScrollingDown };
      }
    };
    scrollRegisterSpy = jasmine.createSpyObj('register', ['attachEvent']);
    positionResolverSpy = jasmine.createSpyObj('pos', ['create', 'container']);
    directive = createInfiniteScroll();
  });

  it('should create an instance of the directive', () => {
    const actual = directive;
    expect(actual).toBeDefined();
  });

  it('should have default @Input properties values', () => {
    const expectedInputs: Object = {
      alwaysCallback: false,
      horizontal: false,
      infiniteScrollContainer: null,
      infiniteScrollDisabled: false,
      infiniteScrollDistance: 2,
      infiniteScrollThrottle: 300,
      infiniteScrollUpDistance: 1.5,
      scrollWindow: true
    };

    Object.keys(expectedInputs).forEach((input) =>
      expect(directive[input]).toEqual(expectedInputs[input]));
  });

  it('should trigger the onScrollDown event when scroll has passed _distancedDown', () => {
    const container = {
      height: 0,
      scrolledUntilNow: 0,
      totalToScroll: 0,
    };
    spyOn(directive, 'onScrollDown');
    directive.ngOnInit();
    directive.handleOnScroll(container);
    const actual = directive.onScrollDown;
    expect(actual).toHaveBeenCalled();
  });

  it('should trigger the onScrollUp event when scroll has passed _distanceUp', () => {
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
    const container = {
      height: 0,
      scrolledUntilNow: 0,
      totalToScroll: 0,
    };
    spyOn(directive, 'onScrollDown');
    directive.ngOnInit();
    directive.infiniteScrollDisabled = true;
    directive.handleOnScroll(container);
    const actual = directive.onScrollDown;
    expect(actual).not.toHaveBeenCalled();
  });

  describe('resolving container', () => {
    let directive: InfiniteScrollDirective;
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
          directive.infiniteScrollContainer = '.test';
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
          directive.infiniteScrollContainer = container;
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

        it('should initialize again when infiniteScrollContainer has changed', () => {
          const anotherContainer = {
            height: 0,
            scrolledUntilNow: 0,
            totalToScroll: 0,
          };
          directive.infiniteScrollContainer = anotherContainer;
          const change = new SimpleChange(container, anotherContainer, false);
          directive.ngOnChanges({ infiniteScrollContainer: change });
          expect(positionFactoryMock.create)
              .toHaveBeenCalledWith(jasmine.objectContaining({windowElement: anotherContainer}));
        });
      });
    });
  });
});
*/