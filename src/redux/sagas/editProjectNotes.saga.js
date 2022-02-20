import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* editProject(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    yield axios.put(`/api/newProject/${action.payload.id}`, action.payload);
  } catch (error) {
    console.log("edit material failed", error);
  }
}

function* editProjectNotesSaga() {
  yield takeLatest("SAVE_NOTES", editProject);
}

export default editProjectNotesSaga;
