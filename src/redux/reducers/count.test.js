import * as actions from '../actions/actions';

describe('Count Actions', () => {
  it('should create an action to increment count', () => {
    const expectedAction = {
      type: actions.INCREMENT,
      amount: 1,
    };

    expect(actions.increment(1)).toEqual(expectedAction);
  });

  it('should create an action to decrement count', () => {
    const expectedAction = {
      type: actions.DECREMENT,
      amount: -1,
    };

    expect(actions.decrement(1)).toEqual(expectedAction);
  });

  it('should create an action to reset count', () => {
    const expectedAction = {
      type: actions.RESET_COUNT,
    };

    expect(actions.resetCount()).toEqual(expectedAction);
  });
});
