const express = require('express');
const auth = require('../middlewares/auth');
const SECRET_KEY = "MYRESTAPI";
const { createBook, updateBook, deleteBook, getBook, allBooks, getBk } = require('../controllers/booksController');
const booksRoute = express.Router();

booksRoute.get("/getBook", auth, getBook);

booksRoute.post("/createBook", auth, createBook);

booksRoute.delete("/deleteBook/:id", auth, deleteBook);

booksRoute.put("/updateBook/:id", auth, updateBook);

booksRoute.get("/allBooks", allBooks)

booksRoute.post("/getBk", auth, getBk )

module.exports = booksRoute;