import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addProject(action) {
  console.log("inside add project");

  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    yield axios.post("/api/newProject", action.payload, config);
    console.log("action.payload new project", action.payload);
    yield put({
      type: "GET_PROJECT",
    });
  } catch (error) {
    console.log("Add photo failed", error);
  }
}

function* addProjectSaga() {
  yield takeLatest("NEW_PROJECT", addProject);
}

export default addProjectSaga;
