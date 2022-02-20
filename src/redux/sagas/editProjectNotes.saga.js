import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* editProject(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // send the action.payload.id as the params
    // send action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.put(
      `/api/newProject/${action.payload.id}`,
      action.payload,
      config
    );
  } catch (error) {
    console.log("edit material failed", error);
  }
}

function* editProjectNotesSaga() {
  yield takeLatest("SAVE_NOTES", editProject);
}

export default editProjectNotesSaga;
