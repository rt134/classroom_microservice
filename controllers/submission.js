const User = require("../models/User");
const Assignment = require("../models/Assignment");
const subscription = require('../models/subscription');
const Submission = require('../models/Submission');

module.exports.submit = async (req,res) => {
    try{
        if(req.user.isTutor){
            return res.status(401).json({
                message : "Unauthorized"
            })
        }
        const assignmentId = req.params.id;
        const studentId = req.user.userId;
        let assignment = await Assignment.findById({_id : assignmentId});

        const { description } = req.body;

        if(!assignment){
            return res.status(404).json({
                message : "Assignment not found"
            });
        }
        let flag = false;
        const student = String(req.user.userId);
        for(let i=0;i<assignment.students.length;i++){
            if(assignment.students[i].studentId == student){
                if(!assignment.students[i].submited){
                    let submission = new Submission({
                        description,
                        assignmentId,
                        studentId
                    });
                    await submission.save();

                    assignment.students[i].submited = true;
                    await assignment.save();
                    flag = true;
                }
            }
            
        }

        if(!flag){
            return res.status(400).json({
                message : "Assignment cannot be submitted"
            })

        }

        return res.status(200).json({
            message : "Assignment submitted successfully"
        })

    }catch(err){
        console.log(err);
        return res.json({
            message : "an error occured"
        })
    }
}

module.exports.getSubmissions = async (req,res) => {
    try{

        if(req.user.isTutor){
            const tutorId = req.user.userId;
            const sub = await subscription.findOne({tutorId});

            let student_data = [];
            for(let i=0;i<sub.students.length;i++){
                
                let x = await Submission.find({studentId : sub.students[i]});
                if(x[0]){
                    student_data.push(x[0]);
                }
            }

            return res.status(200).json({
                "Students Submissions" : student_data
            })
        }else{
            const studentId = req.user.userId;
            const submission_data = await Submission.find({studentId});
            return res.status(200).json({
                "Your Submissions" : submission_data
            })
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "Error occured"
        })
    }
}