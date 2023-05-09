const express = require('express'); //Importing express library
const userRouter = require('../routes/userRoute');
const booksRoute = require('../routes/booksRoute');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();

const mongoose = require("mongoose");

const app = express(); 
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/books", booksRoute);

app.get('/', (req,res)=>{
    res.send("Library Management System From Rachit Agrawal")
})

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("App listening on port number " + PORT);
    });
})
.catch((error)=>{
    console.log(error);
})


