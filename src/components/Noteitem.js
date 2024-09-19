import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import '../App.css'
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
    const context = useContext(noteContext);
    const { deletenote } = context;
    const { note, updatenote } = props;
    return (
        <div className="col-md-3 my-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <div className="d-flex align-item-center">
                        <FontAwesomeIcon icon={faPenToSquare}
                            className="custom-icon"
                            data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-custom-class="custom-tooltip"
                            data-bs-title="Edit notes"
                            size="lg"
                            onClick={async () => { await updatenote(note) }} />
                        <FontAwesomeIcon icon={faTrash}
                            className="custom-icon"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-custom-class="custom-tooltip"
                            data-bs-title="Delete notes"
                            size="lg"
                            onClick={async () => { await deletenote(note._id) }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;