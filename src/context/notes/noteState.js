import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import NoteContext from './noteContext';

function NoteState(props) {
    //const host = "http://localhost:5000";
    const host = "https://inotebook-lmva.onrender.com";
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
            
                // Set PDF properties
                const pageWidth = 210;  // A4 width in mm
                const pageHeight = 297; // A4 height in mm
                const margin = 15;      // Define margin
                const contentWidth = pageWidth - 2 * margin; // Content width inside the margins
                const headingFontSize = 18;
                const textFontSize = 16;                
                // Add heading
                pdf.setFontSize(headingFontSize);
                pdf.setFont("helvetica", "bold");
                pdf.text("iNoteBook", pageWidth / 2, margin, { align: "center" });
                
                // Add border
                pdf.setDrawColor(0);  // Black border
                pdf.rect(margin, margin + 10, contentWidth, pageHeight - 2 * margin - 10); // Create a border
            
                // Add content (title, description, tag)
                pdf.setFontSize(textFontSize);
                pdf.setFont("helvetica", "normal");
                
                const text = `  Title: ${data.note.title} \n \n  Description: ${data.note.description} \n \n  Tag: ${data.note.tag} \n`;
            
                // Automatically wrap the text to fit within the width
                const yOffset = margin + 20;  // Space below heading
                pdf.text(text, margin + 5, yOffset, { maxWidth: contentWidth - 10 });
                
                // Save the PDF
                pdf.save("note.pdf");
            
                // Success message
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