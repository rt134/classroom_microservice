const User = require("../models/User");
const subscription = require("../models/subscription");

module.exports.add = async (req,res) => {
    try{

        if(req.user.isTutor){
            return res.status(401).json({
                message : "Unauthorized"
            })
        }

        const userId =  req.user.userId;

        let tutorId = req.params.id;
        let sub = await subscription.findOneAndUpdate({tutorId},{
            $push : {
                students : userId,
            }
        });
        
        if(!sub){
            sub = new subscription({
                tutorId : tutorId,
                students : [userId],
                
            })
            await sub.save();
        }
        
        
        return res.status(200).json({
            message : "Subscribed Successfully"
        })
        
    }catch(err){
        console.log(err);
        return res.json({
            message : "an error occured"
        })
    }
}