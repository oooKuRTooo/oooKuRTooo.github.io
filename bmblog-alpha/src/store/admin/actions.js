export const auth = data => dispatch => {

    dispatch({
        type: 'AUTH',
        payload: {
            isAuth: data.isAuth || false,
            username: data.username,
            password: data.password,
            token: data.token
        }
    });
}

