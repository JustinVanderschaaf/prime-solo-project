import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* deleteProject(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    yield axios.delete(`/api/newProject/${action.payload}`, config);
  } catch (error) {
    console.log("DELETE project failed", error);
  }
}

function* deleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT", deleteProject);
}

export default deleteProjectSaga;
