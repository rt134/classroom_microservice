const mongoose = require("mongoose")
const submissionSchema = new mongoose.Schema({
    remark : {
        type: String,
    },
    description : {
        type: String,
        required : true,
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref  :'assignment',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref  :'user',
        required: true
    },
},
    {timestamps : true}
)

const Submission = mongoose.model("submission", submissionSchema);

module.exports = Submission;