const user=require('../model/user');
const message=require('../model/message');
const Group=require('../model/group')
const {Op}=require('sequelize');
// store the message and name into database 
exports.sendMessage=(req,res,next)=>{
 //   req.user.createMessage({messageText:req.body.chatMessage,name:req.user.name})
    Group.findOne({where:{ name:req.body.groupName}})
    .then(response=>{
      return  req.user.createMessage({messageText:req.body.chatMessage,name:req.user.name,GroupId:response.id})
     //return Group.findOne({where:{ name:req.body.groupName}})
    })
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
//message.findAll({attributes:['messageText','name']})
let lastMessageId = req.query.lastMessageId;
let groupName=req.query.groupName;
Group.findOne({where:{name:groupName}}).then(data=>{
    console.log('lastMessageId',lastMessageId);
    // where id>lastMessageId 
   return message.findAll({ where:{id: {[Op.gt]:lastMessageId},  GroupId:data.id}})
})
//message.findAll({ where:{id: {[Op.gt]:lastMessageId}}})
.then(result=>{
    res.status(200).json({message:"successfully",result})
})
.catch(err=>{
    res.status(400).json({message:"something went wrong"})
})
}

exports.getAllUser=(req,res,next)=>{
    user.findAll().then(result=>{
        res.status(200).json({message:"done",result})
    }).catch(err=>{
        res.status(400).json({message:"Something went wrong"})
    })
 }