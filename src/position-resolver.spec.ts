import {
  async,
  inject
} from '@angular/core/testing';
import { PositionResolver } from './position-resolver';
import { AxisResolver } from './axis-resolver';
import { ElementRef } from '@angular/core';

describe('Position Resolver', () => {
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

  const createPositionResolver = (element: ElementRef, container: ElementRef) => {
    const options = {
      windowElement: element,
      horizontal: true
    };
    const axis: AxisResolver = new AxisResolver();
    return new PositionResolver(axis, options);
  };

  beforeEach(() =>{
    
  });

  it('should create an instance of position resolver', () => {
    const mockDom = createMockDom();
    const actual = createPositionResolver(mockDom.element, mockDom.container);
    expect(actual).toBeDefined();
  });
  
  it('should calculate points', () => {
    const mockDom = createMockDom();
    const service = createPositionResolver(mockDom.element, mockDom.container);
    const actual = service.calculatePoints(mockDom.element);
    expect(actual).toBeDefined();
  });

  describe('creating instance for non-window element', () => {
    let service: PositionResolver;

    describe('when nativeElement is present', () => {
      beforeEach(() => {
        const mockDom = createMockDom();
        service = createPositionResolver(mockDom.element, mockDom.container);
      });

      it('should use container as nativeElement', () => {
        expect(service.container instanceof HTMLDivElement).toBeTruthy();
      });
    });

    describe('when nativeElement is not present', () => {
      beforeEach(() => {
        const mockDom = createMockDom();
        service = createPositionResolver(mockDom.element, mockDom.container.nativeElement);
      });

      it('should use container as nativeElement', () => {
        expect(service.container instanceof HTMLDivElement).toBeTruthy();
      });
    });
  });
});
