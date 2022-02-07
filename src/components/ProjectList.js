import React from "react";
import { useDispatch, useSelector } from "react-redux";

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

function ProjectList() {
  const projectImages = useSelector((store) => store.projectImageReducer);
  const user = useSelector((store) => store.user);
  console.log("this is user", user);
  console.log("projectPhotos is ", projectImages);

  //MUI
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  //end MUI

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
            <Grid item xs>
              <Item>
                <Card id="cards" key={photo.url} sx={{ maxWidth: 200 }}>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                    <Button size="small">Share</Button>
                  </CardActions>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
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

export default ProjectList;
