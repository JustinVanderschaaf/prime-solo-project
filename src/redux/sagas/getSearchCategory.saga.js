import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getSearchCategory(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    let projectList = yield axios.get(
      `/api/newProject/search/${action.payload}`,
      config
    );

    yield put({
      type: "SET_PROJECTS",
      payload: projectList.data,
    });
  } catch (error) {
    console.log("Error with user login:", error);
  }
}

function* getSearchCategorySaga() {
  yield takeLatest("SEARCH_CATEGORY", getSearchCategory);
}

export default getSearchCategorySaga;
