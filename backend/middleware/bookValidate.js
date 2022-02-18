import book from "../models/book.js";

const existingBook = async (req, res, next) => {
     //asignarle un rol
const bookId = await book.findOne({ title: "book" });
if (!bookId) return res.status(500).send({ message: "No book was assigned" });

req.body.book = bookId._id;
next();
};

export default {existingBook};