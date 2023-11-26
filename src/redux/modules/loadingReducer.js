const initialState = { isLoading: false };

export const LOADING = 'loading/LOADING';
export const DONE = 'loading/DONE';

export const load = () => {
    return {
        type: LOADING
    };
};

export const done = () => {
    return {
        type: DONE
    };
};

const loadingReducer = (state = initialState, { type }) => {
    switch (type) {
        case LOADING:
            return { ...state, isLoading: true };
        case DONE:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};

export default loadingReducer;
