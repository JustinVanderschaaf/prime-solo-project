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

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
