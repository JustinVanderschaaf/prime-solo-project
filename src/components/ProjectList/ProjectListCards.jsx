import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//MUI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function ProjectListCards() {
  const history = useHistory();
  const projects = useSelector((store) => store.projectReducer); //<<<CHANGE REDUCER
  const user = useSelector((store) => store.user);
  console.log("this is user", user);
  console.log("projects are ", projects); ///<<<CHANGE

  //MUI
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  //end MUI

  const tempGallery = (event) => {
    history.push("/projectGallery");
  };

  return (
    <div className="container">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          justifyContent="space-evenly"
        >
          {projects.map(
            (
              project //<<<<<<CHANGE MAP
            ) => (
              <Grid key={project.id} item md>
                <Item>
                  <Card id="cards" sx={{ maxWidth: 200, minWidth: 200 }}>
                    <CardActions>
                      <Button size="small">After</Button>
                      <Button size="small">Before</Button>
                    </CardActions>
                    <CardMedia
                      component="img"
                      alt="NEW PROJECT"
                      height="200"
                      onClick={tempGallery}
                    />
                    <CardContent>
                      <Typography variant="body2">{project.title}</Typography>
                    </CardContent>
                  </Card>
                </Item>
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default ProjectListCards;
