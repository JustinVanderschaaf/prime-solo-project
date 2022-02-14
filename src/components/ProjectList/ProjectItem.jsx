import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
//prop is project from projectList map
function ProjectItem(prop) {
  const history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector((store) => store.projectReducer);
  const user = useSelector((store) => store.user);
  const project = prop.project;
  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState("")
  //MUI
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  //end MUI

  const handleSelectProject = (project) => {
    // store selected movie object in Redux
    dispatch({ type: "SET_SELECTED_PROJECT", payload: project });
    // go to details view
    history.push("/projectGallery");
  };

  let [togglePic, setTogglePic] = useState(project.after_img);
  const beforeImg = () => {
    setTogglePic(project.before_img);
  };
  const afterImg = () => {
    setTogglePic(project.after_img);
  };

 

  const editTitle = (event) => {
    event.preventDefault();
    console.log("NewTitle is !!!", newTitle,project.id);
   let titleToSend = {
    newTitle: newTitle, 
    project: project.id
   }
    dispatch({ type: "CHANGE_TITLE", payload: titleToSend });

  };

 

  return (
    <>
      <Grid key={project.id}>
        <Item>
          <div>project owner: {project.username}</div>
          <Card id="cards" sx={{ maxWidth: 300, minWidth: 300 }}>
            <CardActions>
              <Button onClick={afterImg} size="small">
                After
              </Button>
              <Button onClick={beforeImg} size="small">
                Before
              </Button>
              
            </CardActions>
            <CardMedia
              component="img"
              alt="NEW PROJECT"
              height="300"
              image={`uploads/${togglePic}`}
              onClick={() => handleSelectProject(project)}
            />
            <CardContent>
              <Typography variant="body2">
              {editable === false ?
            <h3>{project.title}</h3> :
            <form onSubmit={editTitle}>
            <input rows="4" cols="50" 
                type="text"
                value={newTitle}
                onChange={(evt) => setNewTitle(evt.target.value)}
                placeholder={project.title}
               >
            </input>
            {user.id === project.user_id && (<button className="newProjectBtn" type="submit">
          Submit
        </button>)}
            </form>
        }
              </Typography>
              {user.id === project.user_id && (<button onClick={() => setEditable(true)}>Edit Details</button>)}
              {user.id === project.user_id && (<button onClick={() => setEditable(false)}>Cancel</button>)}
              
            </CardContent>
          </Card>
          
       
        

        
        </Item>
      </Grid>
      
    
    </>
  );
}

export default ProjectItem;
