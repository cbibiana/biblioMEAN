import mongoose from "mongoose";

const bookShema = new mongoose.Schema({
  title: String,
  publicationDate: Date,
  author: String,
  category: String,
  language: String,
  pages: Number,
  description: String,
  frontPageUrl: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: true,
});

const book = mongoose.model("books", bookShema);
export default book;
