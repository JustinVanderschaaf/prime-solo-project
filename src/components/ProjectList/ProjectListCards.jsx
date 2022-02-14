import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

//MUI

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProjectItem from "../ProjectList/ProjectItem"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function ProjectListCards() {
  let [categoryId, setCategoryId] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector((store) => store.projectReducer);
  const categories = useSelector((store) => store.projectCategoriesReducer);
  const user = useSelector((store) => store.user);
  const username = useSelector((store) => store.usernameReducer);


  
  //MUI
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  //end MUI

  const newProject = (event) => {
    history.push("/newProject");
  };

  useEffect(() => {
    dispatch({ type: "GET_PROJECTS" });
  }, []);
  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES" });
    dispatch({ type: "FETCH_USERNAMES" });
  }, []);


  const searchCategory = (event) => {
    event.preventDefault();
    console.log("Current category",categoryId,);

    dispatch({
      type: "SEARCH_CATEGORY",
      payload: categoryId,
    });
    setCategoryId(0);
  };

console.log("AASDFGHJERTRDFGCBXZFD",username);
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];
  
  return (
    <>
      <h2>Welcome, {user.username}!</h2>
      <div id="galleryContainer" className="container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            justifyContent="space-evenly"
          >
            {projects.map((project) => (
                <ProjectItem 
                key={project.id}
          project={project}
                />
              
            ))}
          </Grid>
        </Box>
      </div>
      <button onClick={newProject}>Create New Project</button>


              {/* search by category form */}
      <form onSubmit={searchCategory}>
      <select
          id="select"
          value={categoryId}
          onChange={(evt) => setCategoryId(evt.target.value)}
        >
          <option disabled value="0">
            Pick One!
          </option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <button className="newProjectBtn" type="submit">
          SEARCH
        </button>
      </form>
{/* search by category form ends*/}


<Autocomplete
      disablePortal
      id="combo-box-demo"
      options={username}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Username" />}
      onSelect={(event) => dispatch({ type: 'FILTER_USERS', payload: event.target.value})}
    />

    
    </>
  );
}

export default ProjectListCards;
