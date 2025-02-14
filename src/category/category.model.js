import { Schema, model} from "mongoose";

const categorySchema = Schema({
    nameCategory:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: true
    },
},
{
    versionKey: false,
    timeStamps: true
})



export default model("Category", categorySchema)