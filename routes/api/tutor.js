const express = require("express");
const router = express.Router();
const checkauth = require('../../middleware/checkauth');
const assignments = require('../../controllers/assignments');
const submission = require('../../controllers/submission');

router.post('/createassignment',checkauth,assignments.create);
router.post('/updateassignment/:id',checkauth,assignments.update);
router.post('/deleteassignment/:id',checkauth,assignments.delete);
router.get('/getsubmissions',checkauth,submission.getSubmissions);
router.get('/assignmentfeed',checkauth,assignments.getAssignments);

module.exports = router;
