require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const BookModel = require("./models/BookModel.js");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5500
const MONGO_URL = process.env.MONGO_URL
  

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.get("/books", async (req, res) => {
  try {
    const books = await BookModel.find({});
    res.status(200).json(books);
  } catch (error) {
    console.log("Error in fetching: " + error);
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await BookModel.findById({ _id: id });
    res.status(200).json(book);
  } catch (error) {
    console.log("Error in fetching: " + error);
  }
});

app.post("/create", async (req, res) => {
  try {
    const book = await BookModel.create(req.body);
    console.log(book);
  } catch (error) {
    console.log(error);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await BookModel.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages,
        likes: req.body.likes,
      }
    );
    console.log("updated Successfully:" + book);
    res.status(200).json(book);
  } catch (error) {
    console.log("Error in updating Book:" + error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await BookModel.findByIdAndDelete({ _id: id });
    console.log("Deleted Successfully");
  } catch (error) {
    console.log("Error in deleting Book:" + error);
  }
});

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((error) => {
    console.log("Connection failed to DB. ERROR : " + error);
  });

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}.`);
});
