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
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
//end MUI

//prop is project from projectList map
function ProjectItem(prop) {
  const history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector((store) => store.projectReducer);
  const user = useSelector((store) => store.user);
  const project = prop.project;
  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [toggle, setToggle] = useState(true);
  //MUI

  const handleSelectProject = (project) => {
    // store selected movie object in Redux
    dispatch({ type: "SET_SELECTED_PROJECT", payload: project });
    // go to details view
    history.push("/projectGallery");
  };

  let [togglePic, setTogglePic] = useState(project.after_img);
  const beforeImg = () => {
    setTogglePic(project.before_img);
    setToggle(!toggle);
  };
  const afterImg = () => {
    setTogglePic(project.after_img);
    setToggle(!toggle);
  };

  const editTitle = (event) => {
    event.preventDefault();
    console.log("NewTitle is !!!", newTitle, project.id);
    let titleToSend = {
      newTitle: newTitle,
      project: project.id,
    };
    dispatch({ type: "CHANGE_TITLE", payload: titleToSend });
  };

  console.log("rerendered");
  return (
    <Grid>
      <Item id="item">
        <div>project owner: {project.username}</div>
        <Card id="cards" sx={{ maxWidth: 220, minWidth: 220 }}>
          <CardActions>
            {!toggle ? (
              <FontAwesomeIcon
                icon={faArrowsRotate}
                transform="grow-9 right-15 down-4"
                onClick={afterImg}
              />
            ) : (
              <FontAwesomeIcon
                icon={faArrowsRotate}
                transform="grow-9 right-15 down-4"
                onClick={beforeImg}
              />
            )}
          </CardActions>
          <CardMedia
            component="img"
            alt="NEW PROJECT"
            height="220"
            image={`uploads/${togglePic}`}
            onClick={() => handleSelectProject(project)}
          />
          <CardContent>
            <div variant="body2">
              {!editable ? (
                <h3>{project.title}</h3>
              ) : (
                <form onSubmit={editTitle}>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(evt) => {
                      setNewTitle(evt.target.value);
                    }}
                    placeholder={project.title}
                  />
                  {user.id === project.user_id && (
                    <button className="newProjectBtn" type="submit">
                      Submit
                    </button>
                  )}
                  <FontAwesomeIcon
                    icon={faBan}
                    transform="grow-9 right-15 down-4"
                    onClick={() => setEditable(false)}
                  />
                </form>
              )}
            </div>
            {user.id === project.user_id && (
              <FontAwesomeIcon
                className="penIcon"
                icon={faPenToSquare}
                flip="horizontal"
                transform="grow-9 right-105 down-20"
                onClick={() => setEditable(true)}
              />
            )}
          </CardContent>
        </Card>
      </Item>
    </Grid>
  );
}

export default ProjectItem;
