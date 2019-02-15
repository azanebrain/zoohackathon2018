// reducer
const posts = (state = [], action) => {
  switch(action.type) {
    case 'ADD_POST':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          link: action.link,
          featured_media: action.featured_media,
          jetpack_featured_media_url: action.jetpack_featured_media_url,
          excerpt: action.excerpt.rendered,
          content: action.content.rendered,
          categories: action.categories
        }
      ];
    default:
      return state;
  }
};

export default posts;


