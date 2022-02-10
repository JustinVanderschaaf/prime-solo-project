import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addMaterial(action) {
  console.log("**********inside add material#############");

  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    yield axios.post("/api/materials", action.payload, config);

  } catch (error) {
    console.log("Add material failed", error);
  }
}

function* addMaterialSaga() {
  yield takeLatest("NEW_MATERIAL", addMaterial);
}

export default addMaterialSaga;