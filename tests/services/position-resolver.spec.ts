import {
  async,
  inject
} from '@angular/core/testing';
import { PositionResolver } from '../../src/services/position-resolver';
import { AxisResolver } from '../../src/services/axis-resolver';
import { ElementRef } from '@angular/core';
import { IResolver } from '../../src/models';

describe('Position Resolver', () => {
  let mockedElement: ElementRef;
  let mockedContainer: ElementRef;
  let mockDom, positionResolver, axis: AxisResolver;

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

  const createPositionResolver = () => {
    return new PositionResolver();
  };

  beforeEach(() => {
    axis = new AxisResolver(false);
    mockDom = createMockDom();
    positionResolver = createPositionResolver();
  });

  it('should create an instance of position resolver', () => {
    const actual = positionResolver.create({
      horizontal: false,
      windowElement: mockDom.element
    })
    expect(actual).toBeDefined();
  });

  it('should calculate points', () => {
    const resolver = positionResolver.create({
      axis,
      windowElement: mockDom.element
    });
    const actual = positionResolver.calculatePoints(mockDom.element, resolver);
    expect(actual).toBeDefined();
  });

  describe('creating instance for non-window element', () => {
    let service: IResolver;

    describe('when nativeElement is present', () => {
      beforeEach(() => {
        service = positionResolver.create({
          axis,
          windowElement: mockDom.element
        });
      });

      it('should use container as nativeElement', () => {
        expect(service.container instanceof HTMLDivElement).toBeTruthy();
      });
    });

    // describe('when nativeElement is not present', () => {
    //   beforeEach(() => {
    //     const mockDom = createMockDom();
    //     service = createPositionResolver(mockDom.element, mockDom.container.nativeElement);
    //   });

    //   it('should use container as nativeElement', () => {
    //     expect(service.container instanceof HTMLDivElement).toBeTruthy();
    //   });
    // });
  });
});
