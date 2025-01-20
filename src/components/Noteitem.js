import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faDownload } from "@fortawesome/free-solid-svg-icons";
import '../App.css'
import noteContext from "../context/notes/noteContext";
import userContext from "../context/user/userContext";


function Noteitem(props) {
    const context = useContext(noteContext);
    const context2 = useContext(userContext);
    const { user } = context2;
    const { deletenote, downloadnote } = context;
    const { note, updatenote, userId } = props;
    return (
        <div className="note-item p-3 mb-3 hover-effect" style={{ border: "1px solid #ddd", borderRadius: "8px", maxWidth: "280px" }}>
            <h5 style={{ color: "#0d6efd", fontWeight: "bold" }}>{note.title}</h5>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>{note.description}</p>
            <p className="text-secondary" style={{ fontStyle: "italic", fontSize: "0.85rem" }}>{note.tag}</p>
            <div className="d-flex justify-content-start mt-2">
                {user._id === userId ? <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="custom-icon me-3"
                    title="Edit Note"
                    style={{ color: "#0d6efd", cursor: "pointer" }}
                    onClick={async () => { await updatenote(note); }}
                /> : (<></>)}

                <FontAwesomeIcon
                    icon={faDownload}
                    className="custom-icon me-3"
                    title="Download Note"
                    style={{ color: "#28a745", cursor: "pointer" }}
                    onClick={async () => { await downloadnote(note._id); }}
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    className="custom-icon"
                    title="Delete Note"
                    style={{ color: "#dc3545", cursor: "pointer" }}
                    onClick={async () => { await deletenote(note._id); }}
                />
            </div>
        </div>
    )
}

export default Noteitem;