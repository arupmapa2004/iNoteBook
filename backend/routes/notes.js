const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTE 1 : for fetching user all saved notes -- (/api/getallnotes)
router.get('/getallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        return res.status(200).json({
            message: "Notes fetch Successfully!",
            success: true,
            notes: notes
        });
    } catch (error) {
        console.log("Error on fetching Notes: " + error);
        return res.status(500).json({
            message: "Error on fetching Notes!",
            success: false
        });
    }
})

//ROUTE 2 : for adding user notes -- (/api/addnotes)
router.post('/addnotes', fetchuser, [
    body('title', 'Please Give Title Atleast 5 Character').isLength({ min: 5 }),
    body('description', 'Please Give Description Atleast 7 Character').isLength({ min: 7 }),
    body('tag', 'Please Give Tag Atleast 3 Character').isLength({ min: 3 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array()[0].msg });
        }
        const note = new Note({ title, description, tag, user: req.user.id });
        await note.save();
        return res.status(200).json({
            message: "Notes Added Successfully",
            success: true,
            notes: note
        });
    } catch (error) {
        console.log("Error on Adding Notes: " + error);
        return res.status(500).json({
            message: "Error on adding Notes!",
            success: false
        });
    }
})


//ROUTE 3 : for updating user notes -- (/api/updatenote/:id)
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Please Give Title Atleast 5 Character').isLength({ min: 5 }),
    body('description', 'Please Give Description Atleast 7 Character').isLength({ min: 7 }),
    body('title', 'Please Give Title Atleast 3 Character').isLength({ min: 3 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array()[0].msg });
        }
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                message: "Notes not found!",
                success: false
            });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not allowed for update!",
                success: false
            });
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.status(200).json({
            message: "Notes updated successfully!",
            success: true,
            notes: note
        });
    } catch (error) {
        console.log("Error on updating notes: " + error);
        return res.status(500).json({
            message: "Can't update at this time!",
            success: false
        });
    }
})

//ROUTE 4 : for downloading user notes -- (/api/downloadnote/:id)
router.get('/downloadnote/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                message: "Notes not found!",
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            note: note
        })
    } 
    catch (error) {
        console.log("Error on downloading notes" + error);
        return res.status(501).json({
            message:"Internal Server Error",
            success: false
        })
    }
})
//ROUTE 5 : for deleting user notes -- (/api/deletenote/:id)
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                message: "Notes not found!",
                success: false
            });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not allowed for delete!",
                success: false
            });
        }
        await Note.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Notes deleted successfully!",
            success: true
        });
    } catch (error) {
        console.log("Error on deleting notes: " + error);
        return res.status(500).json({
            message: "Can't delete at this time!",
            success: false
        });
    }
})
module.exports = router;