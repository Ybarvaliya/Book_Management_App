const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    name : String,
    author : String,
    pages : Number,
    likes: Number
})

const BookModel = mongoose.model("books", BookSchema)

module.exports = BookModel