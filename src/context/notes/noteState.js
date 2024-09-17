import React, { useState } from 'react';
import NoteContext from './noteContext';

function NoteState(props) {
    const host = "https://inotebook-lmva.onrender.com";
    const note = []
    const [notes, setNotes] = useState(note);

    // get all notes
    const getnotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/getallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error("Failed to add data");
            }
            const data = await response.json();
            if(data.success)
            {
              setNotes(data.notes);
              //props.toast.success(data.message);
            }
            else{
              props.toast.error(data.message);
            }
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
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                throw new Error("Failed to add data");
            }
            const data = await response.json();
            if (data.success) {
                setNotes(notes.concat(data.notes));
                props.toast.success(data.message);
            }
            else {
                props.toast.error(data.message);
            }
        }
        catch (err) {
            console.error("Error on adding note " + err);
        }
    }
    //edit note
    const editnote = async (_id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error("Failed to update data");
            }
            if (data.success) {
                setNotes([...notes, data.notes]); 
                props.toast.success(data.message);
            }
            else {
                props.toast.error(data.message);
            }

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
                    "auth-token": localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete note: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            if (data.success)
            {
              const newNote = notes.filter((note) => { return note._id !== id });
              setNotes(newNote);
              props.toast.success(data.message);
            }
            else
            {
              props.toast.error(data.message);
            }
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