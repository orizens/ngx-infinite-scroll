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
  it('should create an instance of the directive', () => {
    const mockedElement = {};
    const actual = new InfiniteScroll(mockedElement);
    expect(actual).toBeDefined();
  });

  it('should have default @Input properties values', () => {
    const mockedElement = {};
    const directive = new InfiniteScroll(mockedElement);
    const expectedInputs = [
      '_distanceDown',
      '_distanceUp',
      '_throttle',
      'scrollWindow',
      '_immediate'
    ];
    expectedInputs.forEach(actualInput =>
      expect(directive[actualInput]).toBeDefined());
  });

  it('should trigger the onScrollDown event when scroll has passed _distandDown', () => {
    const mockedElement = {};
    const directive = new InfiniteScroll(mockedElement);
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
    const mockedElement = {};
    const directive = new InfiniteScroll(mockedElement);
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
})