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
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function ProjectGalleryCards() {
  const dispatch = useDispatch();
  //reducers from store/global
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
  //on page load get all project photos filtered by selected project id
  useEffect(() => {
    dispatch({ type: "GET_PROJECT_PHOTOS", payload: selectedProject.id });
  }, [selectedProject.before_img]);
  //delete Image based on photo id with visual confirmation
  const removeImage = (photo) => {
    let photoToRemove = {
      selectedProject: selectedProject,
      photo: photo.id,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      imageUrl: `uploads/${photo.url}`,
      imageWidth: 400,
      imageHeight: 350,
      imageAlt: "Custom image",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete Photo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch({ type: "DELETE_PHOTO", payload: photoToRemove });
      }
    });
  };
  //Set img to the selected project before/After image based on selectedProject
  //these photos will be displayed on main screen and can be toggled between each other
  const setBeforeImage = (photo) => {
    console.log("Change before photo id is", photo.url);
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
    <div id="galleryContainer" className="container">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          justifyContent="space-evenly"
        >
          {/* map through all project images that have been filtered by selected projects
          and display them into cards */}
          {projectImages.map((photo) => (
            <Grid key={photo.id}>
              <Item id="item">
                <Card id="cards" sx={{ maxWidth: 220, minWidth: 220 }}>
                  {/* conditional rendering only owner of project can perform actions */}
                  {user.id === selectedProject.user_id && (
                    <CardActions>
                      <Button
                        id="baBtn"
                        className={
                          photo.url === selectedProject.before_img
                            ? "selected-text"
                            : "nothing"
                        }
                        size="small"
                        onClick={() => setBeforeImage(photo)}
                      >
                        Before
                      </Button>
                      <Button
                        id="baBtn"
                        className={
                          photo.url === selectedProject.after_img
                            ? "selected-text"
                            : "nothing"
                        }
                        size="small"
                        onClick={() => setAfterImage(photo)}
                      >
                        After
                      </Button>
                      <div onClick={() => removeImage(photo)}>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          transform="grow-9 right-50 "
                        />
                      </div>
                    </CardActions>
                  )}
                  {/* conditional rendering so guests can view the project without action*/}
                  {user.id !== selectedProject.user_id && (
                    <CardActions>
                      {selectedProject.username}'s {selectedProject.title}
                    </CardActions>
                  )}
                  <CardMedia
                    component="img"
                    alt={photo.subtitle}
                    height="220"
                    image={`uploads/${photo.url}`}
                  />
                  <CardContent>
                    <Typography variant="body2">{photo.subtitle}</Typography>
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
