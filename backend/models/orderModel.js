import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const {Schema} = mongoose

const orderSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price_unit_count: {
        type: String,
        required: true,
    },
    user:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    advert:
        {
            type: Schema.Types.ObjectId,
            ref: "Advert",
        },
    owner:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
},{timestamps: true});



const Order = mongoose.model("Order",orderSchema)

export default Order