const initialState = {};

const matches = (state = initialState, action) => {
  const obj = Object.assign({}, state);
  switch (action.type) {
    case 'CATEGORY_MATCH':
      obj[action.id] = { isActive: false };
      return obj;
    case 'CATEGORY_MATCH_ACTIVE':
      obj[action.id].isActive = !state[action.id].isActive;
      return obj;
    case 'RESET_MATCHES':
      return initialState;
    default:
      return state; 
  }
};


export default matches;