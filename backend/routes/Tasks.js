import express from "express";
import {TaskModal} from "../models/Tasks.js";
const router = express.Router()

router.post("/add", async (req, res) => {
    try {
        const newUser = new TaskModal({ ...req.body });
        await newUser.save();
        return res.status(200).json({message: "tasks saved succesfully"})
        
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(400).json({message: "error in saving tasks"})
    }
})
router.get("/all", async (req, res) => {
    try {
        const newUser = await TaskModal.find();
        return res.status(200).json({message: newUser})
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(400).json({message: "error in gettoing tasks"})
    }
})

export {router as taskRouter}