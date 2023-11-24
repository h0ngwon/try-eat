const initialState = { isLogin: false };

export const LOGIN = 'login/LOGIN';
export const LOGOUT = 'login/LOGOUT';

export const login = () => {
    return {
        type: LOGIN
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

const stateReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return {...state, isLogin: true};
        case LOGOUT:
            return {...state, isLogin: false}
        default:
            return state;
    }
};

export default stateReducer;