// reducer
const panels = (state = [], action) => {
  switch(action.type) {
    case 'TOGGLE_PANEL':
    return state.map(panel =>
      panel.id === action.id ? { ...panel, isActive: !panel.isActive } : panel
    )
    default:
      return state;
  }
};

export default panels;
