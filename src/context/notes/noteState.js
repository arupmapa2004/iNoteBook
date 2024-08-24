import React, { useState } from 'react';
import NoteContext from './noteContext';

function NoteState(props) {
    const note = [
        {
            "_id": "66c5ff63ef05022ec299026ed",
            "user": "66c4acbf8e81a938395fcfae",
            "title": "MyTitle-Arup",
            "description": "This is first notes.",
            "tag": "testing",
        },
        {
            "_id": "66c5ff63ef06022ec299026ed",
            "user": "66c4acbf8e81a938395fcfae",
            "title": "MyTitle-Tanu",
            "description": "This is first notes.",
            "tag": "testing",
        },
    ]
    const [notes, setNotes] = useState(note);
     //add notes
     const addnote = (title,description,tag)=>{
        const n = {
            "_id": "66c5ff63epf06022ec299026ed",
            "user": "66c4acbf8e81a938395fcfae",
            "title": title,
            "description": description,
            "tag": tag,
        }
        setNotes(note.concat(n));
     }
     //edit note
     const editnote = (_id)=>{

     }
     //delete note
     const deletenote = (_id)=>{
        const newNote = note.filter((note)=>{return note._id !== _id});
        setNotes(newNote);
     }
    return (
        <NoteContext.Provider value={{ notes, addnote, editnote, deletenote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;