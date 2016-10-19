import {
  async,
  inject
} from '@angular/core/testing';
import { PositionResolver } from './position-resolver';
import { AxisResolver } from './axis-resolver';
import { ElementRef } from '@angular/core';

describe('Position Resolver', () => {

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

  
  it('should set direction for axis', () => {
    const service = createPositionResolver();
    const expected = true;
    service.setDirection(expected);
    const actual = AxisResolver.prototype.setVertical;
    expect(actual).toHaveBeenCalledWith(expected);
  });
    
})
