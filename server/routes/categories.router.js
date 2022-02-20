const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET route code to get categories for Dropdown
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

module.exports = router;
