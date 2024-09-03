import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

function Notes() {
    const context = useContext(noteContext);
    const { notes, getnotes, editnote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes();
        }
        else {
            navigate("/signin");
        }
    }, [getnotes, navigate]);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        editnote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }
    const updatenote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    }
    return (
        <>
            <div className="container">
                <h2>Add Note Here</h2>
                <Addnote />
            </div>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Your Note..</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="enotetitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="enotedescription" name="edescription" onChange={onChange} value={note.edescription} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="enotetag" name="etag" onChange={onChange} value={note.etag} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length !== 0 ? (
                    notes.map((note) => {
                        return <Noteitem key={note._id} updatenote={updatenote} note={note} />;
                    })
                ) : (
                    <p className="mx-3">No notes available!</p>
                )}
            </div>
        </>
    )
}

export default Notes;                                                                                                                                               