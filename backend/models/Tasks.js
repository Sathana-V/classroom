import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    receivers: {
        type: String,
        required: true
    },
    tasks: [{
        type: String,
        required: true
    }],
    attachment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})
export const TaskModal = mongoose.model("tasks", TaskSchema)