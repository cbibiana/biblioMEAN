//Librerias para crear el servidor
import express from "express";
import cors from "cors";
import db from "./db/db.js";
import routeRole from "../backend/routes/routeRole.js";
import routeUser from "../backend/routes/routeUser.js";
import routeBook from "../backend/routes/routeBook.js";
import dotenv from "dotenv";
// habilitar el dotenv para que cualquier otro archivo lo pueda utilizar
dotenv.config();

//app es mi servidor y puede utilizar todo de la libreria express
//app.use(express.json()) y app.use(cors()); reglas al servidor
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/role", routeRole);
app.use("/api/user", routeUser);
app.use("/api/book", routeBook);
app.listen(process.env.PORT, () =>
console.log("Backend server running on port: ", process.env.PORT)
);

// Trae el modulo db y trae la funcion db BibliMean
db.dbBiblioMEAN();
