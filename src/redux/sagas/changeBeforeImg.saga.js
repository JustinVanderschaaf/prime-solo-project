import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* changeBeforeImg(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    //send action.payload.selectedProject.id as params
    yield axios.put(
      `/api/newProject/before/${action.payload.selectedProject.id}`,
      action.payload,
      config
    );
    yield put({ type: "GET_PROJECTS" });
  } catch (error) {
    console.log("CHANGE on BEFORE img failed", error);
  }
}

function* changeBeforeImgSaga() {
  yield takeLatest("CHANGE_BEFORE_IMG", changeBeforeImg);
}

export default changeBeforeImgSaga;
