const initialState = 0;

const count = (state = initialState, action) => {
  const newCount = action.amount;
  switch (action.type) {
    case 'INCREMENT':
      return state + action.amount;
    case 'DECREMENT':
      return state - (action.payload || 1);
    case 'RESET_COUNT':
      return initialState;
    default:
      return state;
  }
};


export default count;
