import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addProject(action) {
  console.log("inside add project");

  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    console.log("what is add project payload???", action.payload);

    yield axios.post("/api/newProject", action.payload, config);

    // yield put({ type: "GET_NEW_PROJECTS" });
  } catch (error) {
    console.log("Add photo failed", error);
  }
}

function* addProjectSaga() {
  yield takeLatest("NEW_PROJECT", addProject);
}

export default addProjectSaga;
