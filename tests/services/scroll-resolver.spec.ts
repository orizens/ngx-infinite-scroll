import * as ScrollResolver from '../../src/services/scroll-resolver';

describe('Manage Scroll State', () => {
  it('should backup old Total and update the new one', () => {
    const state = {
      totalToScroll: 10,
      lastTotalToScroll: 0
    } as any;
    const newTotal = 20;
    ScrollResolver.updateTotalToScroll(newTotal, state);
    const actual = state.totalToScroll;
    const expected = newTotal;
    expect(actual).toEqual(expected);
  });

  it('should return false when total != lastTotal', () => {
    const state = {
      totalToScroll: 10,
      lastTotalToScroll: 0
    } as any;
    const actual = ScrollResolver.isSameTotalToScroll(state);
    expect(actual).toBeFalsy();
  });

  it('should return true total = lastTotal', () => {
    const state = {
      totalToScroll: 10,
      lastTotalToScroll: 10
    } as any;
    const actual = ScrollResolver.isSameTotalToScroll(state);
    expect(actual).toBeTruthy();
  });

  it('should set the isTriggeredTotal', () => {
    const state = {
      isTriggeredTotal: false
    } as any;
    ScrollResolver.updateTriggeredFlag(state, true);
    const actual = state.isTriggeredTotal;
    expect(actual).toBeTruthy();
  });
});
