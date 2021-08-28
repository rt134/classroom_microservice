const mongoose = require("mongoose")
const assignmentSchema = new mongoose.Schema({
    description : {
        type: String, 
        required: true
    },
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref  :'user',
        required: true
    },

    students : [{
        _id : false ,
        studentId : {
            type: mongoose.Schema.Types.ObjectId,
            ref  :'user',
        },
        submited : {
            type : Boolean,
            default : false,
        }
    }],

    publishedAt: {
        type: Date, 
        required: true
    },
    deadline : {
        type : Date,
        required : true,
    },
    status : {
        type : String,
        default : false,
    }
},
    {timestamps : true}
)

const Assignment = mongoose.model("assignment", assignmentSchema);

module.exports = Assignment;