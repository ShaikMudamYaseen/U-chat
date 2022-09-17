const userModel = require("../model/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app.config");
const { connect } = require("getstream");
require("dotenv").config();
const login = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userModel.findOne({ userName: req.body.userName });
    console.log(req.body.id);
    if (user) {
      const matchPass = bcrypt.compareSync(req.body.password, user.password);
      if (matchPass) {
        const token = jwt.sign(
          { id: user._id, username: user.userName },
          process.env.ACCESS_TOKEN_SECRET
        );
        
        const serverClient=connect(process.env.API_KEY,process.env.API_SECRET,process.env.APP_ID)  
        const streamToken=serverClient.createUserToken(user._id.toString())
        console.log(streamToken);
        res.cookie("jwt", token, { httpOnly: true});
        res.cookie("streamToken", streamToken, { httpOnly: true });
          
        res.json({
          message: `login successful ${user.userName}`,
          status: "success",
          user:user,
          token: token,
          streamToken:streamToken
        });
      } else {
        console.log(`password wrong for username ${user.userName}`);
        res.json({
          message: `password wrong for ${user.userName}`,
          status: "failed"

          
        });
      }
    } else {
      console.log(`${req.body.userName} not found please register `);
      res.json({
        message: `${req.body.userName} not found please sign up `,
        status: "failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({message:error,status:"failed"});
  }
};
module.exports = login;
