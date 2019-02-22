const defaultState = {
  active: false,
  incognito: false,
  status: 'loading',
  title: '',
  url: '',
}

const page = (state=defaultState,action) => {
  switch (action.type) {
    case 'PAGE':
      return {
        state,
        active: action.active,
        incognito: action.incognito,
        status: action.status,
        title: action.title,
        url: action.url,
      }
    default:
      return state;
  }
}

export default page;
