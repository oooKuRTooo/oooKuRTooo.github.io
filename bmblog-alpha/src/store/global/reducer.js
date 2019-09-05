const initialState = {
  isReady: false,
  posts: [],
  settings: null
}

export default function(state = initialState, action) {

  switch (action.type) {

    case 'INIT':
      return { ...state, ...action.payload };

    case 'UPDATE_POSTS':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
