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

    let imageDataToSend = {
      formData: formData,
      selectedProject: selectedProject,
    };

    dispatch({
      type: "SEND_FILE",
      payload: imageDataToSend,
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

{/* <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl id="titleBox" fullWidth sx={{ m: 1 }}>
              <InputLabel id="titleLabel" htmlFor="outlined-adornment-amount">
                Photo Title
              </InputLabel>
              <OutlinedInput
                type="text"
                
                
                onChange={handleSubtitle}
                label="Photo Title"
              />
            </FormControl>
          </Box> */}
          <input
          className="photoTitle"
            type="text"
            className="form-control"
            placeholder="Photo Title"
            name="description"
            onChange={handleSubtitle}
          />

          <input type="submit" value="Add new Photo" />
        </div>
      </form>
    </>
  );
};

export default ProjectGalleryForm;
