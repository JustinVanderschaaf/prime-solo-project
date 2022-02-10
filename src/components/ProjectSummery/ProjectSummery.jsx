import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProjectListCards from "../ProjectList/ProjectListCards";
import axios from "axios";

//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

const projectSummery = () => {
  const selectedProject = useSelector((store) => store.selectedProject);
  const user = useSelector((store) => store.user);
  const materials = useSelector((store) => store.materialsReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const [description, setDescription] = React.useState("");

  //table inputs
  let [material, setMaterial] = useState("");
  let [qty, setQty] = useState("");
  let [cost, setCost] = useState("");
  let [onHand, setOnHand] = useState("false");
  let [location, setLocation] = useState("");

  const materialData = {
    selectedProject: selectedProject.id,
    material: material,
    qty: qty,
    cost: cost,
    onHand: onHand,
    location: location,
  };
  //end table inputs

  const saveMaterialInformation = (event) => {
    event.preventDefault();
    console.log("Current MATERIAL INPUT", materialData);

    dispatch({
      type: "NEW_MATERIAL",
      payload: materialData,
    });

    setMaterial("");
    setQty("");
    setCost("");
    setOnHand("false");
    setLocation("");
  };

  const removeMaterial = (row) => {
    console.log("delete row id is", row.id);

    dispatch({ type: "DELETE_MATERIAL", payload: row.id });
  };

  const galleryPage = (event) => {
    history.push("/projectGallery");
  };

  useEffect(() => {
    dispatch({ type: "GET_MATERIALS" });
  }, []);

  const rows = [materials];
  const mats = () => {
    console.log("this it the mats", rows);
  };
  return (
    <>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>your project id is: {selectedProject.id}</p>

      <button onClick={galleryPage}>Gallery</button>
      <button onClick={mats}>LOG MATERIALS</button>

      <h3>Notes</h3>
      <textarea
        className="sumTextBox"
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      />

      <form onSubmit={saveMaterialInformation}>
        <button>Submit</button>
        <input
          type="text"
          required
          value={material}
          onChange={(evt) => setMaterial(evt.target.value)}
          placeholder="Material"
        />

        <input
          type="text"
          required
          value={qty}
          onChange={(evt) => setQty(evt.target.value)}
          placeholder="QTY"
        />

        <input
          type="text"
          required
          value={cost}
          onChange={(evt) => setCost(evt.target.value)}
          placeholder="Cost"
        />

        <select
          id="select"
          value={onHand}
          onChange={(evt) => setOnHand(evt.target.value)}
        >
          <option value="false">Not Purchased</option>

          <option value="true">On Hand</option>
        </select>

        <input
          type="text"
          value={location}
          onChange={(evt) => setLocation(evt.target.value)}
          placeholder="Location"
        />
      </form>

      {/* start table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Edit</TableCell>
              <TableCell>Material</TableCell>
              <TableCell align="right">QTY</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">On_hand</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  <button>Edit button</button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.material}
                </TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.cost}</TableCell>
                <TableCell align="right">{row.on_hand.toString()}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">
                  <button onClick={() => removeMaterial(row)}>Remove</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* end table */}
    </>
  );
};
export default projectSummery;
