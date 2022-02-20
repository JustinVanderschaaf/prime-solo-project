const express = require("express");
const router = express.Router();
const multer = require("multer");
// const upload = multer({ dest: 'public/uploads/' })

//using storage over destination so i can customize the storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  //file name contains original name plus a random number to keep it unique
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 15);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});
//limit file size "dont trust user"
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

/**
 * Get all of the images in list where he project id is equal to id
 */
router.get("/:id", (req, res) => {
  const queryText = "SELECT * FROM image WHERE project_id=$1";
  pool
    .query(queryText, [req.params.id])

    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.error("err in get images ", err);
      console.log("req.params.id", req.params);
    });
});

/**
 * Add an image for the logged in user to the list
 */
router.post(
  "/",
  upload.single("selectedFile"),
  rejectUnauthenticated,
  (req, res, next) => {
    console.log("req.body is", req.body);
    console.log("req.file is", req.file);

    const queryText = `
      INSERT INTO "image"(project_id,url,subtitle)
      VALUES ($1,$2,$3);
  `;

    const queryParams = [
      req.body.projectId,
      req.file.filename,
      req.body.description,
    ];

    pool
      .query(queryText, queryParams)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log("Add item failed: ", err);
        res.sendStatus(500);
      });
  }
);

/**
 * Delete an image if it's something the logged in user added
 */
router.delete("/:id", (req, res) => {
  // endpoint functionality
  const queryText = "DELETE FROM image WHERE id=$1";
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing delete images query", err);
      res.sendStatus(500);
    });
});

module.exports = router;
