import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProjectGalleryCards from "./ProjectGalleryCards";
import ProjectGalleryForm from "./ProjectGalleryForm";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

function ProjectGalleryMain() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedProject = useSelector((store) => store.selectedProject);
  const user = useSelector((store) => store.user);

  const deleteProject = () => {
    Swal.fire({
      title: 'Do you want to DELETE this project? This cant be undone',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Project has been Deleted!', '', 'success')
        dispatch({ type: "DELETE_PROJECT", payload: selectedProject.id });
    history.push("/user")
      } else if (result.isDenied) {
        Swal.fire('Project Safe', '', 'info')
      }
    })
    

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
