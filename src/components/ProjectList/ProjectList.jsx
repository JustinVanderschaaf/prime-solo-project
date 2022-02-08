import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

const projectList = () => {
  const history = useHistory();

  const newProject = (event) => {
    history.push('/newProject');
  };

  const tempGallery=(event) => {
    history.push('/projectGallery');
  };



  return(
  <>
  <h1>hello</h1>
  <button onClick={newProject}>Create New Project</button>
  <button onClick={tempGallery}>got to temp gallery</button>
  </>
  )
}
export default projectList;
