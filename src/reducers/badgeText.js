const badgeText = (state = '...', action) => {
  switch (action.type) {
    case 'RESET_BADGE_TEXT':
      return '...';
    case 'SET_BADGE_TEXT':
      return {
        state,
        text: action.text
      };
    default:
      return state; 
  }
};

export default badgeText;
