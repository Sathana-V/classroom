import express from "express";
import { ClassModal } from "../models/Classes.js";
import { UserModel } from "../models/Users.js";
const router = express.Router()


const getUniqueCode = () => {
    var numbers = "0123456789";

    var chars = "acdefhiklmnoqrstuvwxyz";

    var code_length = 6;
    var number_count = 3;
    var letter_count = 3;

    var code = '';

    for (var i = 0; i < code_length; i++) {
        var letterOrNumber = Math.floor(Math.random() * 2);
        if ((letterOrNumber == 0 || number_count == 0) && letter_count > 0) {
            letter_count--;
            var rnum = Math.floor(Math.random() * chars.length);
            code += chars[rnum];
        }
        else {
            number_count--;
            var rnum2 = Math.floor(Math.random() * numbers.length);
            code += numbers[rnum2];
        }
    }
    return code
}

router.post("/new", async (req, res) => {
    console.log(req.body);
    const {className, description, _id} = req.body
    try {
        let user = { className, description, classCode: getUniqueCode() }
        console.log(user);
        const newUser = new ClassModal(user);
        await newUser.save();
        console.log(_id, user.classCode);
        await UserModel.updateOne({ _id: _id }, {
            $push: {
                class: newUser._id
            }
        })
        return res.status(200).json({ message: "New Class has been created", data: user })

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(400).json({ message: "error in saving class" })
    }
})
router.get("/all", async (req, res) => {
    try {
        const newUser = await ClassModal.find();
        return res.status(200).json({ message: 'Successfully fetched class Details', data: newUser })
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(400).json({ message: "error in getting class" })
    }
})
router.post("/join", async (req, res) => {
    const { classCode, _id, email } = req.body
    console.log(req.body);
    console.log(classCode);
    try {
        const classId = await ClassModal.findOne({ classCode: classCode })
        console.log(classId)
        const sanitiyCheck = classId && classId.students.find( e => e.student_id === _id)
        if (classId) {
            if(!sanitiyCheck) {
                const filter = { classCode: classId.classCode };
                const updateDoc = {
                    $push: {
                        students: { classId: classId._id, email: email, student_id: _id }
                    }
                }
    
                console.log(filter, updateDoc);
                const result = await ClassModal.updateOne(filter, updateDoc);
                const result2 = await UserModel.updateOne({ _id: _id }, {
                    $push: {
                        class: classId._id
                    }
                })
                return res.status(200).json({ message: 'Successfully joined class', data: classId })
            } else {
                return res.status(201).json({ message: 'Already you have joined the class', data: classId })
            }
            
        }
        // ClassModal.updateOne({})
        return res.status(401).json({ message: 'Invalid Class Name', classCode })
    } catch (error) {
        console.error("Error in joining class:", error);
        return res.status(400).json({ message: "error in getting class" })
    }
})

router.get("/classlist/:id", async (req, res) => {

    const userDetails = await UserModel.findOne({ _id: req.params.id })
    console.log('userd', userDetails);
    try {
        const result = await ClassModal.find({ _id: { $in: userDetails.class } })
        console.log(result);
        return res.status(200).json({ message: 'fetched', data: result })
    } catch (err) {
        console.error("error while fetching class:", err);
        return res.status(400).json({ message: "error while fetching class" })
    }
})


export { router as classRouter }