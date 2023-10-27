import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const {Schema} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },password: {
        type: String,
        required: true,
    },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Advert"
        }
    ],gender: {
        type: String,
    },age: {
        type: String,
    },language: {
        type: String,
    },job: {
        type: String,
    },experience_year: {
        type: String,
    },talents: {
        type: String,
    },certificates: {
        type: String,
    },hobbies: {
        type: String,
    },aboutme: {
        type: String,
    }

},{timestamps: true});


//Şifre encrypt işlemi
userSchema.pre("save", function(next){
    const user = this
    bcrypt.hash(user.password, 10, (err, hash) =>{
        user.password = hash;
        next();
    } )
})


const User = mongoose.model("User",userSchema)

export default User