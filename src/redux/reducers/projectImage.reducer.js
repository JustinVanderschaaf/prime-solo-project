const projectImageReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PROJECT_IMAGES":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default projectImageReducer;
