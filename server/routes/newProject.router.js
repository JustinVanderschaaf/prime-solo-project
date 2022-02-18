const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  pool
    .query(
      `
      SELECT project.id, project.user_id, project.category_id,project.date,project.budget,project.title,project.user_notes,project.after_img,project.before_img,"user".username FROM project
      JOIN "user"
      ON project.user_id = "user".id
      ORDER BY id DESC
    `
    )
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.error("err in get project", err);
    });
});

// POST route code here
router.post("/", (req, res, next) => {
  console.log("asdklfaldjksfasdfadfs",req.user.id)
  console.log("req.body.useraaaa",req.body.user)
  const user = req.user.id;
  const categoryId = req.body.categoryId;
  const date = req.body.date;
  const budget = req.body.budget;
  const title = req.body.title;

  const queryText = `INSERT INTO "project" (user_id, category_id, date, budget, title)
    VALUES ($1, $2, $3, $4, $5) `;
  pool
    .query(queryText, [user, categoryId, date, budget, title])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("project creation failed: ", err);
      res.sendStatus(500);
    });
});

/**
 * Delete an project if it's something the logged in user added
 */
router.delete("/:id", (req, res) => {
  // endpoint functionality
  console.log(
    "this is req.params delete project",
    req.params.id,
    "and user is",
    req.user
  );

  const queryText = "DELETE FROM project WHERE id=$1";
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing SELECT project query", err);
      res.sendStatus(500);
    });
});

//after img
router.put("/after/:id", (req, res) => {
  const sqlText = `UPDATE project
  SET after_img = $1
  WHERE id = $2
  `;
  pool
    .query(sqlText, [req.body.photo, req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })

    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

router.put("/before/:id", (req, res) => {
  const sqlText = `UPDATE project
  SET before_img = $1
  WHERE id = $2
  `;
  pool
    .query(sqlText, [req.body.photo, req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })

    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

router.put("/title/:id", (req, res) => {
  // Update this single student
  console.log(
    "this is the put router!!!!!",
    req.params.id,
    "and body",
    req.body.newTitle
  );

  const sqlText = `UPDATE project
  SET title = $1
  WHERE id = $2
  `;
  pool
    .query(sqlText, [req.body.newTitle, req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })

    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

// GET route for search category

router.get("/search/:id", (req, res, next) => {
  console.log("EARCH REQ>BODY", req.params.id);

  const sqlText = `
  SELECT project.id, project.user_id, project.category_id,project.date,project.budget,project.title,project.user_notes,project.after_img,project.before_img,"user".username FROM project
  JOIN "user"
  ON project.user_id = "user".id
  WHERE project.category_id = $1
`;

  pool
    .query(sqlText, [req.params.id])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.error("err in get project", err);
    });
});

router.get("/username", (req, res, next) => {
  console.log("SEARCH USERNAME");

  pool
    .query(   `
    SELECT username as label,
    id
    FROM "user"
  `)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.error("err in get project", err);
    });
});

//get route for search username
router.get("/searchUser/:id", (req, res, next) => {
  console.log("EARCH REQ>BODY", req.params.id);

  const sqlText = `
  SELECT project.id, project.user_id, project.category_id,project.date,project.budget,project.title,project.user_notes,project.after_img,project.before_img,"user".username FROM project
  JOIN "user"
  ON project.user_id = "user".id
  WHERE "user".username = $1
`;

  pool
    .query(sqlText, [req.params.id])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.error("err in get project", err);
    });
});

module.exports = router;
