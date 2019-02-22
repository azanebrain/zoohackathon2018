const categories = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CATEGORIES':
      //do stuff
      return [
        ...state,
        action.categories,
      ]
    case 'ADD_CATEGORY':
      //do stuff
      const obj = Object.assign({}, state);
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
}

export default categories;
