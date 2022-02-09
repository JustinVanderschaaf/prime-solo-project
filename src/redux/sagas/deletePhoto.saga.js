import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* deletePhoto(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
console.log('****%%%deletes action .payload ',action.payload);

    yield axios.delete(`/api/images/${action.payload}`, config);

  } catch (error) {
    console.log("DELETE photo failed", error);
  }
}

function* deletePhotoSaga() {
  yield takeLatest("DELETE_PHOTO", deletePhoto);
}

export default deletePhotoSaga;