import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* deletePhoto(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // send the action.payload.photo as the params
    // the config includes credentials which
    // allow the server session to recognize the user

    yield axios.delete(`/api/images/${action.payload.photo}`, config);

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
