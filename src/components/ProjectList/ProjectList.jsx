import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProjectListCards from "../ProjectList/ProjectListCards";

const projectList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector((store) => store.projectReducer);
  const user = useSelector((store) => store.user);

  const newProject = (event) => {
    history.push("/newProject");
  };

  useEffect(() => {
    dispatch({ type: "GET_PROJECTS" });
  }, []);

  return (
    <>
      <h2>Welcome, {user.username}!</h2>

      <ProjectListCards />
      <button onClick={newProject}>Create New Project</button>
    </>
  );
};
export default projectList;
