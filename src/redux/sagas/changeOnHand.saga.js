import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* changeOnHand(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // send the action.payload.row as the params
    // the config includes credentials which
    // allow the server session to recognize the user

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
