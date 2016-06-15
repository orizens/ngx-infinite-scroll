import {
  iit,
  it,
  ddescribe,
  describe,
  expect,
  async,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { InfiniteScroll } from './infinite-scroll'; 
describe('Infinite Scroll Directive', () => {
  it('true is true', () => {
    expect(true).toEqual(true);
  });
  
  it('should have a scroller property', () => {
    const mockedElement = {};
    const actual = new InfiniteScroll(mockedElement);
    // console.log('InfiniteScroll Directive', InfiniteScroll);
    // const actual = true;
    expect(actual).toBeDefined();
  });
})