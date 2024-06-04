const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/notes')
const { body, validationResult } = require('express-validator');


// Route 1: Get all the notes using: GET "/api/notes/fetchnotes". Login Required
router.get('/fetchnotes',fetchuser ,async (req, res)=>{

    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)  
    }
    // If there are error return bad request
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Sever Error")
    }
})



// Route 2: Add notes using: Post "/api/notes/addnotes". Login Required
router.post('/addnotes', fetchuser,[
    body('title', 'Title must be minimum 3 characters long').isLength({min: 3}),
    body('description', 'Descroption must be minimum 5 characters long').isLength({min: 5}) ],
    async (req, res)=>{

    try {

        const{title, description, tag } = req.body

        // If there are error return bad request
        const errors = validationResult(req);
        const errarray = errors.array()
        if (!errors.isEmpty()) {
        return res.status(400).json({errors: errarray})
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)
    }
    // If there are error return bad request
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Sever Error")            
    }
})


// Route 3: Update existing notes using: Post "/api/notes/updatenotes". Login Required

router.put('/updatenotes/:id', fetchuser, async (req, res)=>{

    try {

        const{title, description, tag } = req.body
        //Create a newNote Object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json(note)
    }

    // If there are error return bad request
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Sever Error")            
    }
})


// Route 4: Delete existing notes using: Delete "/api/notes/deletenotes". Login Required
try {
    
    router.delete('/deletenotes/:id', fetchuser, async (req, res)=>{
    
        //Find the note to be delteded
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
    
        //If the note is not of the authorized user do not allow the access
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
    
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json("Note Deleted successfully")
    
    })
}
catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Sever Error")   
}


module.exports = router