import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attachment: {
        type: [String],
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})
export const TaskModal = mongoose.model("tasks", TaskSchema)