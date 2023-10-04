const mongoose = require('mongoose')
const productSchema = mongoose.schema(
    {
        name:{
            type:String,
            required:[true,"please enter product name"]
        },
        quantity:{
            type: Number,
            required: [true,"please enter the quantity"],
            default: 0
        },
        price:{
            type:Number,
            required:true
        },
        image:{
            type: String,
            required:false
        }

    },
    {
        timestamps: true
    }
)

const product = mongoose.model("Product",productSchema);
module.exports = product