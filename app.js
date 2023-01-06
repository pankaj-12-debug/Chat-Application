const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const app=express();

//router
const SignupRouter=require('./router/signup');
const ChatRouter=require('./router/chat');
const GroupRouter=require('./router/group');

//model
const User=require('./model/user');
const Message=require('./model/message');
const Group=require('./model/group');
const User_group=require('./model/user_group');

app.use(bodyParser.json());
app.use(cors());
app.use(SignupRouter);
app.use(ChatRouter);
app.use(GroupRouter);

//association
User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group,{through:User_group});
Group.belongsToMany(User,{through:User_group});

Group.hasMany(Message);
Message.belongsTo(Group);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000, () => {
      console.log(" listening to 3000 port ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
