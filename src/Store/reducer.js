const initialState = {
    location: 'dashboard',
    dashboard: {
        comments: '',
        selectedMonth: 180
}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOCATION':
            return {...state, location: action.payload};
        case 'DASHBOARD':

            return {...state, dashboard: {
                ...state.dashboard,
                ...action.payload
            }};
        default:
            return {...state, location: 'dashboard'};
    }

}
export default reducer;