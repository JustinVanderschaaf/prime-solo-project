import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getProjects(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    let projectList = yield axios.get("/api/newProject", config);

    yield put({
      type: "SET_PROJECTS",
      payload: projectList.data,
    });
  } catch (error) {
    console.log("Error with user login:", error);
  }
}

function* getProjectsSaga() {
  yield takeLatest("GET_PROJECTS", getProjects);
}

export default getProjectsSaga;
