const loginRouter = require("express").Router();
const login = require("../controller/login");
const verifyAuth=require("../middleware/verifyAuth")
loginRouter.route("/").post(login)

module.exports = loginRouter;
