import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* deletePhoto(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    yield axios.delete(`/api/images/${action.payload.photo}`, config);
    console.log("!@!@!@!@!@@", action.payload.selectedProject.id);

    yield put({
      type: "GET_PROJECT_PHOTOS",
      payload: action.payload.selectedProject.id,
    });
  } catch (error) {
    console.log("DELETE photo failed", error);
  }
}

function* deletePhotoSaga() {
  yield takeLatest("DELETE_PHOTO", deletePhoto);
}

export default deletePhotoSaga;
