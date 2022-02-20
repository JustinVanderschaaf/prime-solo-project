const projectImageReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PROJECT_IMAGES":
      return action.payload;
    default:
      return state;
  }
};

export default projectImageReducer;
