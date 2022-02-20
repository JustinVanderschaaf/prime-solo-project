import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

//MUI

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProjectItem from "../ProjectList/ProjectItem";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function ProjectListCards() {
  const history = useHistory();
  const dispatch = useDispatch();
  //reducers
  const projects = useSelector((store) => store.projectReducer);
  const categories = useSelector((store) => store.projectCategoriesReducer);
  const user = useSelector((store) => store.user);
  const username = useSelector((store) => store.usernameReducer);
  //local state
  let [categoryId, setCategoryId] = useState(0);

  //MUI
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  //end MUI
  //on click of new project button push user to new project form page
  const newProject = (event) => {
    history.push("/newProject");
  };
  //on page load get all projects for display categories for dropdown and usernames for filter
  useEffect(() => {
    dispatch({ type: "GET_PROJECTS" });
    dispatch({ type: "FETCH_CATEGORIES" });
    dispatch({ type: "FETCH_USERNAMES" });
  }, []);
  //search based on selected category
  const searchCategory = (event) => {
    event.preventDefault();

    dispatch({
      type: "SEARCH_CATEGORY",
      payload: categoryId,
    });
    setCategoryId(0);
  };

  return (
    <div className="bodyContainer">
      <h2 className="welcome">Welcome, {user.username}!</h2>
      <div id="galleryContainer" className="container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            justifyContent="space-evenly"
          >
            {projects.map((project) => (
              // map through projects and send them as prop to projectItem
              <ProjectItem key={project.id} project={project} />
            ))}
          </Grid>
        </Box>
      </div>

      <div className="btnBox">
        {/* search by category form */}

        <form className="listForm" onSubmit={searchCategory}>
          <div className="cselect">
            <select
              value={categoryId}
              onChange={(evt) => setCategoryId(evt.target.value)}
            >
              <option disabled value="0">
                Pick One!
              </option>
              {/* map through categories for use in dropdown that filters the projects on main page */}
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="SearchCat" type="submit">
            SEARCH
          </button>
        </form>
        {/* search by category form ends*/}

        {/* AUTO COMPLETE */}
        <Autocomplete
          className="cselect"
          disablePortal
          id="combo-box-demo"
          options={username}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField className="listAuto" {...params} label="Username" />
          )}
          onSelect={(event) =>
            dispatch({ type: "FILTER_USERS", payload: event.target.value })
          }
        />
        {/* AUTO COMPLETE ENDS */}

        <button
          className="box"
          id="viewAll"
          onClick={(event) =>
            dispatch({ type: "GET_PROJECTS", payload: event.target.value })
          }
        >
          View All Projects
        </button>

        <div className="box" id="newProject" onClick={newProject}>
          New Project
        </div>
      </div>
    </div>
  );
}

export default ProjectListCards;
