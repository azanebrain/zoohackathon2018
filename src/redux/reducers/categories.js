const categories = (state = {}, action) => {
  const obj = Object.assign({}, state);
  switch (action.type) {
    case 'ADD_CATEGORIES':
      return [
        ...state,
        action.categories,
      ];
    case 'ADD_CATEGORY':
      obj[action.id] = {
        description: action.description,
        id: action.id,
        link: action.link,
        name: action.name,
        parent: action.parent,
        slug: action.slug,
      };
      return obj;
    default:
      return state;
  }
};

export default categories;
