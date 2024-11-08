import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";

function Notes() {
    const context1 = useContext(noteContext);
    const context2 = useContext(userContext);
    const { notes, getnotes, editnote } = context1;
    const { getuser } = context2;
    let navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getuser();
            getnotes();
        }
        else {
            navigate("/signin");
        }
    }, []);
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
            <div className="row mx-3">
                <h2>Your Notes</h2>
                {notes.length !== 0 ? (
                    notes.map((note) => {
                        return (
                            <div className="col-md-3 mb-3 note-item-container" key={note._id}>
                                <Noteitem updatenote={updatenote} note={note} />
                            </div>
                        );
                    })
                ) : (
                    <p className="mx-3">No notes available!</p>
                )}
            </div>
        </>
    )
}

export default Notes;                                                                                                                                               