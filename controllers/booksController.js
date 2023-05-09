const booksModel = require('../models/booksModel');
const SECRET_KEY = "MYRESTAPI";

const createBook =async (req,res)=>{
     const {title, description} = req.body;

     const newBook = new booksModel({
        title: title,
        description: description,
        userId: req.userId
     });

     try{
        await newBook.save();
        res.status(201).json(newBook);
     }
     catch (error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
     }
}

const updateBook =async (req,res)=>{
    const id = req.params.id;
    const {title, description} = req.body;

    const newBook = {
        title: title,
        description: description,
        userId: req.userId
    }

    try {
        await booksModel.findByIdAndUpdate(id, newBook, {new:true});
        res.status(200).json(newBook)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const deleteBook =async (req,res)=>{
    const id = req.params.id;
    try {
        const book = await booksModel.findByIdAndRemove(id);
        res.status(202).json(book)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server issue"})
    }
}

const getBook =async (req,res)=>{
    try {
        const books = await booksModel.find({userId: req.userId});
        res.status(200).json(books);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const allBooks =async (req,res)=>{
    try {
        const existingBooks = await booksModel.find();
         
        if(existingBooks){
            res.status(201).send(existingBooks);
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const getBk = async (req,res)=>{
    try {
        
        const books = await booksModel.findById({id: req.id});
        console.log(req.id);
        res.status(200).send(books);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {
    createBook, updateBook, deleteBook, getBook, allBooks, getBk
}