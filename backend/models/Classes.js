import mongoose from "mongoose";
const ClassSchema = mongoose.Schema({
    className: {
        type: String
    },
    description: {
        type: String,
    },
    students: {
        type: Array
    },
    classCode: {
        type: String
    }
})

export const ClassModal = mongoose.model("class", ClassSchema)