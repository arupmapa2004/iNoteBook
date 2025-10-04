import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import '../App.css';
import noteContext from "../context/notes/noteContext";
import userContext from "../context/user/userContext";

function Noteitem(props) {
    const context = useContext(noteContext);
    const context2 = useContext(userContext);
    const { user, getuser } = context2;
    const { deletenote, downloadnote } = context;
    const { note, updatenote, userId } = props;

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getuser();
    }, []);

    return (
        <>
            <div className="note-item p-3 mb-3 hover-effect"
                style={{ border: "1px solid #ddd", borderRadius: "8px", maxWidth: "280px" }}>
                <h5 style={{ color: "#0d6efd", fontWeight: "bold" }}>
                    {note.title.length > 20 ? note.title.substring(0, 21) + "..." : note.title}
                </h5>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {note.description.length > 24 ? note.description.substring(0, 30) + "..." : note.description}
                </p>
                <p className="text-secondary" style={{ fontStyle: "italic", fontSize: "0.85rem" }}>
                    {note.tag.length > 24 ? note.tag.substring(0, 25) + "..." : note.tag}
                </p>

                <div className="d-flex justify-content-start mt-2">
                    {/* Edit */}
                    {user?._id === userId && (
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="custom-icon me-3"
                            title="Edit Note"
                            style={{ color: "#0d6efd", cursor: "pointer" }}
                            onClick={async () => { await updatenote(note); }}
                        />
                    )}

                    {/* View */}
                    <FontAwesomeIcon
                        icon={faEye}
                        className="custom-icon me-3"
                        title="View Note"
                        style={{ color: "#6c757d", cursor: "pointer" }}
                        onClick={() => setShowModal(true)}
                    />

                    {/* Download */}
                    <FontAwesomeIcon
                        icon={faDownload}
                        className="custom-icon me-3"
                        title="Download Note"
                        style={{ color: "#28a745", cursor: "pointer" }}
                        onClick={async () => { await downloadnote(note._id); }}
                    />

                    {/* Delete */}
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="custom-icon"
                        title="Delete Note"
                        style={{ color: "#dc3545", cursor: "pointer" }}
                        onClick={async () => { await deletenote(note._id); }}
                    />
                </div>
            </div>

            {/* ✅ Modal for viewing full note */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        backdropFilter: "blur(3px)",   // nice blur effect
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content shadow-lg" style={{ borderRadius: "12px" }}>

                            {/* Header */}
                            <div
                                className="modal-header"
                                style={{ backgroundColor: "#1199e7ff", color: "white", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                            >
                                <h5
                                    className="modal-title"
                                    style={{
                                        wordBreak: "break-word",
                                        overflowWrap: "break-word",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {note.title}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            {/* Body */}
                            <div
                                className="modal-body"
                                style={{
                                    maxHeight: "60vh",
                                    overflowY: "auto",
                                    padding: "1.2rem",
                                    fontSize: "1rem",
                                    lineHeight: "1.6",
                                }}
                            >
                                <p><strong>Description:</strong></p>
                                <p style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                                    {note.description}
                                </p>

                                <hr />

                                <p><strong>Tag:</strong></p>
                                <p style={{ wordBreak: "break-word", overflowWrap: "break-word", fontStyle: "italic", color: "#6c757d" }}>
                                    {note.tag}
                                </p>

                                <hr />

                                <p><strong>Date:</strong> {new Date(note.date).toLocaleString()}</p>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer">
                                <button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={async () => { await downloadnote(note._id); }}
                                >
                                    <FontAwesomeIcon icon={faDownload} className="me-2" />
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default Noteitem;
