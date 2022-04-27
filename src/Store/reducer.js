const initialState = {location: 'dashboard', dashboard: {
    comments: ''
}};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOCATION':
            return {...state, location: action.payload};
        case 'DASHBOARD':
            return {...state, dashboard: {
                comments: action.payload.comments
            }};
        default:
            return {...state, location: 'dashboard'};
    }

}
export default reducer;