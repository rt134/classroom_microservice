const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/student", require("./student"));
router.use("/tutor", require("./tutor"));


module.exports = router;
