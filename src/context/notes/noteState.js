import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import NoteContext from './noteContext';

function NoteState(props) {
    const host = "http://localhost:5000";
    //const host = "https://inotebook-lmva.onrender.com";
    const [notes, setNotes] = useState([]);

    // get all notes
    const getnotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/getallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem('token')
                }
            });

            const data = await response.json();

            if (data.success) {
                setNotes(data.notes);
                props.toast.success(data.message);
            }
            else {
                props.toast.error(data.message);
            }
        }
        catch (err) {
            console.log("Error on fetching all notes " + err);
        }
    }

    //add notes
    const addnote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnotes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

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
            console.log("Error on adding note " + err);
        }
    }
    //edit note
    const editnote = async (_id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            const data = await response.json();

            if (data.success) {
                const updatedNotes = notes.map((note) =>
                    note._id === _id ? data.notes : note
                );
                setNotes(updatedNotes);
                props.toast.success(data.message);
            }
            else {
                props.toast.error(data.message);
            }

        }
        catch (err) {
            console.log("Error on editing notes" + err);
        }
    }
    //download note
    const downloadnote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/downloadnote/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();

            if (data.success) {
                const pdf = new jsPDF();
                const text = `
                    Title: ${data.note.title} \n
                    Description: ${data.note.description} \n
                    Tag: ${data.note.tag} \n`
                const pageWidth = 180; // 210mm - 30mm for margin (A4 width is 210mm)

                // Automatically wrap the text to fit within the width
                pdf.text(text, 10, 10, { maxWidth: pageWidth });
                pdf.save("note.pdf");
                props.toast.success("Notes downloaded successfully");
            }
            else {
                props.toast.error(data.message);
            }
        }
        catch (err) {
            console.log("Error on downloading note" + err);
        }
    }
    //delete note
    const deletenote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem('token')
                }
            });

            const data = await response.json();
            if (data.success) {
                const newNote = notes.filter((note) => { return note._id !== id });
                setNotes(newNote);
                props.toast.success(data.message);
            }
            else {
                props.toast.error(data.message);
            }
        }
        catch (err) {
            console.log("Error on deleting notes" + err);
        }
    }
    return (
        <NoteContext.Provider value={{ notes, getnotes, addnote, editnote, downloadnote, deletenote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;