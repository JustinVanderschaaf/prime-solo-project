import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* deleteMaterial(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    console.log("****%%%deletes action .payload ", action.payload);

    yield axios.delete(`/api/materials/${action.payload}`, config);
    yield put({ type: "GET_MATERIALS" });
  } catch (error) {
    console.log("DELETE material failed", error);
  }
}

function* deleteMaterialSaga() {
  yield takeLatest("DELETE_MATERIAL", deleteMaterial);
}

export default deleteMaterialSaga;
