const Sequelize=require('sequelize');
const sequelize=new Sequelize('chat','root','Meena@123',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;