import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import getProjectImagesSaga from "./getprojectImages.saga";
import addSaga from "./addphoto.saga";
import getCategoriesSaga from "./getCategories.saga";
import addProjectSaga from "./createProject.saga";
import getProjectsSaga from "./getProject.saga";
import getMaterialsSaga from "./getMaterials.saga"
import deletePhotoSaga from "./deletePhoto.saga"
import deleteProjectSaga from "./deleteProject.saga"

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    getProjectImagesSaga(),
    addSaga(),
    getCategoriesSaga(),
    addProjectSaga(),
    getProjectsSaga(),
    getMaterialsSaga(),
    deletePhotoSaga(),
    deleteProjectSaga(),
  ]);
}
