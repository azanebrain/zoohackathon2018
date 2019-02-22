const posts = (state = {}, action) => {
  const obj = Object.assign({}, state);
  switch (action.type) {
    case 'ADD_POSTS':
      //do stuff
      return [
        ...state,
        action.posts,
      ]
    case 'ADD_POST':
      //do stuff
      obj[action.id] = {
        categories: action.categories,
        content: action.content,
        excerpt: action.excerpt,
        featured_media: action.featured_media,
        jetpack_featured_media_url: action.jetpack_featured_media_url,
        link: action.link,
        modified: action.modified,
        slug: action.slug,
        title: action.title,
        isActive: false, 
      };
      return obj;
    case 'TOGGLE_POST':
      obj[action.postId].isActive = !obj[action.postId].isActive;
      return obj;
  
    default:
      return state;
  }
}

export default posts;
