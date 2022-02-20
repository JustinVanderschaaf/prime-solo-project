import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* changeTitle(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

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
