import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addMaterial(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

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
