import {
  IScrollerProps,
  shouldTriggerEvents
} from '../../src/services/event-trigger';

const props = {
  alwaysCallback: true,
  container: {},
  disabled: false,
  down: 3,
  up: 2
} as IScrollerProps;

describe('EventTrigger', () => {
  [
    {
      it: 'should return TRUE when alwaysCallback, shouldFireScrollEvent',
      params: {
        alwaysCallback: true,
        shouldFireScrollEvent: true,
        isTriggeredTotal: false
      },
      expected: true
    },
    {
      it: 'should return FALSE when alwaysCallback, NOT shouldFireScrollEvent',
      params: {
        alwaysCallback: true,
        shouldFireScrollEvent: false,
        isTriggeredTotal: true
      },
      expected: false
    },
    {
      it: 'should return FALSE when alwaysCallback',
      params: {
        alwaysCallback: true,
        shouldFireScrollEvent: false,
        isTriggeredTotal: false
      },
      expected: false
    },
    {
      it:
        'should return TRUE when alwaysCallback, shouldFireScrollEvent, isTriggeredTotal',
      params: {
        alwaysCallback: true,
        shouldFireScrollEvent: true,
        isTriggeredTotal: true
      },
      expected: true
    },
    {
      it: 'should return TRUE when shouldFireScrollEvent ONLY',
      params: {
        alwaysCallback: false,
        shouldFireScrollEvent: true,
        isTriggeredTotal: false
      },
      expected: true
    },
    {
      it: 'should return FALSE when shouldFireScrollEvent, isTriggeredTotal',
      params: {
        alwaysCallback: false,
        shouldFireScrollEvent: true,
        isTriggeredTotal: true
      },
      expected: false
    },
    {
      it:
        'should return FALSE when not alwaysCallback, shouldFireScrollEvent is false',
      params: {
        alwaysCallback: false,
        shouldFireScrollEvent: false,
        isTriggeredTotal: false
      },
      expected: false
    },
    {
      it: 'should return FALSE when isTriggeredTotal ONLY',
      params: {
        alwaysCallback: false,
        shouldFireScrollEvent: false,
        isTriggeredTotal: true
      },
      expected: false
    }
  ].forEach(spec => {
    it(spec.it, () => {
      const {
        isTriggeredTotal,
        alwaysCallback,
        shouldFireScrollEvent
      } = spec.params;
      const actual = shouldTriggerEvents(
        alwaysCallback,
        shouldFireScrollEvent,
        isTriggeredTotal
      );
      expect(actual).toBe(spec.expected);
    });
  });
});
