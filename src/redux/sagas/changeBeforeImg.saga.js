import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* changeBeforeImg(action) {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      console.log("#####CHANGE_BEFORE_IMG action .payload ", action.payload);
  
      yield axios.put(`/api/images/before/${action.payload.photo}`, action.payload, config);
    //   yield put({ type: "GET_MATERIALS" });
    } catch (error) {
      console.log("CHANGE on BEFORE img failed", error);
    }
  }
  
  function* changeBeforeImgSaga() {
    yield takeLatest("CHANGE_BEFORE_IMG", changeBeforeImg);
  }
  
  export default changeBeforeImgSaga;