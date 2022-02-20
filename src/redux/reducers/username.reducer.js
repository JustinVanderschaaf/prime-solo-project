const usernameReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USERNAMES":
      return action.payload;
    default:
      return state;
  }
};

export default usernameReducer;
