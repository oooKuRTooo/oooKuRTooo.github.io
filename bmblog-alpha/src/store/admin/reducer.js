const initialState = {
  isAuth: false,
  name: '',
  password: '',
  token: 'b5cf190a6cf70667989fe5fd2fd428'
}

export default function(state = initialState, action) {

  switch (action.type) {

    case 'AUTH':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
