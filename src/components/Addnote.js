import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function Addnote() {
    const context = useContext(noteContext);
    const { addnote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const onAddClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    const onResetClick = (e) => {
        e.preventDefault();
        setNote({ title: "", description: "", tag: "" });
    }
    return (
        <div className="container">
            <form className="row g-3 needs-validation" novalidate>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label"><strong>Title</strong></label>
                    <input type="text" className="form-control" placeholder="Enter your notes title" id="notetitle" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} style={{width:"700px"}} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label"><strong>Description</strong></label>
                    <textarea type="text" className="form-control" placeholder="Enter your notes description" id="notedescription" name="description" value={note.description} onChange={onChange} style={{height:"100px",width:"700px"}} required ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label"><strong>Tag</strong></label>
                    <input type="text" className="form-control" placeholder="Enter your notes tag" id="notetag" name="tag" value={note.tag} onChange={onChange} style={{width:"700px"}} required />
                </div>
                <div className="container mb-3">
                    <button type="submit" className="btn btn-primary mx-2" onClick={onAddClick}>Add Note</button>
                    <button type="submit" className="btn btn-primary mx-2" onClick={onResetClick}>Reset Note</button>
                </div>
            </form>
        </div>
    )
}

export default Addnote;