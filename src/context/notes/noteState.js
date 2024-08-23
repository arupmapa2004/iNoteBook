import React, { useState } from 'react';
import NoteContext from './noteContext';

function NoteState(props) {
    const note = [
        {
            "_id": "66c5ff63ef05022ec299026ed",
            "user": "66c4acbf8e81a938395fcfae",
            "title": "MyTitle-Arup",
            "description": "This is first notes.",
            "tag": "testing",
        },
        {
            "_id": "66c5ff63ef06022ec299026ed",
            "user": "66c4acbf8e81a938395fcfae",
            "title": "MyTitle-Tanu",
            "description": "This is first notes.",
            "tag": "testing",
        },
    ]
    const [notes, setNotes] = useState(note);

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;