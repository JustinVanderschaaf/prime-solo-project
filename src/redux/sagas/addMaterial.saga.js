import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addMaterial(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.post("/api/materials", action.payload, config);
    yield put({
      type: "GET_MATERIALS",
      payload: action.payload.selectedProject,
    });
  } catch (error) {
    console.log("Add material failed", error);
  }
}

function* addMaterialSaga() {
  yield takeLatest("NEW_MATERIAL", addMaterial);
}

export default addMaterialSaga;
