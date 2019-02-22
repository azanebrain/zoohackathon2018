const initialState = 0;

const count = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + (action.payload || 1);
    case 'DECREMENT':
      return state - (action.payload || 1);
    case 'RESET_COUNT':
      return initialState;
    default:
      return state; 
  }
};


export default count;
