// reducer
const posts = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_POST':
      return [
        ...state,
        {
          id: action.id,
          text: action.link,
          name: action.name
        }
      ];
    default:
      return state;
  }
};

export default posts;
