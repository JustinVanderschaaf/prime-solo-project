import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NewProject = () => {
    const [budget, setBudget] = useState("");
//Save budget data to object on submit/dispatch 
    const saveProjectInformation = (event) => {
        event.preventDefault();
    
        dispatch({
          type: "NEW_BUDGET",
          payload: budget,
        });
    
        setBudget("");
    };
  
  return (
    <>
      <h1>Hello</h1>
      <form onSubmit={saveProjectInformation}>
      <input
          //limit the client to only numbers between 1 and 5 and only one character long
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
          <br />
          <input type="date" placeholder="Date"></input>
          <br />
          <input type="dropdown" placeholder="Catagory"/>
      </form>
    </>
  );
};

export default NewProject;
