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

//funcion para editar un campo de  cualquiera de un usuario de la base de datos(desactiva al usuario)
const deleteBook = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  //aqui me busca el id y me actualiza el dbStatus
  const books = await book.findByIdAndUpdate(req.params["_id"], {
    dbStatus: "false",
  });

  return !books
    ? res.status(400).send({ message: "Error deleting book" })
    : res.status(200).send({ message: "Book deleted" });
};

//Actualizar un dato del libro
const updateBook = async (req, res) => {
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
    return res.status(400).send({ message: "Incomplete data" });

  //se actualiza los nuevos datos en la bd
  const editBook = await book.findByIdAndUpdate(req.body._id, {
    title: req.body.title,
    publicationDate: req.body.publicationDate,
    author: req.body.author,
    category: req.body.category,
    language: req.body.language,
    pages: req.body.pages,
    description: req.body.description,
    frontPageUrl: req.body.frontPageUrl,
  });

  if (!editBook) return res.status(500).send({ message: "Error editind book" });
  return res.status(200).send({ message: "Book update" });
};

export default { registerBook, listBook, deleteBook, updateBook };
