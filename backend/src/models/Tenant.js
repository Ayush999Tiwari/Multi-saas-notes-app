import mongoose from "mongoose"
const tenantSchema = new mongoose.Schema({
    name : String,
    slug : String,
    plan : {
        type : String,
        enum : ["Free" , "Pro"], 
        default : "Free"
    }
});
export default mongoose.model("tenant", tenantSchema);
