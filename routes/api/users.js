const express = require("express");
const router = express.Router();

// api/users/test
router.get("/test", (req, res) => res.json({ msg: "users Works" }));

module.exports = router;
