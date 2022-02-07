import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProjectList from "../ProjectList";
import { useHistory } from "react-router-dom";
import axios from "axios";




  const AddProject = () => {


    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
  
    // display all projects on DOm upon app load
    useEffect(() => {
      dispatch({
        type: "GET_PROJECT_PHOTOS",
      });
    }, []);



    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0])
    }


    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = React.useState(null);
    // const [selectedDescription, setSelectedDescription] = React.useState('');
  
    async function handleSubmit(event) {
      event.preventDefault()
      const formData = new FormData();

      formData.append("selectedFile", selectedFile);
      console.log('selected file is', selectedFile);
      console.log('form data is,',formData);
      
        dispatch({ 
            type: 'SEND_FILE',
            payload: formData
        });
    
    };


      

    


  return (
    <>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
      </div>
      
      <form onSubmit={handleSubmit} >
        <div className="form-group">
        <input
            type="file"
            className="form-control-file"
            name="uploaded_file"
            onChange={handleFileSelect}
          />
          
          {/* <input
            type="text"
            className="form-control"
            placeholder="Description"
            name="description"
            onChange={handleSubtitle}
          /> */}
       
         

        <input type="submit" value="Upload File" />
        </div>
        <ProjectList />
      </form>
      <LogOutButton className="btn" />
    </>
  );
}

export default AddProject;
