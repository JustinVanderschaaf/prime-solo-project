import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getCategories(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    let categoriesList = yield axios.get("/api/categories", config);
    yield put({
      type: "SET_CATEGORIES",
      payload: categoriesList.data,
    });
  } catch (error) {
    console.log("Error with user login:", error);
  }
}

function* getCategoriesSaga() {
  yield takeLatest("FETCH_CATEGORIES", getCategories);
}

export default getCategoriesSaga;
