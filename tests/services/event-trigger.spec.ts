import { IScrollerProps, shouldTriggerEvents, triggerEvents } from '../../src/services/event-trigger';

const props = {
  alwaysCallback: true,
  container: {},
  disabled: false,
  down: 3,
  up: 2
} as IScrollerProps;

describe('EventTrigger', () => {
  it('should return true when alwaysCallback, not disabled', () => {
    const actual = shouldTriggerEvents({
      alwaysCallback: true,
      shouldScroll: false,
      disable: false
    });
    expect(actual).toBeTruthy();
  });

  it('should return true when alwaysCallback, shouldScroll and not disabled', () => {
    const actual = shouldTriggerEvents({
      alwaysCallback: true,
      shouldScroll: true,
      disable: false
    });
    expect(actual).toBeTruthy();
  });

  it('should return true when not alwaysCallback, shouldScroll is true and not disabled', () => {
    const actual = shouldTriggerEvents({
      alwaysCallback: false,
      shouldScroll: true,
      disable: false
    });
    expect(actual).toBeTruthy();
  });

  it('should return false when alwaysCallback, shouldScroll is true and disabled', () => {
    const actual = shouldTriggerEvents({
      alwaysCallback: true,
      shouldScroll: true,
      disable: true
    });
    expect(actual).toBeFalsy();
  });

  it('should return false when not alwaysCallback, shouldScroll is true and disabled', () => {
    const actual = shouldTriggerEvents({
      alwaysCallback: false,
      shouldScroll: true,
      disable: true
    });
    expect(actual).toBeFalsy();
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
