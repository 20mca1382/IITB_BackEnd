const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        default: 'Available'
    }
}, {timestamps : true});

module.exports = mongoose.model("Books", booksSchema);