// reducer
const categories = (state = [], action) => {
  switch(action.type) {
    case 'ADD_CATEGORY':
    return [
      ...state,
      {
        id: action.id,
        link: action.link,
        name: action.name
      }
    ];
    default:
      return state;
  }
};

export default categories;
