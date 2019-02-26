const posts = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_POSTS':
      return [
        ...state,
        action.posts,
      ];
    case 'ADD_POST':
      return {
        ...state,
        [action.id]: {
          categories: action.categories,
          content: action.content,
          excerpt: action.excerpt,
          featuredMediaUrl: action.jetpack_featured_media_url,
          link: action.link,
          modified: action.modified,
          slug: action.slug,
          title: action.title,
          isActive: false,
        },
      };
    case 'TOGGLE_POST':
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          isActive: !state[action.postId].isActive,
        },
      };
    default:
      return state;
  }
};

export default posts;
