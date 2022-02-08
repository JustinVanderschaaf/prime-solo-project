const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET route code here
router.get("/", (req, res) => {
  pool
    .query(
      `
      SELECT * FROM category
      `
    )
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.error("err in get category", err);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
