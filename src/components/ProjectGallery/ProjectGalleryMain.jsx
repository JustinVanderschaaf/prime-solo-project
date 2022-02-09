import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProjectGalleryCards from "./ProjectGalleryCards";
import ProjectGalleryForm from "./ProjectGalleryForm";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useHistory } from "react-router-dom";

function ProjectGalleryMain() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedProject = useSelector((store) => store.selectedProject);
  const user = useSelector((store) => store.user);

  const deleteProject = () => {
    console.log("delete project id is", selectedProject.id);

    dispatch({ type: "DELETE_PROJECT", payload: selectedProject.id });
  };

  const summeryPage = (event) => {
    history.push("/summery");
  };
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>your project id is: {selectedProject.id}</p>

      <button onClick={summeryPage}>Summery</button>
      <ProjectGalleryForm />
      <ProjectGalleryCards />
      <LogOutButton className="btn" />
      <button onClick={deleteProject}>
        DELETE PROJECT{selectedProject.id}
      </button>
    </div>
  );
}

export default ProjectGalleryMain;
