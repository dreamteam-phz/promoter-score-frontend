const date = new Date();
date.setMonth(date.getMonth() - 6);
date.setDate(1);

const initialState = {
  location: "dashboard",
  dashboard: {
    comments: "all",
    selectedMonth: 180,
    data: [],
    scoreData: {},
    surveyID: 0,
    startDate: date,
    endDate: new Date(),
    filteredData: [],
  },
  loaded: false,
  selectedSurvey: ""

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOCATION":
      return { ...state, location: action.payload };
    case "LOADED":
      return { ...state, loaded: action.payload };
    case "DASHBOARD":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          ...action.payload,
        },
      };
    default:
      return { ...state, location: "dashboard" };
  }
};
export default reducer;
