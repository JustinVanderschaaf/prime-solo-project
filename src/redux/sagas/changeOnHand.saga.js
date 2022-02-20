import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* changeOnHand(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    yield axios.put(`/api/materials/${action.payload.row}`, config);
    yield put({ type: "GET_MATERIALS", payload: action.payload.project });
  } catch (error) {
    console.log("CHANGE on hand material failed", error);
  }
}

function* changeOnHandSaga() {
  yield takeLatest("CHANGE_ON_HAND", changeOnHand);
}

export default changeOnHandSaga;
