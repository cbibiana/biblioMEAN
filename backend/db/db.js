//libreria que se encarga de todo de la bd mongodb
import mongoose from "mongoose";

//función para crear la bd
// try catch para manejar errores que conocemos
const dbBiblioMEAN = async () => {
    try {
      await mongoose.connect(process.env.DB_CONNECTION,{
           useNewUrlParser: true,
           useUnifiedTopology: true,
       });
       console.log("Connection with MongoDB: OK");
    } catch (error) {
        console.log("Error Connecting to MongoDB: \n", error);
    }
};

//se exporta la función para que otro archivo lo utilice.
export default {dbBiblioMEAN};