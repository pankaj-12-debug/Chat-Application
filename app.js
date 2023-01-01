const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const app=express();

//router
const SignupRouter=require('./router/signup');
const ChatRouter=require('./router/chat');

//model
const User=require('./model/user');
const Message=require('./model/message');
app.use(bodyParser.json());
app.use(cors());
app.use(SignupRouter);
app.use(ChatRouter);

//association
User.hasMany(Message);
Message.belongsTo(User);

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
