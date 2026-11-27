import { Schema, model} from "mongoose";

const cartSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        unique: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Products",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                validate: Number.isSafeInteger
            }
        }
    ]
},
{
    versionKey: false,
    timeStamps: true
})



export default model("Cart", cartSchema)
