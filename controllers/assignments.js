const User = require("../models/User");
const Assignment = require("../models/Assignment");
const subscription = require('../models/subscription');

module.exports.create = async (req,res) => {
    try{
        if(!req.user.isTutor){
            return res.status(401).json({
                message : "Unauthorized"
            })
        }

        const { description, publishedAt, deadline } = req.body;
        const tutorId = req.user.userId;

        const sub = await subscription.findOne({tutorId});

        let d1 = new Date() ;
        let d2 = new Date(publishedAt);
        let d3 = new Date(deadline);
        let status = "SCHEDULED";
        if(d1.getTime()>=d2.getTime()){
            status = "ONGOING";
        }

        let assignment = new Assignment({
            description,
            publishedAt : d2,
            deadline : d3,
            status,
            tutorId,
        })

        for(let i=0;i<sub.students.length;i++){
            
            let x = {
                "studentId" : sub.students[i],
                "submited" : false,
            }
            assignment.students.push(x);

        }

        await assignment.save()
        
        return res.status(200).json({
            message : "Assignment created Successfully"
        })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "an error occured"
        })
    }
}

module.exports.getAssignments = async (req,res) => {
    try{
        if(!req.user.isTutor){

            const userId = req.user.userId;
            const {publishedAt, status} = req.body;

            const all_assignments = await Assignment.find({});

            let assignments = []
            for(let i=0;i<all_assignments.length;i++){
                if(all_assignments[i].status == publishedAt){
                    for(let j=0;j<all_assignments[i].students.length;j++){
                        if(all_assignments[i].students[j].studentId == userId)
                        {
                            if(status == "ALL"){
                                assignments.push(all_assignments[i]);
                            }else if(status == "PENDING"){
                                if(!all_assignments[i].students[j].submited){
                                    assignments.push(all_assignments[i]);
                                }
                            }else if(status == "SUBMITED"){
                                if(all_assignments[i].students[j].submited){
                                    assignments.push(all_assignments[i]);
                                }
                            }else if(status == "OVERDUE"){
                                let d = new Date();
                                let d1 = all_assignments[i].deadline;
        
                                if(!all_assignments[i].students[j].submited && d1 < d){
                                    assignments.push(all_assignments[i]);
                                }
                            }
                        }
                    }
                }
            }

            return res.status(200).json({
                assignments
            })

        }else{

            const {publishedAt} = req.body;
            const tutorId = req.user.userId;
            const assignment = await Assignment.find({tutorId});
            
            if(!assignment){
                return res.status(200).json({
                    message : "No assignment created"
                })
            }
            let arr = [];
            for(let i=0;i<assignment.length;i++){
                if(assignment[i].status == publishedAt){
                    arr.push(assignment[i]);
                }
            }

            return res.status(200).json({
                "Assignments" : arr
            })
            
        }
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "an error occured"
        })
    }
}

module.exports.update = async (req,res) => {
    try{
        if(!req.user.isTutor){
            return res.status(401).json({
                message : "Unauthorized"
            })
        }

        const { description, publishedAt, deadline } = req.body;
        let assignId = req.params.id;

        if(!description || !assignId || !publishedAt || !deadline){
            return res.status(401).json({
                message : "Incomplete data"
            })
        }

        let d1 = new Date() ;
        let d2 = new Date(publishedAt);
        let d3 = new Date(deadline);
        let status = "SCHEDULED";
        if(d1.getTime()>=d2.getTime()){
            status = "ONGOING";
        }

        await Assignment.findByIdAndUpdate({_id : assignId},
        {
            description,
            publishedAt:d2,
            deadline:d3,
            status
        });        
        
        return res.status(200).json({
            message : "Assignment Update Successfully"
        })
        
    }catch(err){
        console.log(err);
        return res.json({
            message : "an error occured"
        })
    }
}

module.exports.delete = async (req,res) => {
    try{
        if(!req.user.isTutor){
            return res.status(401).json({
                message : "Unauthorized"
            })
        }

        let assignId = req.params.id;

        await Assignment.findOneAndDelete({_id : assignId});
        
        return res.status(200).json({
            message : "Assignment Update Successfully"
        })
        
    }catch(err){
        console.log(err);
        return res.json({
            message : "an error occured"
        })
    }
}