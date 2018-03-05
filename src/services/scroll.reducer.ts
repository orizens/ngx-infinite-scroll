const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TOTAL_TO_SCROLL": {
      const totalToScroll = action.payload;
      const result = { ...state };
      if (state.lastTotalToScroll !== totalToScroll) {
        result.lastTotalToScroll = state.totalToScroll;
        result.totalToScroll = totalToScroll;
      }
      return result;
    }

    case "UPDATE_LAST_SCROLL_POSITION": {
      return {
        ...state,
        lastScrollPosition: action.payload
      };
    }

    case "UPDATE_TRIGGERED_FLAGS": {
      const { payload: { scroll, down } } = action;
      const triggered = {
        ...state.triggered
      };
      if (down) {
        triggered.down = scroll;
      } else {
        triggered.up = scroll;
      }
      return {
        ...state,
        triggered
      };
    }

    default: {
      return state;
    }
  }
};
