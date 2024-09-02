import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function Addnote() {
    const context = useContext(noteContext);
    const { addnote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const onClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    return (
        <div className="container">
            <form className="row g-3 needs-validation" novalidate>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="notetitle" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="notedescription" name="description" value={note.description} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="notetag" name="tag" value={note.tag} onChange={onChange} required />
                </div>
                <div className="container my-3">
                    <button type="submit" className="btn btn-primary" onClick={onClick}>Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default Addnote;