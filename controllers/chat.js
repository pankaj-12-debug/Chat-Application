const user=require('../model/user');
const message=require('../model/message');
exports.sendMessage=(req,res,next)=>{
    req.user.createMessage({messageText:req.body.chatMessage})
    .then(result=>{
        res.status(200).json({message:"message store",user:req.user})
    })
    .catch(err=>{
       // console.log(err);
        res.status(404).json({message:"failed"})
    })
}