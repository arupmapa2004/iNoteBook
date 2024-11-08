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
        <div className="d-flex flex-column align-items-center justify-content-center w-auto p-3 bg-light">
            <h2 className="mb-4" style={{ color: "#0d6efd", marginTop: "30px" }}>Create a New Note</h2>
            <form className="w-100" style={{ maxWidth: "600px" }}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your note's title"
                        id="notetitle"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                        required
                        style={{ borderRadius: "8px", padding: "10px" }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">Description</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter your note's description"
                        id="notedescription"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                        required
                        style={{
                            height: "120px",
                            borderRadius: "8px",
                            padding: "10px",
                            resize: "none",
                        }}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label fw-bold">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a tag for your note"
                        id="notetag"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                        required
                        style={{ borderRadius: "8px", padding: "10px" }}
                    />
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button
                        type="submit"
                        className="btn btn-success mx-2"
                        onClick={onAddClick}
                        style={{ width: "120px" }}
                    >
                        Add Note
                    </button>
                    <button
                        type="reset"
                        className="btn btn-secondary mx-2"
                        onClick={onResetClick}
                        style={{ width: "120px" }}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Addnote;