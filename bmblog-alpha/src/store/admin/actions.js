export const auth = data => dispatch => {

    dispatch({
        type: 'AUTH',
        payload: {
            isAuth: true,
            username: data.username,
            password: data.password,
            token: data.token
        }
    });
}

