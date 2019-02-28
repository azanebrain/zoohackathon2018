import * as actions from '../actions/actions';

describe('Match Actions', () => {
  it('should create an action to increment count', () => {
    const expectedAction = {
      type: actions.INCREMENT,
      amount: 1,
    };

    expect(actions.increment(1)).toEqual(expectedAction);
  });

  it('should create an action to set category match', () => {
    const expectedAction = {
      type: actions.CATEGORY_MATCH,
      id: 3,
      isActive: false,
    };

    expect(actions.categoryMatch(3)).toEqual(expectedAction);
  });

  it('should create an action to reset matches', () => {
    const expectedAction = {
      type: actions.RESET_MATCHES,
    };

    expect(actions.resetMatches()).toEqual(expectedAction);
  });
});
