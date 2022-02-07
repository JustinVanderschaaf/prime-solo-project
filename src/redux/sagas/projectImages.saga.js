import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "LOGIN" actions
function* getProjectImages(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    let photoList = yield axios.get("/api/images", config);
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
