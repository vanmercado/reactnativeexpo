const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const mongoUrl="mongodb+srv://vaaanmercado:admin@cluster0.pyrskuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNzA2ODcxNywiaWF0IjoxNzE3MDY4NzE3fQ.MJxMDu0eyZbsrPGFnHSKgiqj7VCDUU-ETIP8qhoOi3o"

mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected");
}).catch((e)=>{
    console.log(e)
});

require('./User')
const User = mongoose.model("UserInfo");

app.get('/', function(req, res){
    res.send({status: "Started"});
});

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email: email });
  
    if (!oldUser) {
      return res.send({ data: "User doesn't exists!!" });
    }
  
    if (await bcrypt.compare(password, oldUser.password)) {
      const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
      if (res.status(201)) {
        return res.send({
          status: "ok",
          data: token,
          userType: oldUser.userType,
        });
      } else {
        return res.send({ error: "error" });
      }
    }
  });

app.listen(5001,()=>{
    console.log("node js is started")
})