const user=require('../model/user');
const message=require('../model/message');
// store the message and name into database 
exports.sendMessage=(req,res,next)=>{
    req.user.createMessage({messageText:req.body.chatMessage,name:req.user.name})
    .then(result=>{
        res.status(200).json({message:"message store",user:req.user})
    })
    .catch(err=>{
       // console.log(err);
        res.status(404).json({message:"failed"})
    })
}
// referesh the page it always show all message and name
exports.getAllMessage=(req,res,next)=>{
message.findAll({attributes:['messageText','name']}).then(result=>{
    res.status(200).json({message:"successfully",result})
})
.catch(err=>{
    res.status(400).json({message:"something went wrong"})
})
}