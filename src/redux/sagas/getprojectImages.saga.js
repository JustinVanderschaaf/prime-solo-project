import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "LOGIN" actions
function* getProjectImages(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    let photoList = yield axios.get(`/api/images/${action.payload}`, config);
    yield put({
      type: "SET_PROJECT_IMAGES",
      payload: photoList.data,
    });
  } catch (error) {
    console.log("Error with user login:", error);
  }
}

function* getProjectPhotosSaga() {
  yield takeLatest("GET_PROJECT_PHOTOS", getProjectImages);
}

export default getProjectPhotosSaga;
