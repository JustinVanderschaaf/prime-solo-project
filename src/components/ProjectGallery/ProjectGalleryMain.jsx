import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProjectGalleryCards from "./ProjectGalleryCards";
import ProjectGalleryForm from "./ProjectGalleryForm";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function ProjectGalleryMain() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedProject = useSelector((store) => store.selectedProject);
  const user = useSelector((store) => store.user);

  const deleteProject = () => {
    Swal.fire({
      title: "Are you sure you want to delete project?",
      text: "You won't be able to revert this!",
      imageUrl: `uploads/${selectedProject.after_img}`,
      imageWidth: 400,
      imageHeight: 350,
      imageAlt: "Custom image",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete Entire Project!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Project has been Deleted!", "", "success");
        dispatch({ type: "DELETE_PROJECT", payload: selectedProject.id });
        history.push("/user");
      } else if (result.isDenied) {
        Swal.fire("Project Safe", "", "info");
      }
    });
  };

  return (
    <div className="bodyContainer">
      <ProjectGalleryCards />
      <div className="galleryForm">
      {user.id === selectedProject.user_id && <ProjectGalleryForm />}
      {user.id === selectedProject.user_id && (
        <button onClick={deleteProject}>
          DELETE PROJECT
        </button>
      )}
      </div>
    </div>
  );
}

export default ProjectGalleryMain;
