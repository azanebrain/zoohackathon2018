const initialState = {};

const matches = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORY_MATCH':
      return { ...state, [action.id]: { isActive: false } };
    case 'CATEGORY_MATCH_ACTIVE':
      return { ...state, [action.id]: { isActive: !state[action.id].isActive } };
    case 'RESET_MATCHES':
      return initialState;
    default:
      return state;
  }
};


export default matches;
