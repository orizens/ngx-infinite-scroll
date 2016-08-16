import { AxisResolver }                        from './axis-resolver';
import { ElementRef }                          from '@angular/core'; 

describe('AxisResolver Class', () => {
  const makeMockElement =
    (): ElementRef => { return new ElementRef(document.createElement('div'));};

  const base_names = ['clientHeight', 'offsetHeight', 'scrollHeight'];

  it('should create an instance of AxisResolver', () => {
    const testResolver = new AxisResolver();

    expect(testResolver).toEqual(jasmine.any(AxisResolver));
  });

  it('should default constructor arg to true', () => {
    const defaultResolver  = new AxisResolver();
    const verticalResolver = new AxisResolver(true);

    const results          = defaultResolver.topKey();

    expect(results).toBe(verticalResolver.topKey());
  });

  it('should change topKey() to "left" if created "horizontal"', () => {
    const horizontalResolver = new AxisResolver(false);

    expect(horizontalResolver.topKey()).toBe('left');
  });

  it('should make Height into Width if created "horizontal"', () => {
    const horizontalResolver = new AxisResolver(false);

    const methodNames = base_names.map( (name) => name + 'Key' );
    const results = methodNames.map( (mName) => horizontalResolver[mName]() );
    const are_widths = results.map( (result) => result.match(/Width/) );

    expect( are_widths.every( (elt) => elt ) ).toBe(true);
  });

})
