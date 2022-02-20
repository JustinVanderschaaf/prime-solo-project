const materialsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MATERIALS":
      return action.payload;
    default:
      return state;
  }
};

export default materialsReducer;
