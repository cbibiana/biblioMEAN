import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.publicationDate ||
    !req.body.author ||
    !req.body.category ||
    !req.body.language ||
    !req.body.pages ||
    !req.body.description ||
    !req.body.frontPageUrl
  )
    return res.status(400).send({ message: "Imcomplete Data" });

  let shema = new book({
    title: req.body.title,
    publicationDate: req.body.publicationDate,
    author: req.body.author,
    category: req.body.category,
    language: req.body.language,
    pages: req.body.pages,
    description: req.body.description,
    frontPageUrl: req.body.frontPageUrl,
    dbStatus: true,
  });

  let result = await shema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register role" });

  res.status(200).send({ result });
};

const listBook = async (req, res) => {
  let books = await book.find();

  if (books.length === 0)
    return res.status(400).send({ message: "No serch result" });

  return res.status(200).send({ books });
};

export default { registerBook, listBook };
