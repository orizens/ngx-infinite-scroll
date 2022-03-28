import * as Models from '../../src/models';
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

  [
    {
      it: 'should set the triggered to down',
      down: true,
      state: {
        triggered: { down: 0 }
      } as Models.IScrollState,
      prop: 'down'
    },
    {
      it: 'should set the triggered to up',
      down: false,
      state: {
        triggered: { up: 0 }
      } as Models.IScrollState,
      prop: 'up'
    }
  ].forEach(spec => {
    it(spec.it, () => {
      const total = 1000;
      ScrollResolver.updateTriggeredFlag(total, spec.state, true, spec.down);
      const actual = spec.state.triggered[spec.prop];
      expect(actual).toBe(total);
    });
  });

  describe('shouldFireScrollEvent() - DOWN', () => {
    const distance: Models.IScrollerDistance = {
      down: 2
    };
    const scrollingDown = true;
    it('should scroll when scrolled to the up', () => {
      const container: Models.IPositionStats = {
        height: 500,
        scrolled: 400,
        totalToScroll: 900
      };
      const actual = ScrollResolver.shouldFireScrollEvent(
        container,
        distance,
        scrollingDown
      );
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should NOT scroll when NOT scroll pass distance point', () => {
      const container: Models.IPositionStats = {
        height: 500,
        scrolled: 100,
        totalToScroll: 800
      };
      const actual = ScrollResolver.shouldFireScrollEvent(
        container,
        distance,
        scrollingDown
      );
      const expected = false;
      expect(actual).toBe(expected);
    });

    it('should NOT scroll when NOT scroll pass distance point', () => {
      const container: Models.IPositionStats = {
        height: 500,
        scrolled: 0,
        totalToScroll: 800
      };
      const actual = ScrollResolver.shouldFireScrollEvent(
        container,
        distance,
        scrollingDown
      );
      const expected = false;
      expect(actual).toBe(expected);
    });

    it('should NOT scroll when there is no scrollbar', () => {
      const container: Models.IPositionStats = {
        height: 500,
        scrolled: 0,
        totalToScroll: 0
      };
      const actual = ScrollResolver.shouldFireScrollEvent(
        container,
        distance,
        scrollingDown
      );
      const expected = false;
      expect(actual).toBe(expected);
    });
  });

  describe('shouldFireScrollEvent() - UP', () => {
    const distance: Models.IScrollerDistance = {
      up: 2
    };
    const scrollingDown = false;
    it('should scroll when scrolled upwards', () => {
      const container: Models.IPositionStats = {
        height: 500,
        scrolled: 50,
        totalToScroll: 900
      };
      const actual = ScrollResolver.shouldFireScrollEvent(
        container,
        distance,
        scrollingDown
      );
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should NOT scroll when scroll NOT pass up distance point', () => {
      const container: Models.IPositionStats = {
        height: 500,
        scrolled: 200,
        totalToScroll: 800
      };
      const actual = ScrollResolver.shouldFireScrollEvent(
        container,
        distance,
        scrollingDown
      );
      const expected = false;
      expect(actual).toBe(expected);
    });

    it('should scroll when at top zero point', () => {
      const container: Models.IPositionStats = {
        height: 500,
        scrolled: 0,
        totalToScroll: 800
      };
      const actual = ScrollResolver.shouldFireScrollEvent(
        container,
        distance,
        scrollingDown
      );
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should NOT scroll when there is no scrollbar', () => {
      const container: Models.IPositionStats = {
        height: 500,
        scrolled: 0,
        totalToScroll: 0
      };
      const actual = ScrollResolver.shouldFireScrollEvent(
        container,
        distance,
        scrollingDown
      );
      const expected = false;
      expect(actual).toBe(expected);
    });
  });
});
