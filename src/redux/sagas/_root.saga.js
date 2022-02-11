import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
//post
import addProjectSaga from "./addProject.saga";
import addSaga from "./addphoto.saga";
import addMaterialSaga from "./addMaterial.saga"
//get
import getCategoriesSaga from "./getCategories.saga";
import getProjectImagesSaga from "./getprojectImages.saga";
import getProjectsSaga from "./getProject.saga";
import getMaterialsSaga from "./getMaterials.saga"
//delete
import deletePhotoSaga from "./deletePhoto.saga"
import deleteProjectSaga from "./deleteProject.saga"
import deleteMaterialSaga from "./deleteMaterial.saga"
//Put
import changeOnHandSaga from "./changeOnHand.saga"

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
    addProjectSaga(),
    addSaga(),
    addMaterialSaga(),
    getProjectImagesSaga(),
    getCategoriesSaga(),
    getProjectsSaga(),
    getMaterialsSaga(),
    deletePhotoSaga(),
    deleteProjectSaga(),
    deleteMaterialSaga(),
    changeOnHandSaga()
  ]);
}
