import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import ProjectGalleryCards from "./ProjectGalleryCards";
import { useHistory } from "react-router-dom";

const ProjectGalleryForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const selectedProject = useSelector((store) => store.selectedProject);
  const projectImages = useSelector((store) => store.projectImageReducer);

  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState("");

  // display all projects on DOm upon app load
  // useEffect(() => {
  //   dispatch({ type: "GET_PROJECT_PHOTOS", payload:selectedProject.id });

  // }, []);

  //Event handlers
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubtitle = (event) => {
    setSelectedDescription(event.target.value);
  };
  //End event handlers
  const itemToSend = {
    subTitle: selectedDescription,
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("projectId", selectedProject.id);
    formData.append("description", selectedDescription);
    formData.append("selectedFile", selectedFile);

    console.log("item to send with selected file is", itemToSend);
    console.log("form data is,", formData);

    dispatch({
      type: "SEND_FILE",
      payload: formData,
    });
  }

  const summeryPage = (event) => {
    history.push("/summery");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            name="uploaded_file"
            onChange={handleFileSelect}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Description"
            name="description"
            onChange={handleSubtitle}
          />

          <input type="submit" value="Upload File" />
        </div>
      </form>
      
    </>
  );
};

export default ProjectGalleryForm;
