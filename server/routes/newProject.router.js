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
      SELECT project.id, project.user_id, project.category_id,project.date,project.budget,project.title,project.user_notes,"user".username FROM project
      JOIN "user"
      ON project.user_id = "user".id
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
  const user = req.body.user;
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

module.exports = router;
