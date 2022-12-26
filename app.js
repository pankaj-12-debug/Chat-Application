const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const app=express();

//router
const SignupRouter=require('./router/signup');

//model
const User=require('./model/user');
app.use(bodyParser.json());
app.use(cors());
app.use(SignupRouter);

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
