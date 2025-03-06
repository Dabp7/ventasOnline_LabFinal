import { Schema, model} from "mongoose"

const productsSchema = Schema({
    nameProduct: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    soldUnits: {
        type: Number,
        default: 0
    }
},
{
    versionKey: false,
    timeStamps: true
})


export default model("Products", productsSchema)