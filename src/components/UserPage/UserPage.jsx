import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProjectList from "../ProjectList";

function AddProject() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // display all projects on DOm upon app load
  useEffect(() => {
    dispatch({
      type: "GET_PROJECT_PHOTOS",
    });
  }, []);

  // const itemToAdd = {
  //     description: description,
  //     image_url: image,
  //     user_id: user.id
  // }

  // const onAddItem = (evt) => {
  //     evt.preventDefault();
  //     console.log('itemToAdd is:', itemToAdd);

  //     dispatch({
  //         type: 'ADD_ITEM',
  //         payload: itemToAdd
  //     });

  // };

  return (
    <>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
      </div>
      <form action="/api/images" encType="multipart/form-data" method="post">
        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            name="uploaded_file"
          />
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            name="description"
          />

          <input
            type="submit"
            value="Add picture!"
            className="btn btn-default"
          />
        </div>
        <ProjectList />
      </form>
      <LogOutButton className="btn" />
    </>
  );
}

export default AddProject;