const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTE 1 : for fetching user all saved notes -- (/api/getallnotes)
router.get('/getallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        return res.status(200).send(notes);
    } catch (error) {
        console.log("Error on fetching Notes: " + error);
        return res.status(500).send("500 Internal Server Error");
    }
})

//ROUTE 2 : for adding user notes -- (/api/addnotes)
router.post('/addnotes', fetchuser, [
    body('title', 'Please Enter a Valid Title').isLength({ min: 5 }),
    body('description', 'Please Give Description Atleast 5 Character').isLength({ min: 7 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const note = new Note({ title, description, tag, user: req.user.id });
        await note.save();
        return res.status(200).send("Notes Added Successfully");
    } catch (error) {
        console.log("Error on Adding Notes: " + error);
        return res.status(500).send("500 Internal Server Error");
    }
})


//ROUTE 3 : for updating user notes -- (/api/updatenote/:id)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Notes Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed for Update");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.status(200).send("Notes Updated Successfully");
    } catch (error) {
        console.log("Error on updating notes: " + error);
        return res.status(500).send("Internal Server Error");
    }
})
//ROUTE 3 : for updating user notes -- (/api/updatenote/:id)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Notes Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed for Update");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.status(200).send("Notes Updated Successfully");
    } catch (error) {
        console.log("Error on updating notes: " + error);
        return res.status(500).send("Internal Server Error");
    }
})
//ROUTE 3 : for updating user notes -- (/api/updatenote/:id)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Notes Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed for Update");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.status(200).send("Notes Updated Successfully");
    } catch (error) {
        console.log("Error on updating notes: " + error);
        return res.status(500).send("Internal Server Error");
    }
})

//ROUTE 4 : for deleting user notes -- (/api/deletenote/:id)
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Notes Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed for Delete");
        }
        await Note.findByIdAndDelete(req.params.id);
        return res.status(200).send("Notes Has Been Deleted Successfully");
    } catch (error) {
        console.log("Error on updating notes: " + error);
        return res.status(500).send("Internal Server Error");
    }
})
module.exports = router;