import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getMaterials(action) {
  try {
    let materials = yield axios.get("/api/materials");
    yield put({
      type: "SET_MATERIALS",
      payload: materials.data,
    });
  } catch (error) {
    console.log("Error with get materials:", error);
  }
}

function* getMaterialsSaga() {
  yield takeLatest("GET_MATERIALS", getMaterials);
}

export default getMaterialsSaga;
