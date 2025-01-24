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
                const pageWidth = 210;       // A4 width in mm
                const pageHeight = 297;      // A4 height in mm
                const margin = 15;           // Define margin
                const contentWidth = pageWidth - 2 * margin; // Content width inside the margins

                // Font sizes
                const headingFontSize = 22;
                const subheadingFontSize = 16;
                const textFontSize = 14;

                // Colors
                const borderColor = [70, 130, 180];      // Steel blue border
                const headingColor = [34, 34, 34];       // Dark gray heading
                const subheadingColor = [100, 100, 100]; // Lighter gray for subheading
                const textColor = [50, 50, 50];          // General text color

                // Decorative Background or Border
                pdf.setDrawColor(...borderColor);
                pdf.setLineWidth(1.5);
                pdf.rect(margin, margin, contentWidth, pageHeight - 2 * margin, 'S'); // Border around page

                // Header Section with a Decorative Line
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(headingFontSize);
                pdf.setTextColor(...headingColor);
                pdf.text("iNoteBook", pageWidth / 2, margin + 10, { align: "center" });
                pdf.setDrawColor(...borderColor);
                pdf.setLineWidth(0.5);
                pdf.line(margin + 10, margin + 15, pageWidth - margin - 10, margin + 15); // Decorative line below heading

                // Content Section
                pdf.setFontSize(subheadingFontSize);
                pdf.setFont("helvetica", "bold");
                pdf.setTextColor(...subheadingColor);
                pdf.text("Note Details", margin + 5, margin + 30);

                // Main Content: Title, Description, Tag
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(textFontSize);
                pdf.setTextColor(...textColor);

                const contentText = `Title: ${data.note.title}\n\nDescription: ${data.note.description}\n\nTag: ${data.note.tag}`;
                const yOffset = margin + 40; // Adjusted to leave space below subheading

                // Automatically wrap the text within content width
                pdf.text(contentText, margin + 5, yOffset, { maxWidth: contentWidth - 10 });

                // Footer Section
                pdf.setFontSize(10);
                pdf.setFont("helvetica", "italic");
                pdf.setTextColor(...subheadingColor);
                pdf.text("Generated by iNoteBook", pageWidth / 2, pageHeight - margin + 5, { align: "center" });

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
    const deletenote = (id) => {
        props.Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then( async (result) => {
            if (result.isConfirmed) {
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
                        props.Swal.fire({
                            title: "Deleted!",
                            text: `${data.message}`,
                            icon: "success"
                        });
                    }
                    else {
                        props.Swal.fire({
                            title: "Oops!",
                            text: `${data.message}`,
                            icon: "error"
                        });
                    }
                }
                catch (err) {
                    console.log("Error on deleting notes" + err);
                }
            }
        });
    }
    return (
        <NoteContext.Provider value={{ notes, getnotes, addnote, editnote, downloadnote, deletenote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;