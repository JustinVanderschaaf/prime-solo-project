import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* changeBeforeImg(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

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
