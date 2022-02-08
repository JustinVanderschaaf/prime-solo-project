import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProjectListCards from "../ProjectList/ProjectListCards";
import axios from "axios";


const projectSummery = () => {
    const materials = useSelector((store) => store.materialsReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const [description, setDescription] = React.useState("");
  const galleryPage = (event) => {
    history.push("/projectGallery");
  };

  useEffect(() => {
    dispatch({ type: "GET_MATERIALS" });
  }, []);

  const mats = () => {
      console.log('this it the mats',materials);
  }
  return (
    <>
      <button onClick={galleryPage}>Gallery</button>
      <button onClick={mats}>LOG MATERIALS</button>

      <h3>Notes</h3>
         <textarea className="sumTextBox"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        
    </>
  );
};
export default projectSummery;
