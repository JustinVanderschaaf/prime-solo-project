const selectedProject = (state = {}, action) => {
    switch (action.type) {
      case "SET_SELECTED_PROJECT":
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default selectedProject;