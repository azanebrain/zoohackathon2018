// reducer
const match = (state = {}, action) => {
    switch(action.type) {
      case 'CATEGORY_MATCH':
        state[action.id] = 1 - (state[action.id]|0);
        return state;
      default:
        return state;
    }
  };
  
  export default match;