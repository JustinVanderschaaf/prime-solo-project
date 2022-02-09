import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProjectGalleryCards from "./ProjectGalleryCards";
import ProjectGalleryForm from "./ProjectGalleryForm";
import LogOutButton from "../LogOutButton/LogOutButton";

function ProjectGalleryMain() {
    const dispatch = useDispatch();
    const selectedProject = useSelector((store) => store.selectedProject);
    
    const deleteProject = () => {
        console.log("delete project id is", selectedProject.id);

        dispatch({ type: "DELETE_PROJECT", payload: selectedProject.id });
        
      };
      


  return (
    <div className="container">
      <ProjectGalleryForm />
      <ProjectGalleryCards />
      <LogOutButton className="btn" />
      <button onClick={deleteProject}>DELETE PROJECT{selectedProject.id}</button>
    </div>
  );
}

export default ProjectGalleryMain;
