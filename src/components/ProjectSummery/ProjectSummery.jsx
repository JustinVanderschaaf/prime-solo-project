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
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const projectSummery = () => {
  //reducers
  const selectedProject = useSelector((store) => store.selectedProject);
  const user = useSelector((store) => store.user);
  const materials = useSelector((store) => store.materialsReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  //table inputs local state to be sent
  let [material, setMaterial] = useState("");
  let [qty, setQty] = useState("");
  let [cost, setCost] = useState("");
  let [onHand, setOnHand] = useState("false");
  let [location, setLocation] = useState("");
  //state placed in an object to be sent
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
    //post request to add new material to the db/selected project table
    dispatch({
      type: "NEW_MATERIAL",
      payload: materialData,
    });
    //set inputs back to empty strings or default
    setMaterial("");
    setQty("");
    setCost("");
    setOnHand("false");
    setLocation("");
  };
  //delete request to delete row.id in selected project
  const removeMaterial = (row) => {
    const materialToRemove = {
      project: selectedProject.id,
      row: row.id,
    };

    dispatch({ type: "DELETE_MATERIAL", payload: materialToRemove });
  };
  //on page load Get materials for display in table
  useEffect(() => {
    dispatch({ type: "GET_MATERIALS", payload: selectedProject.id });
  }, []);

  const rows = [materials];
  //put request to toggle on hand to !onhand and display results in order putting false at top
  const changeOnHand = (row) => {
    const onHandToChange = {
      project: selectedProject.id,
      row: row.id,
    };
    dispatch({ type: "CHANGE_ON_HAND", payload: onHandToChange });
  };

  return (
    <div className="bodyContainer">
      {/* start table */}
      <TableContainer id="table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableHead">Material</TableCell>
              <TableCell className="tableHead" align="right">
                QTY
              </TableCell>
              <TableCell className="tableHead" align="right">
                Cost
              </TableCell>
              <TableCell className="tableHead" align="right">
                On_hand
              </TableCell>
              <TableCell className="tableHead" align="right">
                Location
              </TableCell>
              <TableCell className="tableHead" align="right">
                Delete
              </TableCell>
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
        // conditional if user owns project allow addition to the table via below form
        <form onSubmit={saveMaterialInformation}>
          <div className="matForm">
            <Stack direction="row" spacing={2}>
              <Button
                id="photoSubmitSum"
                type="submit"
                value="Add new Material"
                variant="contained"
              >
                Add new Material
              </Button>
            </Stack>

            <Box
              className="sumInput"
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              <FormControl id="titleBoxSum" fullWidth sx={{ m: 1 }}>
                <InputLabel
                  id="titleLabelSum"
                  htmlFor="outlined-adornment-amount"
                >
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

            <Box
              className="sumInput"
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              <FormControl id="titleBoxSum" fullWidth sx={{ m: 1 }}>
                <InputLabel
                  id="titleLabelSum"
                  htmlFor="outlined-adornment-amount"
                >
                  QTY
                </InputLabel>
                <OutlinedInput
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  type="text"
                  required
                  value={qty}
                  onChange={(evt) => setQty(evt.target.value)}
                  label="QTY"
                />
              </FormControl>
            </Box>
          </div>
          <div className="matFormBot">
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl id="titleBoxSum" fullWidth sx={{ m: 1 }}>
                <InputLabel
                  id="titleLabelSum"
                  htmlFor="outlined-adornment-amount"
                >
                  Cost
                </InputLabel>
                <OutlinedInput
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  type="text"
                  required
                  value={cost}
                  onChange={(evt) => setCost(evt.target.value)}
                  label="cost"
                />
              </FormControl>
            </Box>

            <select
              className="sumInput"
              id="selectSum"
              value={onHand}
              onChange={(evt) => setOnHand(evt.target.value)}
            >
              <option value="false">Not Purchased</option>

              <option value="true">On Hand</option>
            </select>

            <Box
              className="sumInput"
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              <FormControl id="titleBoxSum" fullWidth sx={{ m: 1 }}>
                <InputLabel
                  id="titleLabelSum"
                  htmlFor="outlined-adornment-amount"
                >
                  Location
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
