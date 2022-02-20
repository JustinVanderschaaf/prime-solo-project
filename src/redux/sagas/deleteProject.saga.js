import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* deleteProject(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // send the action.payload as the params
    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.delete(`/api/newProject/${action.payload}`, config);
  } catch (error) {
    console.log("DELETE project failed", error);
  }
}

function* deleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT", deleteProject);
}

export default deleteProjectSaga;
