const initialState = {location: 'dashboard'};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOCATION':
            return {...state, location: action.payload};
        default:
            return {...state, location: 'dashboard'};
    }

}
export default reducer;