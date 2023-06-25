const badgesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BADGES_LIST':
            return action.payload;
        default:
            return state;
    }
};

export default badgesReducer;