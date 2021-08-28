const mongoose = require("mongoose")
const subscriptionSchema = new mongoose.Schema({
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref  :'user',
        required: true,
        unique : true,
    },

    students : [{
        type: mongoose.Schema.Types.ObjectId,
        ref  :'user',
        unique : true,
    }],

    
})

const Subscription = mongoose.model("subscription", subscriptionSchema);

module.exports = Subscription;