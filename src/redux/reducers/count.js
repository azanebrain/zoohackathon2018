const initialState = { count: 0 };

const count = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.amount,
      };
    case 'DECREMENT':
      return {
        count: state.count - action.amount,
      };
    case 'RESET_COUNT':
      return initialState;
    default:
      return state;
  }
};


export default count;
