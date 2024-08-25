import React, { useState } from 'react';
import NoteContext from './noteContext';
import { json } from 'react-router-dom';

function NoteState(props) {
    const host = "http://localhost:5000";
    const note = []
    const [notes, setNotes] = useState(note);

    // get all notes
    const getnotes = async () => {
        const response = await fetch(`${host}/api/notes/getallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNGFjYmY4ZTgxYTkzODM5NWZjZmFlIn0sImlhdCI6MTcyNDI1MDcwMH0.62gl-RUAgmi2E0rdT5uohWU9HDZ56RPFOEgFTDbjIOE"
            }
        })
        const data = await response.json();
        setNotes(data);
    }

    //add notes
    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNGFjYmY4ZTgxYTkzODM5NWZjZmFlIn0sImlhdCI6MTcyNDI1MDcwMH0.62gl-RUAgmi2E0rdT5uohWU9HDZ56RPFOEgFTDbjIOE"
            },
            body: JSON.stringify({ title, description, tag })
        });

        //console.log("Adding a new note")
        const note = {
            "_id": "61322f119553781a8ca8d0e08",
            "user": "6131dc5e3e4037cd4734a0664",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-03T14:20:09.668Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    //edit note
    const editnote = async (_id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNGFjYmY4ZTgxYTkzODM5NWZjZmFlIn0sImlhdCI6MTcyNDI1MDcwMH0.62gl-RUAgmi2E0rdT5uohWU9HDZ56RPFOEgFTDbjIOE"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const data = await response.json();
        console.log(data);

        const newNote = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNote.length; i++) {
            const element = newNote[i];
            if (element._id === _id) {
                newNote[i].title = title;
                newNote[i].description = description;
                newNote[i].tag = tag;
                break;
            }
        }
        setNotes(newNote);
    }
    //delete note
    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNGFjYmY4ZTgxYTkzODM5NWZjZmFlIn0sImlhdCI6MTcyNDI1MDcwMH0.62gl-RUAgmi2E0rdT5uohWU9HDZ56RPFOEgFTDbjIOE"
            }
        });
        const data = await response.json();
        console.log(data);

        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);
    }
    return (
        <NoteContext.Provider value={{ notes, getnotes, addnote, editnote, deletenote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;