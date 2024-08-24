import React, { useContext } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";

function Notes() {
    const context = useContext(noteContext);
    const { notes } = context;

    return (
        <>
            <div className="container">
                <h2>Add Note Here</h2>
                <Addnote />
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes;                                                                                                                                               