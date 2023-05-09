const express = require('express');
const { signup, signin, alluser } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.get("/alluser",alluser);

module.exports = userRouter;