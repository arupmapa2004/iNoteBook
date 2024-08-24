import React, {useContext,useState} from "react";
import noteContext from "../context/notes/noteContext";

function Addnote() {
    const context = useContext(noteContext);
    const {addnote} = context;
    const [note,setNote] = useState({title:"", description:"", tag:""});

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value});
    }
    const onClick = (e)=>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
    }
    return (
        <div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="notetitle" name="title" aria-describedby="emailHelp" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="notedescription" name="description" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="notetag" name="tag" onChange={onChange} required/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
                    <label className="form-check-label" htmlFor="exampleCheck1">I agree with this terms & condition.</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={onClick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote;