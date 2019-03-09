const express = require("express");
const router = express.Router();

// api/profile/test
router.get("/test", (req, res) => res.json({ msg: "profile Works" }));

module.exports = router;
