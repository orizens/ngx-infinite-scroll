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

  const createPositionResolver = () => {
    const axis: AxisResolver = new AxisResolver();
    return new PositionResolver(axis);
  };

  beforeEach(() =>{
    spyOn(AxisResolver.prototype, 'setVertical').and.callThrough();
  });

  it('should create an instance of position resolver', () => {
    const actual = createPositionResolver();
    expect(actual).toBeDefined();
  });
  
  it('should set direction in config phase', () => {
    const service = createPositionResolver();
    const dom = createMockDom();
    const options = {
      container: dom.container,
      documentElement: document,
      isContainerWindow: true,
      horizontal: false
    };
    service.config(options);
    const actual = AxisResolver.prototype.setVertical;
    const expected = !options.horizontal;
    expect(actual).toHaveBeenCalledWith(expected);
  });

  it('should calculate points', () => {
    const service = createPositionResolver();
    const dom = createMockDom();
    const options = {
      container: dom.container,
      documentElement: document,
      isContainerWindow: true,
      horizontal: false
    };
    service.config(options);
    const actual = service.calculatePoints(dom.element);
    expect(actual).toBeDefined();
  });
})
