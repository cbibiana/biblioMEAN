import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send({ message: "incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await userSchema.save();

  if (!result) res.status(500).send({ message: "failed to register user" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

//en esta funcion el Admin puede ver todo lo que esta en la bd incluyendo si esta activo e innactivo
const listUserAdmin = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();

  if (users.length === 0)
    return res.status(400).send({ message: "No serch results" });

  return res.status(200).send({ users });
};

const listUser = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .populate("role")
    .exec();

  if (users.length === 0)
    return res.status(400).send({ message: "No serch results" });

  return res.status(200).send({ users });
};

//Para crear el login
const login = async (req, res) => {
  // validar si se encuentra
  const userLogin = await user.findOne({ email: req.body.email });

  //si no encuentra nada
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  //si no esta en la bd, cuando la bd es true
  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "User no Found" });

  //el usuario ingresa el password y nosotros lo encriptamos entonces toca hacer algo para que lo acepte
  const passHash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!passHash)
    return res.status(400).send({ message: "Wrond email or password" });

  //enviar el json webtoken
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          //codigo iat
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Login error" });
  }
};

//funcion para editar un campo de  cualquiera de un usuario de la base de datos(desactiva al usuario)
const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  //aqui me busca el id y me actualiza el dbStatus
  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: "false",
  });

  return !users
    ? res.status(400).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted" });
};

//actualizar editando cualquier campo del usuario pero queda activo

const updateUserAdmn = async (req, res) => {
  if(!req.body._id || !req.body.name || !req.body.role || !req.body.email)
  return res.status(400).send({message:"Incompleta date"});

//variable passw para guardar el pasword nuevo o el que me trajo el findUser
let passw = "";

if (!req.body.password) {
  const findUser = await user.findOne({ email:req.body.email});
  passw = findUser.password;
} else {
 passw = await bcrypt.hash(req.body.password,10); 
}

//se actualiza los nuevos datos en la BD
const editUser = await user.findByIdAndUpdate (req.body._id, {
  name: req.body.name,
  password: passw,
  role: req.body.role,
});

if(!editUser) return res.status(500).send({message:"Error editing user"});
return res.status(200).send({message:"User update"});








};


export default { registerUser, listUser, listUserAdmin, login, deleteUser, updateUserAdmn };
