import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import '../App.css'
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
    const context = useContext(noteContext);
    const { deletenote } = context;
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <div className="d-flex align-item-center">
                        <FontAwesomeIcon icon={faTrash} className="custom-icon" size="lg" onClick={() => { deletenote(note._id) }} />
                        <FontAwesomeIcon icon={faPenToSquare} className="custom-icon" size="lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;