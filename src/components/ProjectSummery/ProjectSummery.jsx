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
  const materials = useSelector((store) => store.materialsReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const [description, setDescription] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      <button onClick={galleryPage}>Gallery</button>
      <button onClick={mats}>LOG MATERIALS</button>

      <h3>Notes</h3>
      <textarea
        className="sumTextBox"
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      />
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
                  <button>Delete button</button>
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
