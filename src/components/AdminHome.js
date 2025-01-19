import React from "react";
import Notes from "./Notes";

function AdminHome() {
    return (
        <>
            <center><h1>This is a iNoteBook - Your notes feel safe here!</h1></center>

            <div className="container mb-3">

                <h2>Admin Page</h2>
                <Notes/>
            </div>
        </>
    )
}

export default AdminHome;