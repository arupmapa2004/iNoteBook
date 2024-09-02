import React, { useState } from 'react';
import NoteContext from './noteContext';

function NoteState(props) {
    const host = "http://localhost:5000";
    const note = []
    const [notes, setNotes] = useState(note);

    // get all notes
    const getnotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/getallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNGFjYmY4ZTgxYTkzODM5NWZjZmFlIn0sImlhdCI6MTcyNDI1MDcwMH0.62gl-RUAgmi2E0rdT5uohWU9HDZ56RPFOEgFTDbjIOE"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to add data");
            }
            const data = await response.json();
            setNotes(data);
        }
        catch (err) {
            console.error("Error on fetching all notes " + err);
        }
    }

    //add notes
    const addnote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnotes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNGFjYmY4ZTgxYTkzODM5NWZjZmFlIn0sImlhdCI6MTcyNDI1MDcwMH0.62gl-RUAgmi2E0rdT5uohWU9HDZ56RPFOEgFTDbjIOE"
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                throw new Error("Failed to add data");
            }
            const data = await response.json();
            setNotes(notes.concat(data));
        }
        catch (err) {
            console.error("Error on adding note "+ err);
        }
    }
    //edit note
    const editnote = async (_id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNGFjYmY4ZTgxYTkzODM5NWZjZmFlIn0sImlhdCI6MTcyNDI1MDcwMH0.62gl-RUAgmi2E0rdT5uohWU9HDZ56RPFOEgFTDbjIOE"
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                throw new Error("Failed to update data");
            }
            setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === _id ? { ...note, title, description, tag } : note
            )
        );
        }
        catch (err) {
            console.error("Error on editing notes" + err);
        }
    }
    //delete note
    const deletenote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNGFjYmY4ZTgxYTkzODM5NWZjZmFlIn0sImlhdCI6MTcyNDI1MDcwMH0.62gl-RUAgmi2E0rdT5uohWU9HDZ56RPFOEgFTDbjIOE"
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to delete note: ${response.status} ${response.statusText}`);
            }
            
            const newNote = notes.filter((note) => { return note._id !== id });
            setNotes(newNote);
        }
        catch (err) {
            console.error("Error on deleting notes" + err);
        }
    }
    return (
        <NoteContext.Provider value={{ notes, getnotes, addnote, editnote, deletenote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;