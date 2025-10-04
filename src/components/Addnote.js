import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function Addnote() {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [noteError, setNoteError] = useState({
        titleError: false,
        descriptionError: false,
        tagError: false,
    });
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });

        setNoteError((prev) => ({
            ...prev,
            titleError: name === "title" ? value.length < 5 : prev.titleError,
            descriptionError: name === "description" ? value.length < 7 : prev.descriptionError,
            tagError: name === "tag" ? value.length < 3 : prev.tagError,
        }));
    };

    const onAddClick = async (e) => {
        e.preventDefault();

        // block submission if any field has error or empty
        if (noteError.titleError || noteError.descriptionError || noteError.tagError) return;

        setLoading(true);
        await addnote(note.title, note.description, note.tag);
        setLoading(false);
        setNote({ title: "", description: "", tag: "" });
    };

    const onResetClick = (e) => {
        e.preventDefault();
        setNote({ title: "", description: "", tag: "" });
        setNoteError({ titleError: false, descriptionError: false, tagError: false });
    };

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
                    <small style={{ color: noteError.titleError ? "red" : "white" }}>Please write at least 5 characters!</small>
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
                    <small style={{ color: noteError.descriptionError ? "red" : "white" }}>Please write at least 7 characters!</small>
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
                    <small style={{ color: noteError.tagError ? "red" : "white" }}>Please write at least 3 characters!</small>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <button
                        type="submit"
                        className="btn btn-success mx-2"
                        onClick={onAddClick}
                        style={{ width: "120px" }}
                        disabled={
                            noteError.titleError ||
                            noteError.descriptionError ||
                            noteError.tagError ||
                            loading
                        }
                    >
                        {!loading ? "Add Note" : "Adding..."}
                    </button>
                    <button
                        type="reset"
                        className="btn btn-secondary mx-2"
                        onClick={onResetClick}
                        style={{ width: "120px" }}
                        disabled={loading}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Addnote;
