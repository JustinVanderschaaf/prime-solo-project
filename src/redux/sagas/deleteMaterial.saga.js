import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* deleteMaterial(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // send the action.payload.row as the params
    // the config includes credentials which
    // allow the server session to recognize the user

    yield axios.delete(`/api/materials/${action.payload.row}`, config);
    yield put({ type: "GET_MATERIALS", payload: action.payload.project });
  } catch (error) {
    console.log("DELETE material failed", error);
  }
}

function* deleteMaterialSaga() {
  yield takeLatest("DELETE_MATERIAL", deleteMaterial);
}

export default deleteMaterialSaga;
