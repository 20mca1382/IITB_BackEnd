const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'MYRESTAPI';

const signup =async (req,res)=>{
    //Existing user check
    const {username, email, password, type} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email})
        if(existingUser){
            return res.status(400).json({message: "User Already Exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username,
            type:type
        });

        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY)

        res.status(201).json({user: result, token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const signin =async (req,res)=>{
    const {email, password} = req.body;

    try {
        const existingUser = await userModel.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEY);
        res.status(200).json({user:existingUser, token:token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const alluser =async (req,res)=>{
    try {
        const existingUser = await userModel.find({"type":"user"})
         
        if(existingUser){
            res.status(201).send(existingUser);
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong==="});
    }
}

module.exports = {signup, signin, alluser};