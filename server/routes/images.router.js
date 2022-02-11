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
 * Get all of the images in list
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

/**
 * Update an image if it's something the logged in user added
 */ //after Img
// router.put("/after/:id", (req, res) => {
//   // Update this single student
//   console.log(
//     "this is the put router!!!!!",
//     req.params.id,
//     "and body",
//     req.body.selectedProject.id
//   );

//   const sqlText = `UPDATE image
//   SET after_img = false
//   WHERE project_Id = $1
//   `;
//   const secondSqlText = `UPDATE image
//   SET after_img = true
//   WHERE id = $2
//   `;

//   pool
//     .query(sqlText, [req.body.selectedProject.id, req.params.id])
//     .then((firstQueryRes) => {
//       return pool.query(secondSqlText);
//     })
//     .then((secondQueryRes) => {
//       res.sendStatus(204);
//     })

//     .catch((error) => {
//       console.log(`Error making database query ${sqlText}`, error);
//       res.sendStatus(500);
//     });
// });

// //Before img
// router.put("/before/:id", (req, res) => {
//   // Update this single student
//   console.log(
//     "this is the put router!!!!!",
//     req.params.id,
//     "and body",
//     req.body.selectedProject.id
//   );

//   const sqlText = `UPDATE image
//   SET before_img = false
//   WHERE project_Id = $1
//   `;
//   const secondSqlText = `UPDATE image
//   SET before_img = true
//   WHERE id = $1
//   `;

//   pool
//     .query(sqlText, [req.body.selectedProject.id ])
//     .then((firstQueryRes) => {
//       return pool.query(secondSqlText, [req.params.id]);
//     })
//     .then((secondQueryRes) => {
//       res.sendStatus(204);
//     })
//     .catch((error) => {
//       console.log(`Error making database query ${sqlText}`, error);
//       res.sendStatus(500);
//     });
// });

/**
 * Return all users along with the total number of images
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific image by id
 */
router.get("/:id", (req, res) => {
  // endpoint functionality
});

module.exports = router;
