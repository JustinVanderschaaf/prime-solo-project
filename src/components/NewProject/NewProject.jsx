import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NewProject = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.projectCategoriesReducer);
  const user = useSelector((store) => store.user);
  let [budget, setBudget] = useState("");
  let [title, setTitle] = useState("");
  let [categoryId, setCategoryId] = useState(0);
  let [projectDate, setProjectDate] = useState("");


  useEffect(() => {
    dispatch({type:"FETCH_CATEGORIES"});
  }, []);
  //Save budget/title/categoryId/userId data to object on submit/dispatch
  const projectData = {
    budget: budget,
    title: title,
    categoryId: categoryId,
    user: user.id,
    date: projectDate
  };
  const saveProjectInformation = (event) => {
    event.preventDefault();
    console.log("Current project", projectData);

    dispatch({
      type: "NEW_PROJECT",
      payload: projectData,
    });

    setBudget("");
    setTitle("")
    setCategoryId(0)
    
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
        
        <button className="newProjectBtn" type="submit">
          Create Project
        </button>
      </form>
    </>
  );
};

export default NewProject;
