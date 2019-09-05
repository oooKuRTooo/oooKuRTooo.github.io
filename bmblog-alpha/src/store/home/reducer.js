const initialState = {

}

export default function(state=initialState, action) {

    switch (action.type) {

      case 'ACTION_NAME':
        return { ...state, something: action.payload };

      default:
        return state;
    }
}
