const initialState = {
  isAuth: false,
  name: '',
  password: '',
  token: ''
}

export default function(state = initialState, action) {

  switch (action.type) {

    case 'AUTH':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
