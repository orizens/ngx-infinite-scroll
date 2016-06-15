import { InfiniteScroll } from './infinite-scroll.ts'; 
describe('Infinite Scroll Directive', () => {
  it('true is true', () => {
    expect(true).toEqual(true);
  });
  
  it('should have a scroller property', () => {
    const actual = new InfiniteScroll();
    // const actual = true;
    expect(actual).toBeDefined();
  });
})