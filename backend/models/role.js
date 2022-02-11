import mongoose from "mongoose";

const rolShema = new mongoose.Schema({
    name: String;
    description: String,
    registerDate: { type: Date, default: Date.now},
    dbStatus: true,
});

const role = mongoose.model("roles" , rolShema);
export default role;