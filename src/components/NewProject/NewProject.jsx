import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NewProject = () => {
    const dispatch = useDispatch();
  const [budget, setBudget] = useState("");
  const [title, setTitle] = useState("");
  //Save budget/title data to object on submit/dispatch
  const projectData = {
    budget: budget,
    title: title,
  };
  const saveProjectInformation = (event) => {
    event.preventDefault();
    console.log('Current project', projectData );

    dispatch({
      type: "NEW_PROJECT",
      payload: budget,
    });

    setBudget("");
  };

  return (
    <>
      <h1>Hello</h1>
      <form onSubmit={saveProjectInformation}>
        {/* title input */}
        <input
          type="text"
          required
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          placeholder="Title"
        />
        {/* end title input */}
        {/* budget input */}
        <input
          //limit the client to only numbers between 0 and 9 and only one character long
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          type="text"
          required
          value={budget}
          onChange={(evt) => setBudget(evt.target.value)}
          placeholder="Budget"
        />
        {/* end budget input */}
        <br />
        {/* date input */}
        <input type="date" placeholder="Date"></input>
        {/* end date inpu */}
        <br />
        {/* category input */}
        <input type="dropdown" placeholder="Catagory" />
        {/* end category input */}
        <button className="newProjectBtn" type="submit">
          Create Project
        </button>
      </form>
    </>
  );
};

export default NewProject;
