import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

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

function ProjectGalleryCards() {
  const dispatch = useDispatch();
  const selectedProject = useSelector((store) => store.selectedProject);
  const projectImages = useSelector((store) => store.projectImageReducer);
  const user = useSelector((store) => store.user);

  //MUI
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  //end MUI
  useEffect(() => {
    dispatch({ type: "GET_PROJECT_PHOTOS", payload: selectedProject.id });
  }, []);

  const removeImage = (photo) => {
    let photoToRemove = {
      selectedProject: selectedProject,
      photo: photo.id,
    };
    dispatch({ type: "DELETE_PHOTO", payload: photoToRemove });
  };

  const setBeforeImage = (photo) => {
    console.log("Change photo id is", photo.url);
    let photoToBefore = {
      selectedProject: selectedProject,
      photo: photo.url,
    };
    dispatch({ type: "CHANGE_BEFORE_IMG", payload: photoToBefore });
  };
  const setAfterImage = (photo) => {
    console.log("Change photo id is", photo.url);
    let photoToAfter = {
      selectedProject: selectedProject,
      photo: photo.url,
    };
    dispatch({ type: "CHANGE_AFTER_IMG", payload: photoToAfter });
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
          {projectImages.map((photo) => (
            <Grid key={photo.id} item md>
              <Item>
                <Card id="cards" sx={{ maxWidth: 200, minWidth: 200 }}>
                  <CardActions>
                    <Button size="small" onClick={() => setBeforeImage(photo)}>
                      Before
                    </Button>
                    <Button size="small" onClick={() => setAfterImage(photo)}>
                      After
                    </Button>

                    <Button size="small" onClick={() => removeImage(photo)}>
                      Remove
                    </Button>
                  </CardActions>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={`uploads/${photo.url}`}
                  />
                  <CardContent>
                    <Typography variant="body2">{photo.subtitle},</Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default ProjectGalleryCards;
