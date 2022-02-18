import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

//MUI
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const NewProject = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.projectCategoriesReducer);
  const user = useSelector((store) => store.user);
  let [budget, setBudget] = useState("");
  let [title, setTitle] = useState("");
  let [categoryId, setCategoryId] = useState(0);
  let [projectDate, setProjectDate] = useState("");
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "GET_PROJECTS" });
  }, [categoryId]);

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);
  //Save budget/title/categoryId/userId data to object on submit/dispatch
  const projectData = {
    budget: budget,
    title: title,
    categoryId: categoryId,
    user: user.id,
    date: projectDate,
  };
  const saveProjectInformation = (event) => {
    event.preventDefault();

    dispatch({
      type: "NEW_PROJECT",
      payload: projectData,
    });

    setBudget("");
    setTitle("");
    setCategoryId(0);
    history.push("/user");
  };

  const cancelProject = () => {
    Swal.fire({
      title: "Do you want to Cancel this project?",
      showDenyButton: true,
      confirmButtonText: "Cancel Project",
      denyButtonText: `Keep Creating`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Canceled!", "", "success");
        history.push("/user");
      } else if (result.isDenied) {
        Swal.fire("Project Safe", "", "info");
      }
    });
  };

  return (
    <div className="bodyContainer">
      <form className="newProjectForm" onSubmit={saveProjectInformation}>
        <h1 className="createTitle">Create New Project</h1>
        <div className="newForm1">
          {/* title input */}

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl id="titleBox" fullWidth sx={{ m: 1 }}>
              <InputLabel id="titleLabel" htmlFor="outlined-adornment-amount">
                Title
              </InputLabel>
              <OutlinedInput
                type="text"
                required
                value={title}
                onChange={(evt) => setTitle(evt.target.value)}
                label="Title"
              />
            </FormControl>
          </Box>
          {/* end title input */}
          {/* budget input */}

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl id="budgetBox" fullWidth sx={{ m: 1 }}>
              <InputLabel id="budgetLabel" htmlFor="outlined-adornment-amount">
                Budget
              </InputLabel>
              <OutlinedInput
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                type="text"
                required
                value={budget}
                onChange={(evt) => setBudget(evt.target.value)}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
          </Box>
        </div>
        {/* end budget input */}

        <br />
        {/* date input */}
        <div className="newForm2">
          <input
            type="date"
            value={projectDate}
            onChange={(evt) => setProjectDate(evt.target.value)}
            placeholder="Date"
          />
          {/* end date inpu */}
          <br />
          {/* category input dropdown with cat names */}

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
          {/* end drop down with cat names */}
        </div>
        <div className="newForm3">
          <button className="box" type="submit">
            Create Project
          </button>
          <button className="box" type="button" onClick={cancelProject}>
            cancel Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProject;
