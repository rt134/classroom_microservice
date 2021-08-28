const express = require("express");
const router = express.Router();
const checkauth = require('../../middleware/checkauth');
const submission = require('../../controllers/submission');
const subscription = require('../../controllers/subscription');
const assignments = require('../../controllers/assignments');

router.post('/addtutor/:id',checkauth,subscription.add);
router.post('/submitassignment/:id',checkauth,submission.submit);
router.get('/getsubmissions',checkauth,submission.getSubmissions);
router.get('/assignmentfeed',checkauth,assignments.getAssignments)

module.exports = router;
