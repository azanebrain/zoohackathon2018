const categories = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CATEGORIES':
      return [
        ...state,
        action.categories,
      ];
    case 'ADD_CATEGORY':
      return {
        ...state,
        [action.id]: {
          description: action.description,
          id: action.id,
          link: action.link,
          name: action.name,
          parent: action.parent,
          slug: action.slug,
        },
      };
    default:
      return state;
  }
};

export default categories;
