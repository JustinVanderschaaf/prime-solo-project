import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getUsername(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    let usernameList = yield axios.get(`/api/newProject/username`, config);

    yield put({
      type: "SET_USERNAMES",
      payload: usernameList.data,
    });
  } catch (error) {
    console.log("Error with user login:", error);
  }
}

function* getUsernameSaga() {
  yield takeLatest("FETCH_USERNAMES", getUsername);
}

export default getUsernameSaga;
