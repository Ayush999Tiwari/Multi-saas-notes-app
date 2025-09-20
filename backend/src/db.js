const mongoose = require("mongoose");
async function connectDB(){
    try{
        await mongoose.connnect(process.env.MONGO_URL);
        console.log("Succesfully connected");
    }catch(err){
        console.error("connection error", err);
        process.exit(1);
    }
}
module.exports = connectDB;