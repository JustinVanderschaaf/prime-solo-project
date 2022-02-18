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
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const projectSummery = () => {
  const selectedProject = useSelector((store) => store.selectedProject);
  const user = useSelector((store) => store.user);
  const materials = useSelector((store) => store.materialsReducer);
  const history = useHistory();
  const dispatch = useDispatch();

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
    const materialToRemove = {
      project: selectedProject.id,
      row: row.id,
    };

    dispatch({ type: "DELETE_MATERIAL", payload: materialToRemove });
  };

  useEffect(() => {
    dispatch({ type: "GET_MATERIALS", payload: selectedProject.id });
  }, []);

  const rows = [materials];
  const mats = () => {
    console.log("this it the mats", rows);
  };

  const changeOnHand = (row) => {
    console.log("Change row id is", row.id);
    const onHandToChange = {
      project: selectedProject.id,
      row: row.id,
    };
    dispatch({ type: "CHANGE_ON_HAND", payload: onHandToChange });
  };

  return (
    <div className="bodyContainer">
     

      {/* start table */}
      <TableContainer  id="table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow  >
              <TableCell className="tableHead">Material</TableCell>
              <TableCell className="tableHead" align="right">QTY</TableCell>
              <TableCell className="tableHead" align="right">Cost</TableCell>
              <TableCell className="tableHead" align="right">On_hand</TableCell>
              <TableCell className="tableHead" align="right">Location</TableCell>
              <TableCell className="tableHead" align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((row) => (
              <TableRow
              id="tableRow"
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.material}
                </TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.cost}</TableCell>
                {/* on hand view for user */}
                {user.id === selectedProject.user_id && (
                  <TableCell align="right" onClick={() => changeOnHand(row)}>
                    <button>{row.on_hand.toString()}</button>
                  </TableCell>
                )}
                {user.id !== selectedProject.user_id && (
                  <TableCell align="right">{row.on_hand.toString()}</TableCell>
                )}

                <TableCell align="right">{row.location}</TableCell>
                {/* delete view for user */}
                {user.id === selectedProject.user_id && (
                  <TableCell align="right">
                    <button onClick={() => removeMaterial(row)}>Remove</button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* end table */}
      
      {user.id === selectedProject.user_id && (
        <form  onSubmit={saveMaterialInformation}>
          <div className="matForm">
          <button>Submit</button>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl id="titleBoxSum" fullWidth sx={{ m: 1 }}>
              <InputLabel id="titleLabelSum" htmlFor="outlined-adornment-amount">
              Material
              </InputLabel>
              <OutlinedInput
                type="text"
                required
                value={material}
                onChange={(evt) => setMaterial(evt.target.value)}
                label="Material"
              />
            </FormControl>
          </Box>



          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl id="titleBoxSum" fullWidth sx={{ m: 1 }}>
              <InputLabel id="titleLabelSum" htmlFor="outlined-adornment-amount">
              QTY
              </InputLabel>
              <OutlinedInput
                type="text"
                required
                value={qty}
                onChange={(evt) => setQty(evt.target.value)}
                label="QTY"
              />
            </FormControl>
          </Box>
          </div>
          <div className="matForm">
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl id="titleBoxSum" fullWidth sx={{ m: 1 }}>
              <InputLabel id="titleLabelSum" htmlFor="outlined-adornment-amount">
              QTY
              </InputLabel>
              <OutlinedInput
                type="text"
                required
                value={cost}
                onChange={(evt) => setCost(evt.target.value)}
                label="cost"
              />
            </FormControl>
          </Box>
         
          <select
            id="selectSum"
            value={onHand}
            onChange={(evt) => setOnHand(evt.target.value)}
          >
            <option value="false">Not Purchased</option>

            <option value="true">On Hand</option>
          </select>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl id="titleBoxSum" fullWidth sx={{ m: 1 }}>
              <InputLabel id="titleLabelSum" htmlFor="outlined-adornment-amount">
              QTY
              </InputLabel>
              <OutlinedInput
                type="text"
                required
                value={location}
                onChange={(evt) => setLocation(evt.target.value)}
                label="location"
              />
            </FormControl>
          </Box>

          </div>
        </form>
      )}
    </div>
  );
};
export default projectSummery;
