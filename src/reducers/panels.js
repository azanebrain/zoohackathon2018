// reducer
const panels = (state = {}, action) => {
  switch(action.type) {
    case 'TOGGLE_PANEL':
      state[action.id] = 1 - (state[action.id]|0);
      return state;
    default:
      return state;
  }
};

export default panels;
