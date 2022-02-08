import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getCategories(action) {
  try {
    let categoriesList = yield axios.get("/api/categories");
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
