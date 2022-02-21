import role from "../models/role.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Imcomplete data" });

  let shema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });
  let result = await shema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register role" });

  res.status(200).send({ result });
};

const listRole = async (req, res) => {
  let roles = await role.find();

  if (roles.length === 0)
    return res.status(400).send({ message: "No serch resuls" });

  return res.status(200).send({ roles });
};

//Funcion para desactivasr un rol
const deleteRole = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  //aqui me busca el id y me actualiza el dbStatus
  const roles = await role.findByIdAndUpdate(req.params["_id"], {
    dbStatus: "false",
  });

  return !roles
    ? res.status(400).send({ message: "Error deleting role" })
    : res.status(200).send({ message: "role deleted" });
};

// Funcion para modificar cualquier dato de los roles

const updateRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
  return res.status(400).send({message:"Incomplete data"});

  const editRole = await role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });

  if(!editRole) return res.status(500).send({message:"Role update"});
  return res.status(200).send({message:"Role update"});
};

export default { registerRole, listRole, deleteRole, updateRole };
