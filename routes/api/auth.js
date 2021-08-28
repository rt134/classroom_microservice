const express = require("express");
const router = express.Router();
const Authentication = require('../../controllers/auth');


router.post('/student', Authentication.registerstudent);
router.post('/tutor', Authentication.registertutor);
router.post('/login', Authentication.login);
router.get('/logout', Authentication.logout);

module.exports = router;
