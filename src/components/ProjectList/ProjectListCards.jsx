import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

//MUI

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProjectItem from "../ProjectList/ProjectItem"

function ProjectListCards() {
  const history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector((store) => store.projectReducer);
  const user = useSelector((store) => store.user);

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
    </>
  );
}

export default ProjectListCards;
