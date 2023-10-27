import mongoose from "mongoose"

const {Schema} = mongoose

const advertSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    detail_short: {
        type: String,
        required: true
    },
    detail_long: {
        type: String,
        required: true
    },
    price_type: {
        type: String,
        required: true
    },
    price_unit: {
        type: String,
        required: true
    },
    price_unit_count: {
        type: String,
    },
    status: {
        type: String,
        default:"created"
    },
    user : {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps: true})

const Advert = mongoose.model("Advert",advertSchema)

export default Advert