import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addPhoto(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    yield axios.post("/api/images", action.payload.formData, config);

    yield put({
      type: "GET_PROJECT_PHOTOS",
      payload: action.payload.selectedProject.id,
    });
  } catch (error) {
    console.log("Add photo failed", error);
  }
}

function* addSaga() {
  yield takeLatest("SEND_FILE", addPhoto);
}

export default addSaga;
