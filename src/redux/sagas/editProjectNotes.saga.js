import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* editProject(action) {

  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
console.log('ACTION>EDIT !!!#!#',action.payload);

    yield axios.put(`/api/project/${action.payload.id}`, action.payload);

  } catch (error) {
    console.log("edit material failed", error);
  }
}

function* editProjectNotesSaga() {
  yield takeLatest("SAVE_NOTES", editProject);
}

export default editProjectNotesSaga;