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
      SELECT * FROM materials
      `
    )
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.error("err in get materials", err);
    });
});

//post routee
router.post("/", (req, res, next) => {
  console.log("MATERIALS RE>BODY IS ", req.body);

  const project_id = req.body.selectedProject;
  const cost = req.body.cost;
  const location = req.body.location;
  const material = req.body.material;
  const onHand = req.body.onHand;
  const qty = req.body.qty;

  const queryText = `INSERT INTO "materials" (project_id, material, qty, cost, on_hand, location)
    VALUES ($1, $2, $3, $4, $5, $6) `;
  pool
    .query(queryText, [project_id, material, qty, cost, onHand, location])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("project creation failed: ", err);
      res.sendStatus(500);
    });
});

//Delete route
router.delete("/:id", (req, res) => {
  // endpoint functionality
  console.log(
    "this is req.params %%%%%delete",
    req.params,
    "and user is",
    req.user
  );

  const queryText = "DELETE FROM materials WHERE id=$1";
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing delete material query", err);
      res.sendStatus(500);
    });
});

module.exports = router;
