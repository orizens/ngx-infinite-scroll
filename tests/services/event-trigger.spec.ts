import { IScrollerProps, shouldTriggerEvents, triggerEvents } from '../../src/services/event-trigger';

const props = {
  alwaysCallback: true,
  container: {},
  disabled: false,
  down: 3,
  up: 2
} as IScrollerProps;

describe('EventTrigger', () => {
  it('should return true when alwaysCallback', () => {
    const actual = shouldTriggerEvents({
      alwaysCallback: true,
      shouldFireScrollEvent: false,
    });
    expect(actual).toBeTruthy();
  });

  it('should return true when alwaysCallback, shouldFireScrollEvent', () => {
    const actual = shouldTriggerEvents({
      alwaysCallback: true,
      shouldFireScrollEvent: true,
    });
    expect(actual).toBeTruthy();
  });

  it('should return true when not alwaysCallback, shouldFireScrollEvent is true', () => {
    const actual = shouldTriggerEvents({
      alwaysCallback: false,
      shouldFireScrollEvent: true,
    });
    expect(actual).toBeTruthy();
  });

  it('should return false when alwaysCallback, shouldFireScrollEvent is true', () => {
    const actual = shouldTriggerEvents({
      alwaysCallback: true,
      shouldFireScrollEvent: true,
    });
    expect(actual).toBeTruthy();
  });

  it('should return false when not alwaysCallback, shouldFireScrollEvent is true', () => {
    const actual = shouldTriggerEvents({
      alwaysCallback: false,
      shouldFireScrollEvent: true,
    });
    expect(actual).toBeTruthy();
  });

  describe('triggerEvents', () => {
    let callbacks;

    beforeEach(() => {
      callbacks = {
        down: jasmine.createSpy('down'),
        up: jasmine.createSpy('up')
      };
    });

    it('should trigger down event when scrolling down', () => {
      triggerEvents(callbacks, true, 9);
      expect(callbacks.down).toHaveBeenCalled();
    });

    it('should trigger up event when scrolling up', () => {
      triggerEvents(callbacks, false, 9);
      expect(callbacks.up).toHaveBeenCalled();
    });
  });
});
