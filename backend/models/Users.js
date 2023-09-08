import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    class: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class'
    }]
})

export const UserModel = mongoose.model("visitors", UserSchema)