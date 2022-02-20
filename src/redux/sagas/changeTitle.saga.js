import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* changeTitle(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    //send action.payload.project as params
    yield axios.put(
      `/api/newProject/title/${action.payload.project}`,
      action.payload,
      config
    );
    yield put({ type: "GET_PROJECTS" });
  } catch (error) {
    console.log("CHANGE TITLE failed", error);
  }
}

function* changeTitleSaga() {
  yield takeLatest("CHANGE_TITLE", changeTitle);
}

export default changeTitleSaga;
