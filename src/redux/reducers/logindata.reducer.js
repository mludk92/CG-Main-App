const logindataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOGIN_DATA_LIST':
            return action.payload;
        default:
            return state;
    }
};

export default logindataReducer;